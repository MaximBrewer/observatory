<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'project_id', 'url', 'article',
        'price', 'higher_deviation', 'lower_deviation', 'frequency', 'brand'
    ];

    protected $appends = ['last_price'];
    //

    public function getLastPriceAttribute()
    {
        $model = ProductLog::where('product_id', 'id')->orderBy('id', 'DESC')->first();
        if ($model) return $model->site_price;
        return '';
    }

    public function logs()
    {
        return $this->hasMany('App\ProductLog')->orderBy('created_at');
    }

    public function getLogAttribute()
    {
        if (count($this->logs))
            return $this->logs[0];
        else return null;
    }

    public function project()
    {
        return $this->belongsTo('App\Project');
    }

    public function setLowerDeviationAttribute($value)
    {
        $this->attributes['lower_deviation'] = ceil((float) $value * 100);
    }

    public function getLowerDeviationAttribute($value)
    {
        return (float) $value / 100;
    }

    public function setHigherDeviationAttribute($value)
    {
        $this->attributes['higher_deviation'] = ceil((float) $value * 100);
    }

    public function getHigherDeviationAttribute($value)
    {
        return (float) $value / 100;
    }

    public function setPriceAttribute($value)
    {
        $this->attributes['price'] = ceil((float) $value * 100);
    }

    public function getPriceAttribute($value)
    {
        return (float) $value / 100;
    }
}
