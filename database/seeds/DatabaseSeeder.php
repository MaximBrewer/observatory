<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call('SiteTableSeeder');
        $this->call('UserTableSeeder');
        $this->command->info('Таблицы заполнена данными!');
    }
}
