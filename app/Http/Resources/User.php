<?php

namespace App\Http\Resources;


use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
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
            'email' => $this->email,
            'profile' => [
                'firstname' => $this->profile->firstname,
                'lastname' => $this->profile->lastname,
                'avatar' => $this->profile->avatar,
                'phone' => $this->profile->phone,
            ],
            'company' => [
                'id' => $this->profile->company->id,
                'title' => $this->profile->company->title
            ]
        ];
    }
}
