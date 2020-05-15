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
            'active' => !!$this->active,
            'site' => [
                'id' => $this->site->id,
                'title' => $this->site->title
            ],
            'user' => [
                'id' => $this->user->id,
                'title' => $this->user->profile->firstname . ' ' . $this->user->profile->lastname
            ],
            'company' => [
                'id' => $this->company->id,
                'title' => $this->company->title
            ],
            'site_id' => $this->site->id,
            'higher_deviation' => $this->higher_deviation,
            'lower_deviation' => $this->lower_deviation,
            'frequency' => $this->frequency,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
