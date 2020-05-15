<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Resources\Company as CompanyResource;
use App\Company;
use App\Http\Resources\Site as SiteResource;
use App\Site;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', 'Api\Auth\RegisterController@register');
Route::post('/password/email', 'Api\Auth\ForgotPasswordController@sendResetLinkEmail');
Route::post('/login', 'Api\Auth\LoginController@login');
Route::get('/companies', function(){
    return ['companies' => CompanyResource::collection(Company::all())];
});

Route::post('/password/email', 'Api\Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
Route::post('/password/reset', 'Api\Auth\ResetPasswordController@reset')->name('password.update');
Route::post('/password/confirm', 'Api\Auth\ConfirmPasswordController@confirm');


Route::middleware('auth:api')->group(function () {
    Route::get('/sites', function(){
        return ['sites' => SiteResource::collection(Site::all())];
    });
    Route::post('/logout', 'Api\Auth\LoginController@logout');
    Route::get('/get-user', 'Api\AuthController@getUser');
    Route::post('/profile/setAvatar', 'Api\Personal\ProfileController@setAvatar');

    Route::resource('/folders', 'Api\Personal\FoldersController', ['except' => ['edit', 'create']]);
    Route::resource('/projects', 'Api\Personal\ProjectsController', ['except' => ['edit', 'create']]);
    Route::resource('/project/{project_id}/products', 'Api\Personal\ProductsController', ['except' => ['edit', 'create']]);
    Route::post('/project/{project_id}/xls', 'Api\Personal\ProductsController@xls');
    
    Route::get('/getProjects', 'Api\Personal\ProjectsController@getProjects');
    Route::post('/setFolder', 'Api\Personal\ProjectsController@setFolder');

    
});
