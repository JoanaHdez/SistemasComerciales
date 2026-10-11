<?php

namespace App\Modules\Optica\Controllers;

use App\Controllers\BaseController;

class Consulta_Controller extends BaseController
{
    /* ==========================================================
       CONSULTA PRINCIPAL
    ========================================================== */

    public function index()
    {
        return view(
            'App\Modules\Optica\Views\pages\consulta\index'
        );
    }


    /* ==========================================================
       NUEVA CONSULTA
    ========================================================== */

    public function nueva()
    {
        return view(
            'App\Modules\Optica\Views\pages\consulta\nueva\index'
        );
    }
}