<?php

namespace App\Http\Controllers\Api\Personal;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Company;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Http\Resources\User as UserResource;
use App\Http\Resources\CompanyFull as CompanyFullResource;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function invite()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showFull()
    {
        //
        $user = User::find(Auth::user()->id);
        $company = Company::findOrFail($user->company_id);
        
        return ['company' => new CompanyFullResource($company)];
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function set(Request $request)
    {
        //
        $user = User::find(Auth::user()->id);
        $user->update(['company_id' => $request->id]);
        
        return ['user' => new UserResource($user)];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $attributes = $request->all();

        $request->validate([
            "title" => "required|min:2",
            "www" => "required|url",
            "email" => "required|email",
            "contact" => "required|min:6",
            "phone" => "required|min:6",
        ]);
        
        if($model = Company::create($attributes)){
            $user = User::find(Auth::user()->id);
            $user->update(['company_id' => $model->id]);
            $user->companies()->attach($model->id, ['role' => 'administrator']);
        }

        return ['user' => new UserResource($user)];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $model = Company::findOrfail($id);

        $attributes = $request->all();

        $request->validate([
            "title" => "required|min:2",
            "www" => "required|url",
            "email" => "required|email",
            "contact" => "required|min:6",
            "phone" => "required|min:6",
        ]);
        
        $model->update($attributes);
        $user = User::find(Auth::user()->id);

        return ['user' => new UserResource($user)];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
