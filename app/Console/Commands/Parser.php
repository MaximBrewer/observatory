<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Product;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use PHPHtmlParser\Dom;
use Acme\Client;
use Symfony\Component\BrowserKit\HttpBrowser;
use Symfony\Component\HttpClient\HttpClient;

class Parser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'parse:start';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Парсинг';

    public $proxyArray = [];

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }


    public function getProxy()
    {
        $this->proxyArray = file_get_contents('https://htmlweb.ru/json/proxy/get?api_key=f12d4a182b5ebe0703792f24dd62cde0&perpage=400&work=1');
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //
        $products = Product::whereRaw('DATE_SUB(NOW(), INTERVAL `products`.`frequency` HOUR) < `products`.`updated_at`')
            ->select(['products.id as pid', 'products.article', 'products.url as purl', 'products.price', 'products.higher_deviation', 'products.lower_deviation', 'sites.*'])
            ->leftJoin('projects', 'projects.id', '=', 'products.project_id')
            ->leftJoin('sites', 'sites.id', '=', 'projects.site_id')
            ->limit(50)
            ->get()
            ->toArray();

        $products = Product::all()->toArray();

        $browser = new HttpBrowser(HttpClient::create());

        $proxy_ip = '212.115.224.71:53281';

        foreach ($products as $product) {
            $cnt = 0;
            do {
                $product['purl'] = $product['url'];
                $ch = curl_init($product['purl']);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 0);
                curl_setopt($ch, CURLOPT_REFERER, $product['purl']);
                // curl_setopt($ch, CURLOPT_HEADER, true);
                curl_setopt($ch, CURLOPT_PROXY, $proxy_ip);
                curl_setopt($ch, CURLOPT_HTTPHEADER, [
                    'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                    'Accept-Encoding' => 'gzip, deflate, br',
                    'Accept-Language' => 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6',
                    'Cache-Control' => 'max-age=0',
                    'Connection' => 'keep-alive',
                    'DNT' => '1',
                    'Sec-Fetch-Dest' => 'document',
                    'Sec-Fetch-Mode' => 'navigate',
                    'Sec-Fetch-Site' => 'same-origin',
                    'Sec-Fetch-User' => '?1',
                    'Upgrade-Insecure-Requests' => '1',
                    'User-Agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36'
                ]);
                $response_data = curl_exec($ch);
                $info = curl_getinfo($ch);
                if (curl_errno($ch) > 0) {
                    die('Ошибка curl: ' . curl_error($ch));
                }
                curl_close($ch);
            } while ($info['http_code'] != 200 && $cnt < 20);


            $dom = new Dom;
            $dom->load($response_data);
            file_put_contents("index.html", $response_data);
            echo $product['meta'];

            if ($product['meta']) {
                $metaArray = $dom->find('meta');
                foreach ($metaArray as $meta) {
                    echo $meta->content;
                }
            }
            die;
            sleep(2);
        }

        // $curl = curl_init($host_api);

        // var_dump($product['purl']);
        // die;
        // curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/4.0");
        // curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        // curl_setopt($curl, CURLOPT_USERPWD, $username . ":" . $password);
        // // get запрос
        // curl_setopt($curl, CURLOPT_URL, "$host_api/1c_exchange.php?mode=checkauth&type=sale");
        // curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        // curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true); // следуем за редиректами
        // curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        // curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        // curl_setopt($curl, CURLOPT_HEADER, false); //не выводим заголовки


        // $result = curl_exec($curl);
        // echo $result;


    }
}
