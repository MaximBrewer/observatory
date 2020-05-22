<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class CompanyFull extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $pivot = false;
        foreach (Auth::user()->companies as $c) {
            if ($c->id == $this->id) {
                $pivot = $c->pivot;
            }
        }
        if ($pivot) {
            return [
                'id' => $this->id,
                'title' => $this->title,
                'www' => $this->www,
                'contact' => $this->contact,
                'users' => $this->users,
                'invites' => $this->invites,
                'phone' => $this->phone,
                'email' => $this->email,
                'role' => $pivot ? $pivot['role'] : ''
            ];
        } else {
            return [
                'id' => $this->id,
                'title' => $this->title,
                'www' => $this->www,
                'users' => $this->users,
                'invites' => $this->invites,
                'contact' => $this->contact,
                'phone' => $this->phone,
                'email' => $this->email
            ];
        }
    }
}
