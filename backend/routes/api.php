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

Route::group(['middleware' => ['api']], function () {
    Route::post('/login','Auth\LoginController@login');
    Route::post('/register', 'Auth\RegisterController@register');
    Route::post('/logout', 'Auth\LoginController@logout');
    Route::get('/environment', 'Api\EnvironmentController@get');
});

Route::group(['middleware' => ['auth:api']], function () {
    Route::get('/ping', 'Api\PingController@ping');

    Route::put('/subscription', 'Api\SubscriptionController@update');
    Route::delete('/subscription/{endpoint}', 'Api\SubscriptionController@delete')->where('endpoint', '.*');

    Route::post('/reminder', 'Api\ReminderController@store');

    Route::post('/messages', 'Api\MessageController@send');
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
