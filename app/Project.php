<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'user_id', 'site_id', 'deviation', 'frequency'
    ];
    //
    public function user()
    {
        return $this->belongsTo('App\User');
    }
    public function site()
    {
        return $this->belongsTo('App\Site');
    }
    public function products()
    {
        return $this->hasMany('App\Product');
    }

    public function setDeviationAttribute($value)
    {
        $this->attributes['deviation'] = ceil($value * 100);
    }

    public function getDeviationAttribute($value)
    {
        return (float)$value / 100;
    }

}
