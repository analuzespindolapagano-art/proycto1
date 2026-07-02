<?php

include("conexion.php");

$id = $_POST["id"];
$nombre = $_POST["nombre"];
$apellido = $_POST["apellido"];
$correo = $_POST["correo"];
$sueldo = $_POST["sueldo"];

$sql = "INSERT INTO empleados(id, nombre, apellido, correo, sueldo)
VALUES( '$id','$nombre','$apellido','$correo','$sueldo')";

if($conexion->query($sql)){
    echo "Datos guardados correctamente";
}else{
    echo "Error al guardar";
}

?>