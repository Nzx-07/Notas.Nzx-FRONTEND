import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { obtenerPerfil } from "../services/api"

const ArrowLeftIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>
)
const CopyIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
  </svg>
)
const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
)
const SparklesIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
  </svg>
)
const SunIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
)
const MoonIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
)

export default function PerfilPage() {
  const [isDark, setIsDark] = useState(false)
  const [copiado, setCopiado] = useState(false)
  const [perfil, setPerfil] = useState(null)
  const [cargando, setCargando] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem("tema")
    if (saved === "dark") {
      document.documentElement.classList.add("dark")
      setIsDark(true)
    }

    const cargarPerfil = async () => {
      try {
        const res = await obtenerPerfil()
        if (res.exito) {
          setPerfil(res.data)
          if (res.data.apiKey) {
            localStorage.setItem("apiKey", res.data.apiKey)
          }
        }
      } catch (e) {
        console.error("Error cargando perfil:", e)
      } finally {
        setCargando(false)
      }
    }

    cargarPerfil()
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    document.documentElement.classList.toggle("dark", newIsDark)
    localStorage.setItem("tema", newIsDark ? "dark" : "light")
  }

  const copiarApiKey = async () => {
    try {
      await navigator.clipboard.writeText(perfil.apiKey)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch {
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    }
  }

  const porcentajeUso = perfil ? (perfil.requestsHoy / (perfil.limiteRequests === -1 ? 100 : perfil.limiteRequests)) * 100 : 0

  if (cargando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">Cargando perfil...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center" style={{
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
            }}>
              <span className="text-sm font-bold text-white">N</span>
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">Notas.Nzx</span>
          </div>
          <button onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
            {isDark
              ? <SunIcon className="h-5 w-5 text-white" />
              : <MoonIcon className="h-5 w-5 text-gray-900" />}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Mi perfil</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">Gestiona tu cuenta y preferencias</p>

        <div className="mt-8 space-y-6">
          {/* Email */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Correo electrónico</label>
            <p className="mt-1 text-gray-900 dark:text-white">{localStorage.getItem("email")}</p>
          </div>

          {/* Plan */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Plan actual</label>
            <div className="mt-2 flex items-center gap-3">
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                perfil?.plan === "Pro"
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}>
                {perfil?.plan}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {perfil?.plan === "Pro" ? "Requests ilimitados" : `${perfil?.limiteRequests} requests por día`}
              </span>
            </div>
          </div>

          {/* API Key */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">API Key</label>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 rounded-lg bg-gray-50 dark:bg-gray-800 px-4 py-2.5">
                <code className="text-sm text-gray-900 dark:text-white font-mono break-all">
                  {perfil?.apiKey?.slice(0, 12)}...{perfil?.apiKey?.slice(-8)}
                </code>
              </div>
              <button onClick={copiarApiKey}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                  copiado
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600"
                    : "border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}>
                {copiado ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-400">Usa esta clave para conectar aplicaciones externas</p>
          </div>

          {/* Uso del día */}
          {perfil?.plan !== "Pro" && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Uso del día</label>
              <div className="mt-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-semibold text-gray-900 dark:text-white">{perfil?.requestsHoy}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">de {perfil?.limiteRequests} requests</span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className={`h-full rounded-full transition-all ${
                    porcentajeUso >= 90 ? "bg-red-500" : porcentajeUso >= 70 ? "bg-yellow-500" : "bg-gray-900 dark:bg-white"
                  }`} style={{ width: `${Math.min(porcentajeUso, 100)}%` }} />
                </div>
                <p className="mt-2 text-xs text-gray-400">Se reinicia a medianoche</p>
              </div>
            </div>
          )}

          {/* Upgrade a Pro */}
          {perfil?.plan === "Free" && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-900 dark:bg-white">
                  <SparklesIcon className="h-5 w-5 text-white dark:text-gray-900" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Pasa a Pro</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Obtén requests ilimitados y acceso a todos los temas.
                  </p>
                  <button className="mt-4 rounded-lg bg-gray-900 dark:bg-white px-5 py-2.5 text-sm font-medium text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100">
                    Mejorar a Pro
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Volver */}
          <button onClick={() => navigate("/espacio")}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-3 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">
            <ArrowLeftIcon className="h-4 w-4" />
            Volver a mi espacio
          </button>
        </div>
      </main>
    </div>
  )
}