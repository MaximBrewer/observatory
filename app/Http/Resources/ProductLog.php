<?php

namespace App\Http\Resources;
use Illuminate\Support\Carbon;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductLog extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'site_price' => $this->site_price,
            'deviation' => $this->deviation,
            'created_at' => (new Carbon($this->created_at))->diffForHumans()
        ];
    }
}
