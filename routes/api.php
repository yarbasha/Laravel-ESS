<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(["prefix"=>"v1", "namespace"=>"Api"], function($router){
    Route::group(["prefix" => "auth"], function(){
        Route::post("register", "AuthController@register");
        Route::post("login", "AuthController@login");
        Route::get("refresh", "AuthController@refresh");
    });
    Route::group(["middleware"=>"auth:api", "prefix"=> "auth"], function(){
        Route::post("logout", "AuthController@logout");
        Route::get("user", "AuthController@user");
    });
});

Route::apiResource("items", "Api\itemsController");