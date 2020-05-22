<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

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
        $pivot = $this->pivot;
        if (!$pivot) {
            foreach (Auth::user()->companies as $c) {
                if ($c->id == $this->id) {
                    $pivot = $c->pivot;
                }
            }
        }
        if ($pivot) {
            return [
                'id' => $this->id,
                'title' => $this->title,
                'www' => $this->www,
                'contact' => $this->contact,
                'phone' => $this->phone,
                'email' => $this->email,
                'role' => $pivot ? $pivot['role'] : ''
            ];
        } else {
            return [
                'id' => $this->id,
                'title' => $this->title,
                'www' => $this->www,
                'contact' => $this->contact,
                'phone' => $this->phone,
                'email' => $this->email
            ];
        }
    }
}
