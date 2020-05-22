<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductLog extends Model
{
    //
    protected $touches = ['product'];

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

    public function setSitePriceAttribute($value)
    {
        $value ? $this->attributes['site_price'] = ceil($value * 100) : null;
    }

    public function getSitePriceAttribute($value)
    {
        return $value ? (float)$value / 100 : null;
    }

    public function setDeviationAttribute($value)
    {
        $value ? $this->attributes['deviation'] = ceil($value * 100) : null;
    }

    public function getDeviationAttribute($value)
    {
        return $value ? (float)$value / 100 : null;
    }
}
