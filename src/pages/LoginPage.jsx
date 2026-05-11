import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { login, obtenerPerfil } from "../services/api"

const EyeIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
)

const EyeSlashIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
)

export default function LoginPage() {
  const [isDark, setIsDark] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)
  const [verPassword, setVerPassword] = useState(false)
  const navigate = useNavigate()

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setCargando(true)

    try {
      const res = await login(email, password)

      if (res.exito) {
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("email", res.data.email)

        try {
          const perfil = await obtenerPerfil()
          if (perfil.exito && perfil.data?.apiKey) {
            localStorage.setItem("apiKey", perfil.data.apiKey)
            localStorage.setItem("plan", perfil.data.plan)
            localStorage.setItem("tema", perfil.data.temaActivo)
          }
        } catch (e) {
          console.error("Error obteniendo perfil:", e)
        }

        navigate("/espacio")
      } else {
        setError("Email o contraseña incorrectos")
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.")
    } finally {
      setCargando(false)
    }
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
          <div className="mb-8 flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center" style={{
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
            }}>
              <span className="text-xl font-bold text-white">N</span>
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">Notas.Nzx</h1>
            <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              Inicia sesión para acceder a tus notas
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Correo electrónico
              </label>
              <input type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com" required
                className="mt-1.5 block w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Contraseña
              </label>
              <div className="relative mt-1.5">
                <input type={verPassword ? "text" : "password"} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" required
                  className="block w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 pr-10 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
                />
                <button type="button" onClick={() => setVerPassword(!verPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  {verPassword
                    ? <EyeSlashIcon className="h-4 w-4" />
                    : <EyeIcon className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <button type="submit" disabled={cargando}
              className="w-full rounded-lg bg-gray-900 dark:bg-white px-4 py-2.5 text-sm font-medium text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100 disabled:opacity-50">
              {cargando ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            ¿No tienes cuenta?{" "}
            <a href="/registro" className="font-medium text-gray-900 dark:text-white hover:underline">
              Regístrate
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}