<?php

$conexion = new mysqli("localhost", "root", "", "empresa");

if ($conexion->connect_error) {
    die("Error de conexión");
}

?>