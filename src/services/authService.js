// Servicio de Autenticación conectado a la Base de Datos MySQL (red_social_db en Backend RedSocial)

// Función auxiliar con reintentos para soportar Proxy de Vite, 127.0.0.1 y localhost
async function peticionAuth(endpoint, body) {
  const urlsAProbar = [
    `/api/auth${endpoint}`,
    `http://127.0.0.1:3000/api/auth${endpoint}`,
    `http://localhost:3000/api/auth${endpoint}`,
  ];

  let ultimoError = null;

  for (const url of urlsAProbar) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          ok: false,
          error: data.msg || data.error || "Error en la base de datos.",
        };
      }

      return {
        ok: true,
        data,
      };
    } catch (err) {
      ultimoError = err;
      // Continuar al siguiente formato de URL (127.0.0.1 / localhost)
    }
  }

  return {
    ok: false,
    error: `No se pudo conectar con el servidor Backend (puerto 3000). Asegúrate de tener el Backend encendido ('npm run dev' en la carpeta 'Backend RedSocial') y MySQL activo en XAMPP. (${ultimoError?.message || "Conexión rechazada"})`,
  };
}

export const authService = {
  // 1. REGISTRO EN LA BASE DE DATOS MySQL (red_social_db -> tabla 'usuarios')
  registrarUsuario: async (datos) => {
    const respuesta = await peticionAuth("/register", {
      nombre: datos.nombre.trim(),
      email: datos.email.trim(),
      contrasena: datos.password.trim(),
      fecha_nacimiento: datos.fechaNacimiento || "1998-04-01",
      genero: datos.genero || "Hombre",
    });

    if (!respuesta.ok) {
      return {
        success: false,
        error: respuesta.error,
      };
    }

    return {
      success: true,
      msg: respuesta.data.msg || "Usuario registrado exitosamente en la base de datos red_social_db (tabla usuarios).",
    };
  },

  // 2. INICIO DE SESIÓN CON LA BASE DE DATOS MySQL (red_social_db -> tabla 'usuarios')
  loginUsuario: async (email, contrasena) => {
    const respuesta = await peticionAuth("/login", {
      email: email.trim(),
      contrasena: contrasena.trim(),
    });

    if (!respuesta.ok) {
      return {
        success: false,
        error: respuesta.error,
      };
    }

    const usuarioDB = respuesta.data.usuario || {};
    const usuarioFormateado = {
      id: usuarioDB.id,
      name: usuarioDB.nombre || email,
      handle: `@${(usuarioDB.email || email).split("@")[0]}`,
      email: usuarioDB.email || email,
      avatar: "https://www.w3schools.com/w3images/avatar3.png",
      job: "Miembro Red Social",
      location: "Medellín, Colombia",
      birthday: "1998-04-01",
      origen: "red_social_db.usuarios",
    };

    // Guardar sesión en LocalStorage
    localStorage.setItem("user_token", `token-mysql-${usuarioDB.id || Date.now()}`);
    localStorage.setItem("red_social_usuario", JSON.stringify(usuarioFormateado));
    localStorage.setItem("red_social_auth", "true");

    return {
      success: true,
      user: usuarioFormateado,
      token: `token-mysql-${usuarioDB.id || Date.now()}`,
    };
  },

  // 3. OBTENER USUARIO ACTUAL DE LA SESIÓN
  obtenerUsuarioActual: () => {
    try {
      const guardado = localStorage.getItem("red_social_usuario");
      if (guardado) return JSON.parse(guardado);
    } catch {
      // ignore
    }
    return {
      name: "Juan David Naranjo",
      handle: "@juandavidnaranjo",
      avatar: "https://www.w3schools.com/w3images/avatar3.png",
      job: "Designer, UI",
      location: "Medellín, Colombia",
      birthday: "1998-04-01",
      origen: "red_social_db.usuarios",
    };
  },

  // 4. CERRAR SESIÓN
  logout: () => {
    try {
      localStorage.removeItem("user_token");
      localStorage.removeItem("red_social_usuario");
      localStorage.setItem("red_social_auth", "false");
    } catch {
      // ignore
    }
  },
};
