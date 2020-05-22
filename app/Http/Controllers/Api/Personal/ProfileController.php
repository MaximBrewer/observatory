<?php

namespace App\Http\Controllers\Api\Personal;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use Exception;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Str;
use App\Http\Resources\User as UserResource;

class ProfileController extends Controller
{
    //
    public function setAvatar(Request $request)
    {
        $user = User::findOrFail(Auth::user()->id);
        try {
            $img = Image::make($request->post('image'));
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

    public function web(Request $request, $action)
    {
        return $this->$action($request);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = User::findOrFail(Auth::user()->id);
        $model = $user->profile;

        $attributes = $request->all();

        $request->validate([
            "firstname" => "required|min:2",
            "lastname" => "required|min:2",
            "phone" => "required|min:6",
        ]);
        
        $model->update($attributes);
        $user = User::find(Auth::user()->id);

        return ['user' => new UserResource($user)];
    }
}
