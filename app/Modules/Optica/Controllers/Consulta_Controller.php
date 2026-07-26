<?php

namespace App\Modules\Optica\Controllers;

use App\Controllers\BaseController;

class Consulta_Controller extends BaseController
{
    public function index()
    {
        return view(
            'App\Modules\Optica\Views\pages\consulta\index'
        );
    }
}