<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Company extends JsonResource
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
            'www' => $this->www,
            'contact' => $this->contact,
            'phone' => $this->phone,
            'email' => $this->email,
            // 'administrators' => $this->administrators,
            // 'managers' => $this->managers,
            // 'users' => $this->users,
        ];
    }
}
