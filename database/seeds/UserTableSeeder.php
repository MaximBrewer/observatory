<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Company;
use App\Profile;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        User::create([
            'name' => 'pimax1978@icloud.com',
            'email' => 'pimax1978@icloud.com',
            'password' => '$2y$10$y8One5B28IpcrUiv10dqvOkRCeXsRQ4VuKuh4hv4sxd2wr4LCmA/i',
            'remember_token' => '6el2xh3ZFycoxTyQxO8Lg91AeeKMwS0HBo2glbpiBb6ryg9v8G73yBjUcaVT',
        ]);

        Profile::create([
            'user_id' => '1',
            'firstname' => 'Максим',
            'lastname' => 'Пивоваров',
        ]);

    }
}
