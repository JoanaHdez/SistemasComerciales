<?php

namespace App\Modules\Optica\Controllers;

use App\Controllers\BaseController;

class Inicio_Controller extends BaseController
{
    public function index()
    {
        return view(
            'App\Modules\Optica\Views\pages\inicio\index'
        );
    }

    public function login()
    {
        return view(
            'App\Modules\Optica\Views\pages\auth\login'
        );
    }

    public function menu()
{
    return view(
        'App\Modules\Optica\Views\pages\menu\index'
    );
}
}