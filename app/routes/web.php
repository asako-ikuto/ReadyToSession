<?php

use App\Http\Controllers\PlayableListController;
use Illuminate\Http\Request;

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

Route::get('/', function () {
    return view('welcome');
});

// Auth::routes(['verify' => true]);
Route::post('/login', 'LoginController@login');
Route::post('/logout', 'LoginController@logout');
Route::post('/register', 'RegisterController@create');

Route::get('/login/{provider}', 'LoginController@redirectToProvider');
Route::get('/login/{provider}/callback', 'LoginController@handleProviderCallback');
Route::get('/auth', 'LoginController@isAuth');

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::resource('artists', 'ArtistController', ['only' => ['index']]);
    Route::resource('songs', 'SongController', ['only' => ['index']]);
    Route::resource('users', 'UserController', ['only' => ['index']]);
    Route::get('/admin', 'LoginController@isAdmin');
    Route::post('/playablelists/{playablelist}/add', 'PlayableListController@store');
    Route::post('/playablelists/{playablelist}/remove', 'PlayableListController@destroy');
    Route::get('/playablelists', 'PlayableListController@index');
    Route::get('/playablelists/detail', 'PlayableListController@indexDetail');
    Route::get('/playablelists/{user}', 'PlayableListController@userPlayableList');
});

Route::group(['middleware' => ['can:is_admin']], function () {
    Route::resource('artists', 'ArtistController', ['only' => ['store','update', 'destroy']]);
    Route::resource('songs', 'SongController', ['only' => ['store','update', 'destroy']]);
});
