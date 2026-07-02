<?php
include("conexion.php");

<<<<<<< HEAD
if (isset($_POST['credential'])) {
    $token = $_POST['credential'];

    // 1. Desencriptamos el Token de Google de forma segura en el servidor
    // Separamos el JWT para obtener la parte central (Payload) que tiene los datos
    $partes = explode('.', $token);
    if (count($partes) === 3) {
        $payload = base64_decode(str_replace(['-', '_'], ['+', '/'], $partes[1]));
        $datosUsuario = json_decode($payload, true);
=======
$id = $_POST["id"];
$nombre = $_POST["nombre"];
$apellido = $_POST["apellido"];
$correo = $_POST["correo"];
$sueldo = $_POST["sueldo"];

$sql = "INSERT INTO empleados(id, nombre, apellido, correo, sueldo)
VALUES( '$id','$nombre','$apellido','$correo','$sueldo')";
>>>>>>> f6f3d06fb4153778a1f8cd4885945deaa68d113f

        // 2. Extraemos los datos exactos del perfil de Google
        $nombre   = $conexion->real_escape_escape_string($datosUsuario['given_name'] ?? $datosUsuario['name']);
        $apellido = $conexion->real_escape_escape_string($datosUsuario['family_name'] ?? '');
        $correo   = $conexion->real_escape_escape_string($datosUsuario['email']);
        $sueldo   = 0.00; // Sueldo inicial simulado por defecto

        // 3. Verificamos si el correo ya existe en la base de datos para no duplicarlo
        $buscar = $conexion->query("SELECT * FROM empleados WHERE correo = '$correo'");
        
        if ($buscar->num_rows == 0) {
            // Si el empleado no existe, lo registramos
            $sql = "INSERT INTO empleados(nombre, apellido, correo, sueldo) VALUES('$nombre', '$apellido', '$correo', '$sueldo')";
            if ($conexion->query($sql)) {
                echo "Usuario de Google registrado y guardado correctamente.";
            } else {
                echo "Error al guardar en la base de datos.";
            }
        } else {
            echo "El usuario ya estaba registrado en el sistema.";
        }
    } else {
        echo "Token de Google inválido.";
    }
} else {
    echo "No se recibieron credenciales.";
}
?>