<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductLog extends Model
{
    //

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'product_id', 'site_price', 'deviation',
    ];
    //
    public function product()
    {
        return $this->belongsTo('App\Product');
    }

    public function setPriceAttribute($value)
    {
        $this->attributes['price'] = ceil($value * 100);
    }

    public function getPriceAttribute($value)
    {
        return (float)$value / 100;
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
