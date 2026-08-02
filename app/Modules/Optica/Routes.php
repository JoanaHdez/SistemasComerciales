<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */

$routes->group(
    'optica',
    ['namespace' => 'App\Modules\Optica\Controllers'],
    static function (RouteCollection $routes): void {

        $routes->get('/', 'Inicio_Controller::index');
        $routes->get('login', 'Inicio_Controller::login');
        $routes->get('menu', 'Inicio_Controller::menu');

        $routes->get('clientes', 'Clientes_Controller::index');
        $routes->get('clientes/nuevo', 'Clientes_Controller::nuevo');
        $routes->get('clientes/nuevo/graduacion', 'Clientes_Controller::graduacion');

        $routes->get('consulta', 'Consulta_Controller::index');

        $routes->get('ventas/nueva', 'Ventas_Controller::nueva');

        $routes->get('agenda', 'Agenda_Controller::index');

        $routes->get('inventario', 'Inventario_Controller::index');

        $routes->get('consulta/expediente', 'Expediente_Controller::index');
    }
);
