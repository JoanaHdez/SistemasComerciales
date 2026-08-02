<?php

namespace App\Modules\Optica\Controllers;

use App\Controllers\BaseController;

class Expediente_Controller extends BaseController
{
    /**
     * Muestra el expediente clínico del cliente.
     */
    public function index()
    {
        return view(
            'App\Modules\Optica\Views\pages\expediente\index'
        );
    }
}