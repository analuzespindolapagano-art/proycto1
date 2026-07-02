<?php

$conexion = new mysqli("localhost", "root", "", "login");

if ($conexion->connect_error) {
    die("Error de conexión");
}

?>