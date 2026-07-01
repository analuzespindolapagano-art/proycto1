// 1. Esperamos a que la página se cargue por completo
document.addEventListener("DOMContentLoaded", () => {
    
    // 2. Inicializamos la configuración de Google con tu Client ID
    google.accounts.id.initialize({
        client_id: "645034059917-9s3gc6a1bsrj7aasbh0bg5d4pbqn42se.apps.googleusercontent.com",
        callback: handleCredentialResponse // La función que procesará los datos del usuario
    });

    // 3. Le asignamos la función a tu botón con ID "login"
    const botonLogin = document.getElementById("login");
    if (botonLogin) {
        botonLogin.onclick = () => {
            // Abre el prompt oficial de Google para seleccionar la cuenta
            google.accounts.id.prompt((notification) => {
                if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                    // Si por alguna razón el prompt se bloquea, intentamos abrirlo de forma alternativa
                    console.log("El prompt automático no se mostró, intentando reabrir...");
                }
            });
        };
    }

    // 4. Le asignamos la función a tu botón con ID "logout"
    const botonLogout = document.getElementById("logout");
    if (botonLogout) {
        botonLogout.onclick = () => {
            // Recargamos la página para limpiar los datos de la pantalla sencillamente
            location.reload();
        };
    }
});

// 5. Esta función se ejecuta automáticamente cuando el usuario selecciona su cuenta de Google
function handleCredentialResponse(response) {
    // Decodificamos el token JWT seguro que nos envía Google
    const perfilUsuario = decodeJwtResponse(response.credential);
    
    // Insertamos la información exactamente en los párrafos de tu HTML
    document.getElementById("nombre").innerText = "Nombre: " + (perfilUsuario.given_name || perfilUsuario.name);
    document.getElementById("apellido").innerText = "Apellido: " + (perfilUsuario.family_name || "");
    document.getElementById("correo").innerText = "Correo: " + perfilUsuario.email;
    document.getElementById("sueldo").innerText = "Sueldo: $0.00 (Ejemplo)"; // Dato fijo de prueba
}

// 6. Función matemática interna para desencriptar los datos del Token de Google
function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('0' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}