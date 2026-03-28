import { useState, useEffect } from "react"

const temas = [
  {
    id: "blanco",
    nombre: "Blanco",
    descripcion: "Limpio y luminoso, perfecto para el día",
    colores: { bg: "bg-white", sidebar: "bg-gray-50", acento: "bg-gray-200" }
  },
  {
    id: "noche",
    nombre: "Noche",
    descripcion: "Oscuro y elegante, ideal para trabajar de noche",
    colores: { bg: "bg-zinc-900", sidebar: "bg-zinc-800", acento: "bg-zinc-700" }
  },
  {
    id: "bosque",
    nombre: "Bosque",
    descripcion: "Tonos verdes naturales, relajante para la vista",
    colores: { bg: "bg-emerald-950", sidebar: "bg-emerald-900", acento: "bg-emerald-800" }
  },
]

export default function RegistroPage() {
  const [isDark, setIsDark] = useState(false)
  const [paso, setPaso] = useState(1)
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [temaSeleccionado, setTemaSeleccionado] = useState("blanco")

  useEffect(() => {
    const saved = localStorage.getItem("tema")
    if (saved === "dark") {
      document.documentElement.classList.add("dark")
      setIsDark(true)
    }
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    document.documentElement.classList.toggle("dark", newIsDark)
    localStorage.setItem("tema", newIsDark ? "dark" : "light")
  }

  const handleSiguiente = (e) => {
    e.preventDefault()
    setPaso(2)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí irá la lógica de registro con la API
  }

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      <div className="absolute right-4 top-4">
        <button onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          {isDark ? (
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-gray-900" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          )}
        </button>
      </div>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center" style={{
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
            }}>
              <span className="text-xl font-bold text-white">N</span>
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">Notas.Nzx</h1>
            <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              {paso === 1 ? "Crea tu cuenta en segundos" : "Elige el tema de tu espacio"}
            </p>
          </div>

          {/* Indicador de pasos */}
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className={`h-2 w-8 rounded-full transition-colors ${paso >= 1 ? "bg-gray-900 dark:bg-white" : "bg-gray-200 dark:bg-gray-700"}`} />
            <div className={`h-2 w-8 rounded-full transition-colors ${paso >= 2 ? "bg-gray-900 dark:bg-white" : "bg-gray-200 dark:bg-gray-700"}`} />
          </div>

          {/* Paso 1 */}
          {paso === 1 && (
            <form onSubmit={handleSiguiente} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre" required
                  className="mt-1.5 block w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com" required
                  className="mt-1.5 block w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)}
                  placeholder="••••••••" required minLength={8}
                  className="mt-1.5 block w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
                />
                <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">Mínimo 8 caracteres</p>
              </div>
              <button type="submit"
                className="w-full rounded-lg bg-gray-900 dark:bg-white px-4 py-2.5 text-sm font-medium text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100">
                Siguiente
              </button>
            </form>
          )}

          {/* Paso 2 */}
          {paso === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                {temas.map((tema) => (
                  <button key={tema.id} type="button" onClick={() => setTemaSeleccionado(tema.id)}
                    className={`relative w-full rounded-xl border-2 p-4 text-left transition-all ${
                      temaSeleccionado === tema.id
                        ? "border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
                    }`}>
                    <div className="flex items-start gap-4">
                      {/* Preview del tema */}
                      <div className={`flex h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg ${tema.colores.bg}`}>
                        <div className={`w-5 ${tema.colores.sidebar}`} />
                        <div className="flex flex-1 flex-col gap-1 p-1.5">
                          <div className={`h-1.5 w-full rounded ${tema.colores.acento}`} />
                          <div className={`h-1.5 w-3/4 rounded ${tema.colores.acento}`} />
                          <div className={`h-1.5 w-1/2 rounded ${tema.colores.acento}`} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">{tema.nombre}</h3>
                        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{tema.descripcion}</p>
                      </div>
                      {temaSeleccionado === tema.id && (
                        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-900 dark:bg-white">
                          <svg className="h-3 w-3 text-white dark:text-gray-900" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setPaso(1)}
                  className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">
                  Atrás
                </button>
                <button type="submit"
                  className="flex-1 rounded-lg bg-gray-900 dark:bg-white px-4 py-2.5 text-sm font-medium text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100">
                  Crear mi espacio
                </button>
              </div>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="font-medium text-gray-900 dark:text-white hover:underline">
              Inicia sesión
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}