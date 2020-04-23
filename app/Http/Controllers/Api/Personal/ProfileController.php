<?php

namespace App\Http\Controllers\Api\Personal;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use Exception;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    //
    public function setAvatar(Request $r)
    {
        $user = User::findOrFail(Auth::user()->id);
        try {
            $img = Image::make($r->post('image'));
            $img->fit(160, 160);
            @mkdir(storage_path('app/public/profiles') . DIRECTORY_SEPARATOR . $user->profile->id, 0777, true);
            $filename = Str::random(20);
            $path = DIRECTORY_SEPARATOR . $user->profile->id . DIRECTORY_SEPARATOR . $filename . '.png';
            $img->save(storage_path('app/public/profiles') . $path);
            $user->profile->update(['avatar' => 'profiles' . $path]);
            return '/profiles' . $path;
        } catch (Exception $e) {
            return '/profiles/default.png';
        }
    }

    public function web(Request $r, $action)
    {
        return $this->$action($r);
    }
}
