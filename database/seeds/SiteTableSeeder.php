<?php

use Illuminate\Database\Seeder;
use App\Site;
use Illuminate\Support\Facades\DB;

class SiteTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();
        Site::create([
            'title' => 'ozon',
            'url' => 'https://www.ozon.ru', 
            'ld_json' => 'Price',
        ]);
        Site::create([
            'title' => 'wildberries',
            'url' => 'https://www.wildberries.ru', 
            'meta' => 'price', 
        ]);
        Site::create([
            'title' => 'beru',
            'url' => 'https://beru.ru', 
            'meta' => 'price', 
        ]);
        Site::create([
            'title' => 'beautydiscount',
            'url' => 'https://beautydiscount.ru', 
            'meta' => 'lowPrice', 
            'controller' => '{\"google_tag_params\": \"ecomm_totalvalue\"}',
        ]);
        Site::create([
            'title' => 'shampoomania',
            'url' => 'https://m.shampoomania.ru', 
            'path_price' => '<div class=\"price\" style=\"color: black;text-align: center;font-size: 14px;font-weight:bold;\"> 2 060  руб.</div>',
        ]);
        Site::create([
            'title' => 'shophair',
            'url' => 'https://www.shophair.ru', 
            'meta' => 'price', 
            'path_price' => '<div 	class=\"flocktory_class dn\" 	id=\"iden_399867\" 	name=\"Uriage Bariederm - Восстанавливающий цика-крем с Cu-Zn 40 мл\" 	category=\"278\" 	brand=\"Uriage (Франция)\" 	price=\"453\" 	oldprice=\"604\" ></div>',
            'controller' => '{\"google_tag_params\": \"ecomm_totalvalue\"}',
        ]);
        Site::create([
            'title' => 'milenaclub',
            'url' => 'https://www.milenaclub.ru', 
            'meta' => 'price', 
        ]);
        Site::create([
            'title' => 'beautymania',
            'url' => 'https://www.beautymania.ru', 
            'ld_json' => 'offers:price',
        ]);
        Site::create([
            'title' => 'socolor',
            'url' => 'https://www.socolor.ru', 
            'ld_json' => 'offers:price',
        ]);
        Site::create([
            'title' => 'proflc',
            'url' => 'https://proflc.ru', 
            'meta' => 'price', 
        ]);
        Site::create([
            'title' => 'krason',
            'url' => 'https://www.krason.ru', 
            'meta' => 'lowPrice,price,highPrice', 
        ]);
        Site::create([
            'title' => 'krason',
            'url' => 'https://www.krason.ru', 
            'meta' => 'lowPrice,price,highPrice', 
        ]);
        Site::create([
            'title' => 'randewoo',
            'url' => 'https://randewoo.ru', 
            'meta' => 'lowPrice,price,highPrice', 
        ]);
        Site::create([
            'title' => 'hairs-russia',
            'url' => 'https://hairs-russia.ru', 
            'meta' => 'price', 
        ]);
        Site::create([
            'title' => 'befactory',
            'url' => 'https://befactory.ru', 
            'meta' => 'price', 
        ]);
        Site::create([
            'title' => 'proficosmetics',
            'url' => 'https://www.proficosmetics.ru', 
            'meta' => 'price', 
            'controller' => '{\"google_tag_params\":\"ecomm_totalvalue\"}',
        ]);
        Site::create([
            'title' => 'prof-hair',
            'url' => 'https://prof-hair.ru', 
            'meta' => 'price', 
        ]);
        Site::create([
            'title' => 'profcosmo',
            'url' => 'https://shop.profcosmo.ru', 
            'meta' => 'price', 
        ]);
        Site::create([
            'title' => 'beauty-bazar',
            'url' => 'http://beauty-bazar.ru', 
            'meta' => 'price', 
        ]);
        Site::create([
            'title' => '4trend',
            'url' => 'https://4trend.ru', 
            'meta' => 'price', 
        ]);
    }
}
