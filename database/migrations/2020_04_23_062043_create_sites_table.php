<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSitesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sites', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('url');
            $table->string('meta')->nullable();
            $table->string('ld_json')->nullable();
            $table->string('path_price')->nullable();
            $table->string('controller')->nullable();
            $table->timestamps();
        });
    }

    // https://www.ozon.ru/  application/ld+json Price
    // https://www.wildberries.ru/
    // https://beru.ru/
    // https://beautydiscount.ru/
    // http://shampoomania.ru 
    // http://www.shophair.ru
    // http://www.milenaclub.ru
    // www.BeautyMania.ru
    // https://www.socolor.ru/ 
    // https://proflc.ru/ 
    // https://www.krason.ru/
    // https://hairs-russia.ru/
    // http://befactory.ru/ 
    // https://www.proficosmetics.ru/ 
    // https://professionalhair.ru/
    // https://prof-hair.ru/
    // https://profcosmo.ru/
    // http://randewoo.ru
    // http://beauty-bazar.ru 
    // https://4trend.ru/

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sites');
    }
}
