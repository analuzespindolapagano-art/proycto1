<?php

include("conexion.php");

$nombre = $_POST["nombre"];
$apellido = $_POST["apellido"];
$correo = $_POST["correo"];
$sueldo = $_POST["sueldo"];

$sql = "INSERT INTO login(nombre, apellido, correo, sueldo)
VALUES('$nombre','$apellido','$correo','$sueldo')";

if($conexion->query($sql)){
    echo "Datos guardados correctamente";
}else{
    echo "Error al guardar";
}

?>