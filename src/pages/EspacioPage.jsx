import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import EditorNotas from "../components/EditorNotas"
import { obtenerNotas, crearNota as crearNotaAPI, eliminarNota as eliminarNotaAPI } from "../services/api"

// Iconos
const PlusIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
)
const MenuIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
)
const CloseIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
)
const FolderIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
  </svg>
)
const FolderPlusIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
  </svg>
)
const TrashIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
)
const ChevronIcon = ({ className, isOpen }) => (
  <svg className={`${className} transition-transform ${isOpen ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
)
const DocumentIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
)
const UserIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
)
const PaletteIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
  </svg>
)
const LogoutIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
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

const carpetasIniciales = []
const notasIniciales = []

export default function EspacioPage() {
  const [isDark, setIsDark] = useState(false)
  // ✅ AÑADIDO: estado para tema bosque
  const [esBosque, setEsBosque] = useState(false)
  const [sidebarAbierto, setSidebarAbierto] = useState(true)
  const [mobileSidebarAbierto, setMobileSidebarAbierto] = useState(false)
  const [notas, setNotas] = useState(notasIniciales)
  const [carpetas, setCarpetas] = useState(carpetasIniciales)
  const [notaSeleccionada, setNotaSeleccionada] = useState(null)
  const [mostrarModalTema, setMostrarModalTema] = useState(false)
  const [menuContextual, setMenuContextual] = useState(null)
  const [modalEliminarCarpeta, setModalEliminarCarpeta] = useState(null)
  const [creandoCarpeta, setCreandoCarpeta] = useState(false)
  const [nombreNuevaCarpeta, setNombreNuevaCarpeta] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem("tema")
    // ✅ MODIFICADO: detectar tema bosque además de dark/noche
    if (saved === "dark" || saved === "noche") {
      document.documentElement.classList.add("dark")
      setIsDark(true)
    } else if (saved === "bosque") {
      setEsBosque(true)
    }

    const cargarNotas = async () => {
      try {
        const res = await obtenerNotas()
        if (res.exito && res.data) {
          const notasFormateadas = res.data.map(n => ({
            id: n.id,
            titulo: n.contenido?.split('\n')[0]?.replace(/<[^>]*>/g, '').substring(0, 50) || "Sin título",
            contenido: n.contenido || "",
            fecha: new Date(n.creadoEn).toLocaleDateString("es-ES", {
              day: "numeric", month: "short", year: "numeric"
            })
          }))
          setNotas(notasFormateadas)
        }
      } catch (e) {
        console.error("Error cargando notas:", e)
      }
    }

    cargarNotas()

    const cerrarMenu = () => setMenuContextual(null)
    window.addEventListener("click", cerrarMenu)
    return () => window.removeEventListener("click", cerrarMenu)
  }, [])

  // ✅ MODIFICADO: toggleTema ahora maneja los 3 temas
  const aplicarTema = (tema) => {
    document.documentElement.classList.remove("dark")
    setIsDark(false)
    setEsBosque(false)

    if (tema === "noche") {
      document.documentElement.classList.add("dark")
      setIsDark(true)
    } else if (tema === "bosque") {
      setEsBosque(true)
    }

    localStorage.setItem("tema", tema)
    setMostrarModalTema(false)
  }

  const toggleCarpeta = (id) => {
    setCarpetas(carpetas.map(c => c.id === id ? { ...c, abierta: !c.abierta } : c))
  }

  const crearNota = async () => {
    try {
      const res = await crearNotaAPI("Nueva nota")
      if (res.exito && res.data) {
        const nueva = {
          id: res.data.id,
          titulo: "Nueva nota",
          contenido: "",
          fecha: new Date(res.data.creadoEn).toLocaleDateString("es-ES", {
            day: "numeric", month: "short", year: "numeric"
          })
        }
        setNotas([nueva, ...notas])
        setNotaSeleccionada(nueva)
        setMobileSidebarAbierto(false)
      }
    } catch (e) {
      console.error("Error creando nota:", e)
    }
  }

  const actualizarTitulo = (titulo) => {
    if (!notaSeleccionada) return
    const actualizada = { ...notaSeleccionada, titulo }
    setNotaSeleccionada(actualizada)
    setNotas(notas.map(n => n.id === actualizada.id ? actualizada : n))
  }

  const actualizarContenido = (contenido) => {
    if (!notaSeleccionada) return
    const actualizada = { ...notaSeleccionada, contenido }
    setNotaSeleccionada(actualizada)
    setNotas(notas.map(n => n.id === actualizada.id ? actualizada : n))
  }

  const eliminarNota = async (id) => {
    try {
      await eliminarNotaAPI(id)
      setNotas(notas.filter(n => n.id !== id))
      if (notaSeleccionada?.id === id) setNotaSeleccionada(null)
      setMenuContextual(null)
    } catch (e) {
      console.error("Error eliminando nota:", e)
    }
  }

  const crearCarpeta = () => {
    if (!nombreNuevaCarpeta.trim()) return
    const nueva = { id: Date.now().toString(), nombre: nombreNuevaCarpeta.trim(), abierta: true }
    setCarpetas([...carpetas, nueva])
    setNombreNuevaCarpeta("")
    setCreandoCarpeta(false)
  }

  const eliminarCarpeta = (carpeta) => {
    setCarpetas(carpetas.filter(c => c.id !== carpeta.id))
    setNotas(notas.filter(n => n.carpetaId !== carpeta.id))
    setModalEliminarCarpeta(null)
  }

  const abrirMenuContextual = (e, nota) => {
    e.preventDefault()
    setMenuContextual({ x: e.clientX, y: e.clientY, nota })
  }

  const notasSinCarpeta = notas.filter(n => !n.carpetaId)
  const notasEnCarpeta = (id) => notas.filter(n => n.carpetaId === id)

  // ✅ AÑADIDO: helper para clases según tema
  const tc = {
    fondo: esBosque ? "bg-emerald-950" : "bg-white dark:bg-gray-900",
    sidebar: esBosque ? "bg-emerald-900 border-emerald-800" : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700",
    header: esBosque ? "bg-emerald-950 border-emerald-800" : "border-gray-200 dark:border-gray-700",
    texto: esBosque ? "text-emerald-50" : "text-gray-900 dark:text-white",
    textoMuted: esBosque ? "text-emerald-300" : "text-gray-500 dark:text-gray-400",
    hover: esBosque ? "hover:bg-emerald-800" : "hover:bg-gray-100 dark:hover:bg-gray-800",
    notaActiva: esBosque ? "bg-emerald-800 text-emerald-50" : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white",
    notaHover: esBosque ? "hover:bg-emerald-800/50" : "hover:bg-gray-50 dark:hover:bg-gray-800/50",
    borde: esBosque ? "border-emerald-800" : "border-gray-200 dark:border-gray-700",
    input: esBosque ? "border-emerald-700 bg-emerald-900 text-emerald-50 focus:ring-emerald-500" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-gray-900 dark:focus:ring-white",
  }

  const ContenidoSidebar = () => (
    <div className="flex h-full flex-col">
      {/* ✅ MODIFICADO: colores del encabezado según tema */}
      <div className={`flex items-center justify-between border-b px-4 py-3 ${tc.borde}`}>
        <span className={`text-sm font-medium ${tc.texto}`}>Mi espacio</span>
        <div className="flex items-center gap-1">
          <button onClick={crearNota} title="Nueva nota"
            className={`flex h-7 w-7 items-center justify-center rounded-lg ${tc.textoMuted} ${tc.hover}`}>
            <PlusIcon className="h-4 w-4" />
          </button>
          <button onClick={() => setCreandoCarpeta(true)} title="Nueva carpeta"
            className={`flex h-7 w-7 items-center justify-center rounded-lg ${tc.textoMuted} ${tc.hover}`}>
            <FolderPlusIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Input nueva carpeta */}
      {creandoCarpeta && (
        <div className="px-3 pt-3 pb-2">
          <input autoFocus type="text" value={nombreNuevaCarpeta}
            onChange={(e) => setNombreNuevaCarpeta(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") crearCarpeta(); if (e.key === "Escape") setCreandoCarpeta(false) }}
            placeholder="Nombre de la carpeta"
            className={`w-full rounded-lg border px-3 py-1.5 text-sm focus:outline-none focus:ring-2 ${tc.input}`}
          />
          <p className={`mt-1 text-xs ${tc.textoMuted}`}>Enter para crear · Esc para cancelar</p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-3 py-3">
        {carpetas.map(carpeta => (
          <div key={carpeta.id} className="mb-1">
            <div className={`group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm ${tc.textoMuted} ${tc.hover} hover:${tc.texto}`}>
              <button onClick={() => toggleCarpeta(carpeta.id)} className="flex flex-1 items-center gap-2">
                <ChevronIcon className="h-3 w-3" isOpen={carpeta.abierta} />
                <FolderIcon className="h-4 w-4" />
                <span>{carpeta.nombre}</span>
              </button>
              <button onClick={() => setModalEliminarCarpeta(carpeta)}
                className="hidden group-hover:flex h-5 w-5 items-center justify-center rounded text-gray-400 hover:text-red-500">
                <TrashIcon className="h-3.5 w-3.5" />
              </button>
            </div>
            {carpeta.abierta && (
              <div className="ml-4 mt-1 space-y-0.5">
                {notasEnCarpeta(carpeta.id).map(nota => (
                  <button key={nota.id}
                    onClick={() => { setNotaSeleccionada(nota); setMobileSidebarAbierto(false) }}
                    onContextMenu={(e) => abrirMenuContextual(e, nota)}
                    className={`flex w-full flex-col items-start rounded-lg px-3 py-2 text-left transition-colors ${
                      notaSeleccionada?.id === nota.id ? tc.notaActiva : `${tc.textoMuted} ${tc.notaHover}`
                    }`}>
                    <span className="text-sm font-medium truncate w-full">{nota.titulo}</span>
                    <span className={`text-xs ${tc.textoMuted}`}>{nota.fecha}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {notasSinCarpeta.length > 0 && (
          <div className="mt-2 space-y-0.5">
            {notasSinCarpeta.map(nota => (
              <button key={nota.id}
                onClick={() => { setNotaSeleccionada(nota); setMobileSidebarAbierto(false) }}
                onContextMenu={(e) => abrirMenuContextual(e, nota)}
                className={`flex w-full flex-col items-start rounded-lg px-3 py-2 text-left transition-colors ${
                  notaSeleccionada?.id === nota.id ? tc.notaActiva : `${tc.textoMuted} ${tc.notaHover}`
                }`}>
                <div className="flex items-center gap-2 w-full">
                  <DocumentIcon className="h-4 w-4 shrink-0" />
                  <span className="text-sm font-medium truncate">{nota.titulo}</span>
                </div>
                <span className={`text-xs ${tc.textoMuted} ml-6`}>{nota.fecha}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ✅ MODIFICADO: barra inferior con colores según tema */}
      <div className={`border-t px-2 py-2 ${tc.borde}`}>
        <div className="flex items-center justify-around">
          <button onClick={() => navigate("/perfil")}
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${tc.textoMuted} transition-colors ${tc.hover}`}>
            <UserIcon className="h-5 w-5" />
          </button>
          <button onClick={() => setMostrarModalTema(true)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${tc.textoMuted} transition-colors ${tc.hover}`}>
            <PaletteIcon className="h-5 w-5" />
          </button>
          <button onClick={() => navigate("/login")}
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${tc.textoMuted} transition-colors ${tc.hover}`}>
            <LogoutIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    // ✅ MODIFICADO: fondo principal según tema
    <div className={`flex h-screen ${tc.fondo}`}>
      {/* ✅ MODIFICADO: sidebar con colores según tema */}
      <aside className={`hidden border-r transition-all duration-300 md:flex md:flex-col ${tc.sidebar} ${sidebarAbierto ? "w-64" : "w-0 overflow-hidden border-r-0"}`}>
        <ContenidoSidebar />
      </aside>

      {mobileSidebarAbierto && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileSidebarAbierto(false)} />
      )}

      {/* ✅ MODIFICADO: sidebar mobile con colores según tema */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r transition-transform duration-300 md:hidden ${tc.sidebar} ${mobileSidebarAbierto ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="absolute right-2 top-2">
          <button onClick={() => setMobileSidebarAbierto(false)}
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${tc.textoMuted} ${tc.hover}`}>
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <ContenidoSidebar />
      </aside>

      <main className="flex flex-1 flex-col overflow-hidden">
        {/* ✅ MODIFICADO: header con colores según tema */}
        <header className={`flex h-12 items-center gap-2 border-b px-4 ${tc.header}`}>
          <button onClick={() => setMobileSidebarAbierto(true)}
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${tc.textoMuted} ${tc.hover} md:hidden`}>
            <MenuIcon className="h-5 w-5" />
          </button>
          <button onClick={() => setSidebarAbierto(!sidebarAbierto)}
            className={`hidden h-8 w-8 items-center justify-center rounded-lg ${tc.textoMuted} ${tc.hover} md:flex`}>
            <MenuIcon className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center" style={{
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
            }}>
              <span className="text-xs font-bold text-white">N</span>
            </div>
            <span className={`text-sm font-medium ${tc.texto}`}>Notas.Nzx</span>
          </div>
        </header>

        <div className="flex-1 overflow-hidden flex flex-col">
          {notaSeleccionada ? (
            <div className="flex flex-col h-full">
              <div className="mx-auto w-full max-w-3xl px-4 pt-8 pb-2 md:px-8 flex-shrink-0">
                <input type="text" value={notaSeleccionada.titulo}
                  onChange={(e) => actualizarTitulo(e.target.value)}
                  className={`w-full border-none bg-transparent text-3xl font-semibold placeholder:text-gray-300 focus:outline-none ${tc.texto}`}
                  placeholder="Sin título"
                />
                <p className={`mt-2 text-sm ${tc.textoMuted}`}>{notaSeleccionada.fecha}</p>
              </div>
              <EditorNotas
                key={notaSeleccionada.id}
                contenido={notaSeleccionada.contenido}
                onChange={actualizarContenido}
              />
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center px-4">
              <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${esBosque ? "bg-emerald-900" : "bg-gray-100 dark:bg-gray-800"}`}>
                <DocumentIcon className={`h-8 w-8 ${tc.textoMuted}`} />
              </div>
              <h2 className={`mt-4 text-lg font-medium ${tc.texto}`}>No hay nota seleccionada</h2>
              <p className={`mt-1 text-center text-sm ${tc.textoMuted}`}>Selecciona una nota o crea una nueva</p>
              <button onClick={crearNota}
                className={`mt-4 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${esBosque ? "bg-emerald-700 text-emerald-50 hover:bg-emerald-600" : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700"}`}>
                <PlusIcon className="h-4 w-4" />
                Nueva nota
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Menú contextual */}
      {menuContextual && (
        <>
          <div className="fixed inset-0 z-50" onClick={() => setMenuContextual(null)} />
          <div className="fixed z-50 w-52 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg py-1"
            style={{ top: menuContextual.y, left: menuContextual.x }}>
            {carpetas.length === 0 ? (
              <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 dark:text-gray-600 cursor-not-allowed">
                <FolderIcon className="h-4 w-4" />
                <span>Mover a carpeta</span>
                <span className="ml-auto text-xs">(sin carpetas)</span>
              </div>
            ) : (
              <>
                <div className="px-3 py-1.5 text-xs text-gray-400 dark:text-gray-500 font-medium">Mover a carpeta</div>
                {carpetas.map(carpeta => (
                  <button key={carpeta.id}
                    onClick={() => {
                      setNotas(notas.map(n => n.id === menuContextual.nota.id ? { ...n, carpetaId: carpeta.id } : n))
                      if (notaSeleccionada?.id === menuContextual.nota.id) {
                        setNotaSeleccionada({ ...notaSeleccionada, carpetaId: carpeta.id })
                      }
                      setMenuContextual(null)
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <FolderIcon className="h-4 w-4 text-gray-400" />
                    {carpeta.nombre}
                    {menuContextual.nota.carpetaId === carpeta.id && (
                      <span className="ml-auto text-xs text-gray-400">✓ actual</span>
                    )}
                  </button>
                ))}
                {menuContextual.nota.carpetaId && (
                  <button
                    onClick={() => {
                      setNotas(notas.map(n => n.id === menuContextual.nota.id ? { ...n, carpetaId: undefined } : n))
                      if (notaSeleccionada?.id === menuContextual.nota.id) {
                        setNotaSeleccionada({ ...notaSeleccionada, carpetaId: undefined })
                      }
                      setMenuContextual(null)
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <DocumentIcon className="h-4 w-4 text-gray-400" />
                    Sin carpeta
                  </button>
                )}
              </>
            )}
            <div className="my-1 border-t border-gray-100 dark:border-gray-800" />
            <button onClick={() => eliminarNota(menuContextual.nota.id)}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
              <TrashIcon className="h-4 w-4" />
              Eliminar nota
            </button>
          </div>
        </>
      )}

      {/* Modal eliminar carpeta */}
      {modalEliminarCarpeta && (
        <>
          <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setModalEliminarCarpeta(null)} />
          <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Eliminar carpeta</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              ¿Eliminar la carpeta <strong>"{modalEliminarCarpeta.nombre}"</strong>?
            </p>
            {notasEnCarpeta(modalEliminarCarpeta.id).length > 0 && (
              <div className="mt-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 px-3 py-2">
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  ⚠️ Esta carpeta contiene <strong>{notasEnCarpeta(modalEliminarCarpeta.id).length} nota(s)</strong> que también se eliminarán.
                </p>
              </div>
            )}
            <div className="mt-4 flex gap-3">
              <button onClick={() => setModalEliminarCarpeta(null)}
                className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
                Cancelar
              </button>
              <button onClick={() => eliminarCarpeta(modalEliminarCarpeta)}
                className="flex-1 rounded-lg bg-red-500 py-2 text-sm font-medium text-white hover:bg-red-600">
                Eliminar
              </button>
            </div>
          </div>
        </>
      )}

      {/* ✅ MODIFICADO: Modal tema con 3 opciones incluyendo Bosque */}
      {mostrarModalTema && (
        <>
          <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setMostrarModalTema(false)} />
          <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cambiar tema</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Elige cómo quieres ver tu espacio</p>
            <div className="mt-4 space-y-2">
              <button onClick={() => aplicarTema("blanco")}
                className={`flex w-full items-center gap-3 rounded-lg border p-3 transition-colors ${!isDark && !esBosque ? "border-gray-900 bg-gray-50" : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-gray-200">
                  <SunIcon className="h-5 w-5 text-gray-700" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Blanco</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Fondo blanco, texto oscuro</p>
                </div>
              </button>
              <button onClick={() => aplicarTema("noche")}
                className={`flex w-full items-center gap-3 rounded-lg border p-3 transition-colors ${isDark ? "border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800" : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 border border-gray-700">
                  <MoonIcon className="h-5 w-5 text-gray-100" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Noche</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Fondo negro, texto claro</p>
                </div>
              </button>
              {/* ✅ AÑADIDO: opción Bosque en el modal */}
              <button onClick={() => aplicarTema("bosque")}
                className={`flex w-full items-center gap-3 rounded-lg border p-3 transition-colors ${esBosque ? "border-emerald-600 bg-emerald-50" : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-950 border border-emerald-800">
                  <div className="h-5 w-5 rounded-full bg-emerald-500" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Bosque</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Tonos verdes naturales</p>
                </div>
              </button>
            </div>
            <button onClick={() => setMostrarModalTema(false)}
              className="mt-4 w-full rounded-lg border border-gray-200 dark:border-gray-700 py-2 text-sm text-gray-500 dark:text-gray-400 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
              Cancelar
            </button>
          </div>
        </>
      )}
    </div>
  )
}