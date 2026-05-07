const BASE_URL = "https://notas-nzx-api.onrender.com"

const headers = (token = null, apiKey = null) => ({
  "Content-Type": "application/json",
  ...(token && { Authorization: `Bearer ${token}` }),
  ...(apiKey && { "X-Api-Key": apiKey }),
})

const obtenerToken = () => localStorage.getItem("token")
const obtenerApiKey = () => localStorage.getItem("apiKey")

// Auth
export const registrar = async (email, contrasena) => {
  const res = await fetch(`${BASE_URL}/api/auth/registrar`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ email, "contraseña": contrasena }),
  })
  return res.json()
}

export const login = async (email, contrasena) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ email, "contraseña": contrasena }),
  })
  return res.json()
}

// Notas
export const obtenerNotas = async () => {
  const res = await fetch(`${BASE_URL}/api/notas`, {
    headers: headers(obtenerToken(), obtenerApiKey()),
  })
  return res.json()
}

export const crearNota = async (contenido) => {
  const res = await fetch(`${BASE_URL}/api/notas`, {
    method: "POST",
    headers: headers(obtenerToken(), obtenerApiKey()),
    body: JSON.stringify({ contenido }),
  })
  return res.json()
}

export const eliminarNota = async (id) => {
  const res = await fetch(`${BASE_URL}/api/notas/${id}`, {
    method: "DELETE",
    headers: headers(obtenerToken(), obtenerApiKey()),
  })
  return res.json()
}

// Perfil
export const obtenerPerfil = async () => {
  const res = await fetch(`${BASE_URL}/api/perfil`, {
    headers: headers(obtenerToken()),
  })
  return res.json()
}

//Modificacion para agregar "PUT" en la API
export const actualizarNota = async (id, contenido) => {
  const res = await fetch(`${BASE_URL}/api/notas/${id}`, {
    method: "PUT",
    headers: headers(obtenerToken(), obtenerApiKey()),
    body: JSON.stringify({ contenido }),
  })
  return res.json()
}

// Carpetas
export const obtenerCarpetas = async () => {
  const res = await fetch(`${BASE_URL}/api/carpetas`, {
    headers: headers(obtenerToken()),
  })
  return res.json()
}

export const crearCarpetaAPI = async (nombre) => {
  const res = await fetch(`${BASE_URL}/api/carpetas`, {
    method: "POST",
    headers: headers(obtenerToken()),
    body: JSON.stringify({ nombre }),
  })
  return res.json()
}

export const eliminarCarpetaAPI = async (id) => {
  const res = await fetch(`${BASE_URL}/api/carpetas/${id}`, {
    method: "DELETE",
    headers: headers(obtenerToken()),
  })
  return res.json()
}

export const moverNotaACarpeta = async (notaId, carpetaId) => {
  const res = await fetch(`${BASE_URL}/api/carpetas/mover-nota/${notaId}`, {
    method: "PUT",
    headers: headers(obtenerToken()),
    body: JSON.stringify({ carpetaId }),
  })
  return res.json()
}