// Referencias a los contenedores principales
const authContainer = document.getElementById("auth-container");
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const appContainer = document.getElementById("app-container");

// Referencias a mensajes de error
const registerMessage = document.getElementById("register-message");
const loginMessage = document.getElementById("login-message");

// Variable para almacenar el usuario registrado (simulación de base de datos)
let registeredUser = null;

// Función para alternar entre los formularios de registro e inicio de sesión
function alternarFormulario(formType) {
    if (formType === 'login') {
        registerForm.classList.add("oculto");
        loginForm.classList.remove("oculto");
    } else if (formType === 'register') {
        loginForm.classList.add("oculto");
        registerForm.classList.remove("oculto");
    }
    // Limpiar mensajes de error al cambiar de formulario
    registerMessage.textContent = "";
    loginMessage.textContent = "";
}

// Función para crear una cuenta (simulación de registro)
function crearCuenta() {
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    if (username.length < 4 || password.length < 4) {
        registerMessage.textContent = "El usuario y la contraseña deben tener al menos 4 caracteres.";
        return;
    }

    // Simulación de registro exitoso
    registeredUser = { username, password };
    registerMessage.textContent = "¡Cuenta creada con éxito! Ahora inicia sesión.";
    registerMessage.style.color = "green";
    
    // Limpiar campos y cambiar a la vista de login
    document.getElementById("reg-username").value = "";
    document.getElementById("reg-password").value = "";
    setTimeout(() => {
        alternarFormulario('login');
        registerMessage.style.color = "red"; // Volver al color original para errores
    }, 1500);
}

// Función para iniciar sesión
function iniciarSesion() {
    const usernameInput = document.getElementById("login-username").value.trim();
    const passwordInput = document.getElementById("login-password").value.trim();

    if (!registeredUser) {
        loginMessage.textContent = "No hay cuentas registradas. Por favor, crea una cuenta primero.";
        return;
    }

    if (usernameInput === registeredUser.username && passwordInput === registeredUser.password) {
        // Credenciales correctas: ocultar auth y mostrar app
        authContainer.classList.add("oculto");
        appContainer.classList.remove("oculto");
        loginMessage.textContent = ""; // Limpiar mensaje de error
    } else {
        // Credenciales incorrectas: mostrar mensaje de error
        loginMessage.textContent = "Usuario o contraseña incorrectos.";
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    // Ocultar app y mostrar auth (en el formulario de login)
    appContainer.classList.add("oculto");
    authContainer.classList.remove("oculto");
    alternarFormulario('login'); // Asegurarse de que se muestre el login

    // Limpiar campos de login
    document.getElementById("login-username").value = "";
    document.getElementById("login-password").value = "";
}


// --- Lógica de la Lista de Tareas ---

// Obtenemos la referencia del elemento <ul> donde se agregan las tareas
let lista = document.getElementById("lista");

// Función para agregar una nueva tarea
function agregarTarea() {
  // Obtenemos el texto que escribió el usuario
  let tareaTexto = document.getElementById("tarea").value;

  // Si el campo está vacío, no hacemos nada
  if (tareaTexto === "") return;

  // Creamos un nuevo elemento <li> para la lista
  let li = document.createElement("li");

  // Añadimos dentro del <li> el texto de la tarea y un botón "Eliminar"
  li.innerHTML = `
    <span onclick="alternarTarea(this)">${tareaTexto}</span>
    <button class="delete-btn" onclick="eliminarTarea(this)">Eliminar</button>
  `;

  // Insertamos el nuevo <li> dentro de la lista principal
  lista.appendChild(li);

  // Limpiamos el campo de texto para escribir otra tarea
  document.getElementById("tarea").value = "";
}

// Función para eliminar una tarea específica
function eliminarTarea(boton) {
  // Obtenemos el <li> (padre del botón) que se quiere eliminar
  let li = boton.parentElement;
  // Lo quitamos de la lista
  lista.removeChild(li);
}

// Función para limpiar toda la lista de tareas
function limpiarLista() {
  // Borramos todo el contenido del <ul>
  lista.innerHTML = "";
}

// Función para marcar TODAS las tareas como completadas
function marcarTodas() {
  // Seleccionamos todos los elementos <span> (texto de las tareas)
  let tareas = lista.querySelectorAll("li span");

  // Recorremos cada tarea y le agregamos la clase "completada"
  tareas.forEach(tarea => {
    tarea.classList.add("completada");
  });
}

// Función para alternar una tarea individual (completada / no completada)
function alternarTarea(elemento) {
  // Si tiene la clase "completada", la quita; si no la tiene, la pone
  elemento.classList.toggle("completada");
}
