<?php

include("conexion.php");

$id = $_POST["id"];
$nombre = $_POST["nombre"];
$apellido = $_POST["apellido"];
$correo_electronico = $_POST["correo_electronico"];
$sueldo = $_POST["sueldo"];

$sql = "INSERT INTO empleados(id, nombre, apellido, correo_electronico, sueldo)
VALUES( '$id','$nombre','$apellido','$correo_electronico','$sueldo')";

if($conexion->query($sql)){
    echo "Datos guardados correctamente";
}else{
    echo "Error al guardar";
}

?>