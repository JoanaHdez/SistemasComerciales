<?php

namespace App\Modules\Optica\Controllers;

use App\Controllers\BaseController;

class Pedidos_Controller extends BaseController
{
    public function index()
    {
        return view(
            'App\Modules\Optica\Views\pages\pedidos\index'
        );
    }
}