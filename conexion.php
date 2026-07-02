<?php

$conexion = new mysqli("localhost", "root", "", "login.empleados");

if ($conexion->connect_error) {
    die("Error de conexión");
}

?>