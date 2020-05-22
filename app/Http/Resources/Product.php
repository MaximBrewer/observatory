<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ProductLog as ProductLogResource;

class Product extends JsonResource
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
            'id' => $this->id,
            'title' => $this->title,
            'active' => $this->active,
            'brand' => $this->brand,
            'article' => $this->article,
            'url' => $this->url,
            'price' => $this->price,
            'last_price' => $this->last_price ? $this->last_price : 'N/A',
            'deviation' => (float)$this->last_price ? ($this->price * 100 - $this->last_price * 100) / $this->price : 'N/A',
            'project' => [
                'id' => $this->project->id,
                'title' => $this->project->title
            ],
            'log' => new ProductLogResource($this->log),
            'project_id' => $this->project->id,
            'higher_deviation' => $this->higher_deviation,
            'lower_deviation' => $this->lower_deviation,
            'frequency' => $this->frequency,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

        ];
    }
}
