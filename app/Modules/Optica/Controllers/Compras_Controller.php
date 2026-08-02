<?php

namespace App\Modules\Optica\Controllers;

use App\Controllers\BaseController;

class Compras_Controller extends BaseController
{
    public function index()
    {
        return view(
            'App\Modules\Optica\Views\pages\compras\index'
        );
    }
}