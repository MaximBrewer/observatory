<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Project extends JsonResource
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
            'site' => [
                'id' => $this->site->id,
                'title' => $this->site->title
            ],
            'site_id' => $this->site->id,
            'deviation' => $this->deviation,
            'frequency' => $this->frequency,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
