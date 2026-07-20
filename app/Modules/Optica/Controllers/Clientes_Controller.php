<?php

namespace App\Modules\Optica\Controllers;

use App\Controllers\BaseController;

class Clientes_Controller extends BaseController
{
    /**
     * Listado de clientes.
     */
    public function index()
    {
        return view(
            'App\Modules\Optica\Views\pages\clientes\index'
        );
    }

    /**
     * Formulario para registrar un nuevo cliente.
     */
    public function nuevo()
    {
        return view(
            'App\Modules\Optica\Views\pages\clientes\nuevo'
        );
    }
}