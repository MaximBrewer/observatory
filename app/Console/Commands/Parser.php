<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Product;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use PHPHtmlParser\Dom;
use Acme\Client;
use App\ProductLog;
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
        return json_decode(file_get_contents('https://htmlweb.ru/json/proxy/get?api_key=f12d4a182b5ebe0703792f24dd62cde0&perpage=400&work=1'), true);
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //
        $products = Product::whereRaw('DATE_SUB(NOW(), INTERVAL `products`.`frequency` HOUR) > `products`.`updated_at`')
            ->select(['products.id as pid', 'products.article', 'products.url as purl', 'products.price as pprice', 'products.higher_deviation', 'products.lower_deviation', 'sites.*'])
            ->leftJoin('projects', 'projects.id', '=', 'products.project_id')
            ->leftJoin('sites', 'sites.id', '=', 'projects.site_id')
            ->limit(50)
            ->get()
            ->toArray();


        // $proxies = json_decode(file_get_contents('proxies.json', true));


        // if (!count($proxies)) {
        //     $proxyArray = [];
        //     $proxiesJson = $this->getProxy();
        //     foreach ($proxiesJson as $proxi) {
        //         if (is_array($proxi) && (strtolower($proxi['type']) == 'http' || strtolower($proxi['type']) == 'https') && $proxi['work'] = 1) {
        //             $proxyArray[] = $proxi;
        //         }
        //     }
        //     file_put_contents('proxies.json', json_encode($proxyArray));
        //     $proxies = json_decode(file_get_contents('proxies.json', true));
        // }

        foreach ($products as $product) {
            $cnt = 0;
            $gotit = false;
            do {
                // if (count($proxies) > 0) {
                    do {
                        // shuffle($proxies);
                        // file_put_contents('proxies.json', json_encode($proxies));
                        // $proxies = json_decode(file_get_contents('proxies.json', true));
                        // $proxy_ip = $proxies[0]->name;
                        $proxy_ip = '37.203.242.220:10029';
                        $proxy_ip = '37.203.242.221:11067';

                        $proxyauth = 'pimax9746:a3f847';
                        $ch = curl_init($product['purl']);
                        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                        curl_setopt($ch, CURLOPT_REFERER, $product['purl']);
                        // curl_setopt($ch, CURLOPT_HEADER, true);
                        curl_setopt($ch, CURLOPT_PROXY, $proxy_ip);
                        curl_setopt($ch, CURLOPT_PROXYUSERPWD, $proxyauth);
                        curl_setopt($ch, CURLOPT_TIMEOUT, 3);
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
                            file_put_contents("error.log", curl_error($ch) . PHP_EOL, FILE_APPEND);
                        }
                        if (!$response_data || $info['http_code'] != 200) {
                            // array_shift($proxies);
                        } else {
                            $gotit = true;
                        }
                        curl_close($ch);
                        usleep(200);
                    } while (/*count($proxies) > 0 && */!$gotit && $cnt < 50);
                    if (!$gotit) {
                        // array_shift($proxies);
                        continue;
                    }
                // }
            } while (/*count($proxies) > 0 && */!$gotit);

            // if (!count($proxies)) die;

            if (!$gotit) {
                continue;
            }

            $dom = new Dom;
            $dom->load($response_data);

            if ($product['meta']) {
                $metaArray = $dom->find('meta');
                $r = false;
                foreach ($metaArray as $meta) {
                    if ($product['meta'] == (string) $meta->itemProp) {
                        $deviation = round((($meta->content * 100 - $product['pprice']) / $product['pprice']) * 100, 2);
                        ProductLog::create([
                            'product_id' => $product['pid'],
                            'site_price' => $meta->content,
                            'deviation' => $deviation ? $deviation : null
                        ]);
                        $r = true;
                        break;
                    }
                }
                if (!$r) {
                    ProductLog::create([
                        'product_id' => $product['pid'],
                        'site_price' => null,
                        'deviation' => null
                    ]);
                }
            }
            usleep(200);
        }
    }
}
