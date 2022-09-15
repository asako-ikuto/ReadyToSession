<?php

namespace App\Http\Controllers;

use App\User;
use Auth;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::where("id" , "!=" , auth()->user()->id)->get()->toJson(JSON_PRETTY_PRINT);
        return $users;
    }
}
