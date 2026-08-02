<?php

namespace App\Modules\Optica\Controllers;

use App\Controllers\BaseController;

class Agenda_Controller extends BaseController
{
    /**
     * Agenda de citas.
     */
    public function index()
    {
        return view(
            'App\Modules\Optica\Views\pages\agenda\index'
        );
    }

    public function nueva()
    {
        return view(
            'App\Modules\Optica\Views\pages\agenda\nueva'
        );
    }
}