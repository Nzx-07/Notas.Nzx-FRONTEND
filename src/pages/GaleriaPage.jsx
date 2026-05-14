import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { obtenerTemas, activarTema } from "../services/api"

const ArrowLeftIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>
)

const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
)

const paletas = {
  blanco:    { fondo: "#ffffff", sidebar: "#f9fafb", acento: "#e5e7eb" },
  noche:     { fondo: "#111827", sidebar: "#1f2937", acento: "#374151" },
  bosque:    { fondo: "#022c22", sidebar: "#064e3b", acento: "#065f46" },
  aurora:    { fondo: "#1e1b4b", sidebar: "#312e81", acento: "#4338ca" },
  desierto:  { fondo: "#431407", sidebar: "#7c2d12", acento: "#c2410c" },
  oceano:    { fondo: "#0c4a6e", sidebar: "#075985", acento: "#0284c7" },
  volcan:    { fondo: "#450a0a", sidebar: "#7f1d1d", acento: "#b91c1c" },
  niebla:    { fondo: "#f8fafc", sidebar: "#f1f5f9", acento: "#cbd5e1" },
  cafe:      { fondo: "#1c1007", sidebar: "#292015", acento: "#44341a" },
  sakura:    { fondo: "#fff0f3", sidebar: "#ffe4e8", acento: "#fda4af" },
  obsidiana: { fondo: "#09090b", sidebar: "#18181b", acento: "#3b0764" },
  menta:     { fondo: "#f0fdf4", sidebar: "#dcfce7", acento: "#86efac" },
  lavanda:   { fondo: "#faf5ff", sidebar: "#f3e8ff", acento: "#d8b4fe" },
}

const PreviewTema = ({ paleta }) => (
  <div className="flex h-16 w-full overflow-hidden rounded-lg" style={{ backgroundColor: paleta.fondo }}>
    <div className="w-8 flex-shrink-0" style={{ backgroundColor: paleta.sidebar }} />
    <div className="flex flex-1 flex-col gap-1.5 p-2">
      <div className="h-2 w-3/4 rounded" style={{ backgroundColor: paleta.acento }} />
      <div className="h-2 w-1/2 rounded" style={{ backgroundColor: paleta.acento }} />
      <div className="h-2 w-2/3 rounded" style={{ backgroundColor: paleta.acento }} />
    </div>
  </div>
)

export default function GaleriaPage() {
  const [temas, setTemas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [activando, setActivando] = useState(null)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await obtenerTemas()
        if (res.exito) setTemas(res.data)
      } catch (e) {
        console.error("Error cargando temas:", e)
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [])

  const handleActivar = async (tema) => {
    setActivando(tema.id)
    setError("")
    try {
      const res = await activarTema(tema.id)
      if (res.exito) {
        localStorage.setItem("tema", tema.id)
        setTemas(prev => prev.map(t => ({ ...t, estaActivo: t.id === tema.id })))
      } else {
        setError(res.mensaje)
      }
    } catch (e) {
      setError("Error activando tema")
    } finally {
      setActivando(null)
    }
  }

  if (cargando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">Cargando temas...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center" style={{
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
            }}>
              <span className="text-sm font-bold text-white">N</span>
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">Galería de temas</span>
          </div>
          <button onClick={() => navigate("/espacio")}
            className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
            <ArrowLeftIcon className="h-4 w-4" />
            Volver al espacio
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 px-4 py-3">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Galería de temas</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Elige el tema de tu espacio</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {temas.map(tema => (
            <div key={tema.id} className={`rounded-xl border-2 p-4 transition-all ${
              tema.estaActivo
                ? "border-gray-900 dark:border-white"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
            }`}>
              <PreviewTema paleta={paletas[tema.id] || paletas.blanco} />
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{tema.nombre}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{tema.descripcion}</p>
                </div>
                <button
                  onClick={() => handleActivar(tema)}
                  disabled={activando === tema.id || tema.estaActivo}
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors ${
                    tema.estaActivo
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                      : "border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}>
                  {activando === tema.id
                    ? <span className="text-xs">...</span>
                    : tema.estaActivo
                      ? <CheckIcon className="h-4 w-4" />
                      : <span className="text-xs font-bold">+</span>}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}