<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Profile extends Model
{
    //
    protected $fillable = [
        'firstname',
        'lastname',
        'secondname',
        'phone',
        'user_id',
        'company_id',
        'avatar',
        'age',
        'sex'
    ];

    public function getCompanyAttribute()
    {
        return Company::find($this->company_id);
    }
}
