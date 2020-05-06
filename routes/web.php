<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
// use TCG\Voyager\Facades\Voyager;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('login', 'SpaController@index')->name('login');
Route::get('register', 'SpaController@index')->name('register');
Route::get('password/reset', 'SpaController@index')->name('password.request');
Route::get('password/reset/{token}', 'SpaController@index')->middleware(['addtokenemailtoscript'])->name('password.reset');
Route::get('password/confirm', 'SpaController@index')->name('password.confirm');
Route::get('email/verify', 'SpaController@index')->name('verification.notice');
Route::get('email/verify/{id}/{hash}', 'Auth\VerificationController@verify')->name('verification.verify');


Route::get('/', 'SpaController@index')->name('index');

Route::get('personal', 'SpaController@index');
Route::get('personal/{control}', 'SpaController@index');
Route::get('personal/{control}/{id}', 'SpaController@index');
Route::get('personal/{control}/{id}/{action}', 'SpaController@index');
Route::get('personal/{control}/{id}/{action}/{sid}', 'SpaController@index');
Route::get('personal/{control}/{id}/{action}/{sid}/{saction}', 'SpaController@index');

// Route::any('profile/{action}', ['uses' => 'Api\V1\ProfileController@web']);
