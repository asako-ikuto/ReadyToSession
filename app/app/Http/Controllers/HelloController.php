<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HelloController extends Controller
{
    //axiosテスト用
    public function index(): string
    {
        return 'Hello World';
    }
}
