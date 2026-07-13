<?php

use CodeIgniter\Router\RouteCollection;
use Config\Services;

/**
 * @var RouteCollection $routes
 */

$routes = Services::routes();

$routes->get('/', 'Home::index');

$opticaRoutes = APPPATH . 'Modules/Optica/Routes.php';

if (is_file($opticaRoutes)) {
    require $opticaRoutes;
}