<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */

$routes->group('optica', [
    'namespace' => 'App\Modules\Optica\Controllers',
], static function ($routes) {
    $routes->get('/', 'Inicio_Controller::index');
});