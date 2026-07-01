document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Inicializamos Google con tu Client ID
    google.accounts.id.initialize({
        client_id: "645034059917-9s3gc6a1bsrj7aasbh0bg5d4pbqn42se.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    // 2. Le ordenamos a Google que dibuje SU botón oficial en tu nuevo div
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large", text: "signin_with" }
    );

    // Opcional: Muestra el cartelito flotante "One Tap" si el usuario ya está logueado
    google.accounts.id.prompt();

    // 3. Configuración del botón Cerrar Sesión
    const botonLogout = document.getElementById("logout");
    if (botonLogout) {
        botonLogout.onclick = () => {
            location.reload();
        };
    }
});

// 4. Esta función se ejecuta cuando el usuario selecciona su cuenta de Google con éxito
function handleCredentialResponse(response) {
    const perfilUsuario = decodeJwtResponse(response.credential);
    
    // Mostramos los datos en los párrafos de tu HTML
    document.getElementById("nombre").innerText = "Nombre: " + (perfilUsuario.given_name || perfilUsuario.name);
    document.getElementById("apellido").innerText = "Apellido: " + (perfilUsuario.family_name || "");
    document.getElementById("correo").innerText = "Correo: " + perfilUsuario.email;
    document.getElementById("sueldo").innerText = "Sueldo: $0.00"; 

    // ¡MAGIA!: También rellenamos los inputs de tu formulario PHP automáticamente
    document.querySelector("input[name='nombre']").value = perfilUsuario.given_name || perfilUsuario.name;
    document.querySelector("input[name='apellido']").value = perfilUsuario.family_name || "";
    document.querySelector("input[name='correo']").value = perfilUsuario.email;
    document.querySelector("input[name='sueldo']").value = 0; // Valor por defecto para el sueldo

    // Ocultamos el botón de Google y mostramos el panel de datos con el botón "Guardar" de PHP
    document.getElementById("buttonDiv").style.display = "none";
    document.getElementById("datos").style.display = "block";
}

// 5. Decodificador del token de Google
function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('0' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}