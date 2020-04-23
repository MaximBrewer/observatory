<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    //
    protected $fillable = [
        'title',
        'manager_id'
    ];

    public function getcManagerAttribute()
    {
        return User::find($this->manager_id);
    }

}
