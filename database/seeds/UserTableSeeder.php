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
            'password' => '$2y$10$jHWHMwOAs4XiYJLSn9VpDOFvDESFN1Fcl0AgsXpovFRK6BUiHvQUG',
            'remember_token' => 'HdOms5jKLWWL7uDe222XPfZJPHx1PKfqCTMaYhDF4RyJYva0u6vssZ4oVHM6',
        ]);


        Company::create([
            'title' => 'My Company',
            'manager_id' => '1',
        ]);


        Profile::create([
            'user_id' => '1',
            'company_id' => '1',
            'firstname' => 'Максим',
            'lastname' => 'Пивоваров',
        ]);

    }
}
