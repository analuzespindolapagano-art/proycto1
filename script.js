function manejarLogin(response) {
    // Tomamos el token encriptado que nos da Google
    const tokenGoogle = response.credential;

    // Se lo enviamos a nuestro archivo PHP mediante POST
    fetch("guardar.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "credential=" + tokenGoogle
    })
    .then(res => res.text())
    .then(data => {
        console.log(data); // Ver en consola la respuesta de PHP
        
        // Si todo salió bien, mostramos la pantalla de éxito
        document.getElementById("login-screen").classList.add("hidden");
        document.getElementById("dashboard-screen").classList.remove("hidden");
        
        // Opcional: Recargar la página si querés que PHP pinte los datos reales
        // location.reload(); 
    })
    .catch(error => console.error("Error al enviar a PHP:", error));
}