<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    //
    protected $fillable = [
        'title',
        'www',
        'contact',
        'phone',
        'email'
    ];

    public function administrators()
    {
        return $this->belongsToMany('App\User', 'user_company')->wherePivot('role', 'administrator');
    }

    public function managers()
    {
        return $this->belongsToMany('App\User', 'user_company')->wherePivot('role', 'manager');
    }

    public function users()
    {
        return $this->belongsToMany('App\User', 'user_company');
    }

    public function invites()
    {
        return $this->hasMany('App\Invite');
    }

}
