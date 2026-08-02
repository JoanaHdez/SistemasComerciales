<?php

namespace App\Modules\Optica\Controllers;

use App\Controllers\BaseController;

class Historial_Controller extends BaseController
{
    /**
     * Muestra el historial clínico completo del cliente.
     */
    public function index()
    {
        return view(
            'App\Modules\Optica\Views\pages\historial\index'
        );
    }
}