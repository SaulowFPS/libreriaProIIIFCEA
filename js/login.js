// Array de usuarios administradores (puedes agregar más si es necesario)
const administradores = [
  { nombre: "AlmirAdmin", contraseña: "Almir12345", rol: "admin" },
  { nombre: "SaulAdmin", contraseña: "Saul6789", rol: "admin" },
  { nombre: "EstelvinaAdmin", contraseña: "Estelvina101112", rol: "admin" },
];

// Función para verificar las credenciales del usuario
function verificarCredenciales(username, password) {
  let usuario = administradores.find(
    (admin) => admin.nombre === username && admin.contraseña === password
  );

  if (!usuario) {
    const storedUser = localStorage.getItem(username);
    if (storedUser) {
      const parsedStoredUser = JSON.parse(storedUser);
      if (parsedStoredUser.contraseña === password) {
        usuario = {
          nombre: username,
          contraseña: password,
          rol: parsedStoredUser.rol,
        };
      }
    }
  }

  return usuario;
}

// Función para cerrar sesión
function cerrarSesion() {
  alertify
    .confirm(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      function () {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loggedUser");
        localStorage.removeItem("loggedRole");
        window.location.href = "login.html";
      },
      function () {
        // No hacer nada si el usuario cancela
      }
    )
    .set("labels", { ok: "Sí", cancel: "No" });
}

document.addEventListener("DOMContentLoaded", function () {
  const loggedRole = localStorage.getItem("loggedRole");
  if (loggedRole === "admin") {
    document.getElementById("admin-option").disabled = false;
  }

  document
    .getElementById("login-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const usuario = verificarCredenciales(username, password);

      if (usuario) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loggedUser", usuario.nombre);
        localStorage.setItem("loggedRole", usuario.rol);
        alertify.notify(
          "Bienvenido " + usuario.nombre,
          "success",
          5,
          function () {}
        );
        setTimeout(function () {
          window.location.href = "index.html";
        }, 750);
      } else {
        alertify.error("Usuario o contraseña incorrectos");
      }
    });

  let timeout = null; // Variable para almacenar el temporizador

  // Función para verificar si las contraseñas coinciden
  function verificarCoincidenciaDeContraseñas() {
    const passwordInput = document.getElementById("new-password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    if (
      confirmPasswordInput.value !== "" &&
      passwordInput.value !== confirmPasswordInput.value
    ) {
      alertify.error("Las contraseñas no coinciden");
    }
  }

  // Evento 'input' para el campo de nueva contraseña
  document
    .getElementById("new-password")
    .addEventListener("input", function () {
      clearTimeout(timeout);
      timeout = setTimeout(verificarCoincidenciaDeContraseñas, 1000);
    });

  // Evento 'input' para el campo de confirmar contraseña
  document
    .getElementById("confirm-password")
    .addEventListener("input", function () {
      clearTimeout(timeout);
      timeout = setTimeout(verificarCoincidenciaDeContraseñas, 1000);
    });

  // Evento 'blur' para el campo de confirmar contraseña
  document
    .getElementById("confirm-password")
    .addEventListener("blur", function () {
      verificarCoincidenciaDeContraseñas();
    });

  // Evento 'focus' para el campo de confirmar contraseña
  document
    .getElementById("confirm-password")
    .addEventListener("focus", function () {
      const passwordInput = document.getElementById("new-password");
      if (passwordInput.value !== "" && this.value === "") {
        alertify.warning("Por favor, confirme la contraseña");
      }
    });

  document
    .getElementById("create-account-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const username = document.getElementById("new-username").value;
      const password = document.getElementById("new-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
      const selectedRole = document.getElementById("user-role").value;

      if (password === confirmPassword) {
        const newUser = { contraseña: password, rol: selectedRole };
        localStorage.setItem(username, JSON.stringify(newUser));
        alertify.notify(
          "Usuario creado correctamente",
          "success",
          5,
          function () {}
        );
        document.getElementById("create-account-form").reset();
      } else {
        alertify.error("Las contraseñas no coinciden");
      }
    });
});

// Botón para mostrar/ocultar la contraseña
document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const toggleButton = this;

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleButton.innerHTML = '<i class="bi bi-eye"></i>';
    } else {
      passwordInput.type = "password";
      toggleButton.innerHTML = '<i class="bi bi-eye-slash"></i>';
    }
  });

// Funciones de animación con anime.js
function mostrarFormularioCrearCuenta() {
  anime({
    targets: "#login-container",
    translateY: -800,
    easing: "easeInOutQuad",
    duration: 150,
    complete: function (anim) {
      document.getElementById("login-container").style.display = "none";
      document.getElementById("create-account-container").style.display =
        "block";
      anime({
        targets: "#create-account-container",
        translateY: [800, 0],
        easing: "easeInOutQuad",
        duration: 150,
      });
    },
  });
}

function volverAlLoginDesdeCrear() {
  anime({
    targets: "#create-account-container",
    translateY: 800,
    easing: "easeInOutQuad",
    duration: 150,
    complete: function (anim) {
      document.getElementById("create-account-container").style.display =
        "none";
      document.getElementById("login-container").style.display = "block";
      anime({
        targets: "#login-container",
        translateY: [-800, 0],
        easing: "easeInOutQuad",
        duration: 150,
      });
    },
  });
}

document
  .getElementById("create-account-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    mostrarFormularioCrearCuenta();
  });

document
  .getElementById("back-to-login-from-create")
  .addEventListener("click", function (event) {
    event.preventDefault();
    volverAlLoginDesdeCrear();
  });
