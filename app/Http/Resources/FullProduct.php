<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ProductLog as ProductLogResource;

class FullProduct extends JsonResource
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
            'url' => $this->url,
            'price' => $this->price,
            'last_price' => $this->last_price,
            'project' => [
                'id' => $this->project->id,
                'title' => $this->project->title
            ],
            'project_id' => $this->project->id,
            'higher_deviation' => $this->higher_deviation,
            'lower_deviation' => $this->lower_deviation,
            'frequency' => $this->frequency,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'logs' => ProductLogResource::collection($this->logs)
        ];
    }
}
