<?php

namespace App\Modules\Optica\Controllers;

use App\Controllers\BaseController;

class Ventas_Controller extends BaseController
{
    public function nueva()
    {
        return view(
            'App\Modules\Optica\Views\pages\ventas\nueva'
        );
    }

    public function historial()
    {
        return view(
            'App\Modules\Optica\Views\pages\ventas\historial'
        );
    }
}