<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Auth\RegistersUsers;
use App\Http\Resources\User as UserResource;

class AuthController extends Controller
{

    public function getUser()
    {
        return new UserResource(User::find(Auth::user()->id));
    }
}
