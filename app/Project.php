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
        'title', 'user_id', 'site_id', 'higher_deviation', 'lower_deviation', 'frequency'
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

    public function setLowerDeviationAttribute($value)
    {
        $this->attributes['lower_deviation'] = ceil((float)$value * 100);
    }

    public function getLowerDeviationAttribute($value)
    {
        return (float)$value / 100;
    }

    public function setHigherDeviationAttribute($value)
    {
        $this->attributes['higher_deviation'] = ceil((float)$value * 100);
    }

    public function getHigherDeviationAttribute($value)
    {
        return (float)$value / 100;
    }


}
