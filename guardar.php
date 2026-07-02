<?php

include("conexion.php");

$nombre = $_POST["nombre"];
$apellido = $_POST["apellido"];
$correoelectronico = $_POST["correo electronico"];
$sueldo = $_POST["sueldo"];

$sql = "INSERT INTO login.empleados(nombre, apellido, correo electronico, sueldo)
VALUES( '$nombre','$apellido','$correoelectronico','$sueldo')";

if($conexion->query($sql)){
    echo "Datos guardados correctamente";
}else{
    echo "Error al guardar";
}

?>