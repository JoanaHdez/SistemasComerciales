<?= $this->extend('App\Modules\Optica\Views\layouts\auth') ?>
<?= $this->section('title') ?>Menú principal | Opticool<?= $this->endSection() ?>
<?= $this->section('styles') ?><link rel="stylesheet" href="<?= base_url('assets/optica/css/pages/menu.css') ?>"><?= $this->endSection() ?>
<?= $this->section('content') ?>
<section class="main-menu"><div class="main-menu__decorations" aria-hidden="true"><span></span><span></span><span></span></div><div class="main-menu__container">
<header class="main-menu__brand"><span class="main-menu__eyebrow">SISTEMA DE GESTIÓN</span><h1>Opticool</h1><p>Óptica y salud visual</p></header>
<div class="main-menu__actions">
<?php foreach ([
['optica/dashboard','Dashboard','Resumen de la operación','⌂'],['optica/clientes','Clientes','Buscar y registrar clientes','◎'],['optica/consulta','Consulta','Atención y expediente clínico','◉'],['optica/agenda','Agenda','Citas y calendario','□'],['optica/ventas/nueva','Nueva venta','Registrar productos y pagos','$'],['optica/pedidos','Pedidos','Seguimiento de laboratorio','◇'],['optica/inventario','Inventario','Productos y existencias','▦'],['optica/compras','Compras','Órdenes y proveedores','↓']
] as [$ruta,$titulo,$texto,$icono]): ?>
<a href="<?= base_url($ruta) ?>" class="main-menu__button"><span class="main-menu__icon"><?= esc($icono) ?></span><span><strong><?= esc($titulo) ?></strong><small><?= esc($texto) ?></small></span></a>
<?php endforeach ?>
</div>
<nav class="main-menu__footer-actions" aria-label="Acciones secundarias"><a href="<?= base_url('optica/reportes') ?>">Reportes</a><a href="<?= base_url('optica/perfil') ?>">Mi perfil</a><a href="<?= base_url('optica/configuracion') ?>">Configuración</a><a href="<?= base_url('optica/login') ?>">Salir</a></nav>
</div></section>
<?= $this->endSection() ?>
