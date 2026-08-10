<?php

namespace App\Modules\Optica\Controllers;

use App\Controllers\BaseController;

class Perfil_Controller extends BaseController
{
    public function index()
    {
        return view(
            'App\Modules\Optica\Views\pages\perfil\index'
        );
    }
}