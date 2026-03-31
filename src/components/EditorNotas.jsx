import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import { TextStyle } from "@tiptap/extension-text-style"
import Color from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"
import Link from "@tiptap/extension-link"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"

const BoldIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h8a4 4 0 0 0 0-8H6v8Zm0 0h9a4 4 0 0 1 0 8H6v-8Z" />
  </svg>
)
const ItalicIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 4h-9M14 20H5M15 4 9 20" />
  </svg>
)
const UnderlineIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 20h14M7 4v8a5 5 0 0 0 10 0V4" />
  </svg>
)
const StrikeIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M7 7c0-1.657 2.239-3 5-3s5 1.343 5 3M7 17c0 1.657 2.239 3 5 3s5-1.343 5-3" />
  </svg>
)
const AlignLeftIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h12M3 18h18" />
  </svg>
)
const AlignCenterIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M6 12h12M3 18h18" />
  </svg>
)
const AlignRightIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M9 12h12M3 18h18" />
  </svg>
)
const ListIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
  </svg>
)
const ListNumberIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6h11M9 12h11M9 18h11M4 6h1M4 12h1M4 18h1" />
  </svg>
)
const ChecklistIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
)
const LinkIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
  </svg>
)

const BotonBarra = ({ onClick, activo, titulo, children }) => (
  <button onMouseDown={(e) => { e.preventDefault(); onClick() }} title={titulo}
    className={`flex h-7 w-7 items-center justify-center rounded transition-colors ${
      activo
        ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
        : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
    }`}>
    {children}
  </button>
)

const Separador = () => <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />

export default function EditorNotas({ contenido, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: { class: "list-disc pl-5 space-y-1" }
        },
        orderedList: {
          HTMLAttributes: { class: "list-decimal pl-5 space-y-1" }
        },
        listItem: {
          HTMLAttributes: { class: "leading-relaxed" }
        },
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
      TaskList.configure({
        HTMLAttributes: { class: "pl-0 space-y-1" }
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: { class: "flex items-start gap-2" }
      }),
    ],
    content: contenido,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "outline-none text-gray-700 dark:text-gray-300 leading-relaxed focus:outline-none",
      },
    },
  })

  if (!editor) return null

  const agregarLink = () => {
    const url = window.prompt("URL del enlace:")
    if (url) editor.chain().focus().setLink({ href: url }).run()
  }

  const cambiarTamano = (valor) => {
    if (valor === "p") {
      editor.chain().focus().setParagraph().run()
    } else {
      editor.chain().focus().toggleHeading({ level: parseInt(valor) }).run()
    }
  }

  const nivelActual = () => {
    if (editor.isActive("heading", { level: 1 })) return "1"
    if (editor.isActive("heading", { level: 2 })) return "2"
    if (editor.isActive("heading", { level: 3 })) return "3"
    return "p"
  }

  return (
    <div className="flex flex-col h-full">

      {/* Área de escritura — crece y es scrolleable */}
      <div className="flex-1 overflow-y-auto px-4 py-4 md:px-8">
        <style>{`
          .ProseMirror ul { list-style-type: disc; padding-left: 1.25rem; }
          .ProseMirror ol { list-style-type: decimal; padding-left: 1.25rem; }
          .ProseMirror li { margin-bottom: 0.25rem; }
          .ProseMirror ul[data-type="taskList"] { list-style: none; padding-left: 0; }
          .ProseMirror ul[data-type="taskList"] li { display: flex; align-items: flex-start; gap: 0.5rem; }
          .ProseMirror ul[data-type="taskList"] li > label { margin-top: 2px; flex-shrink: 0; }
          .ProseMirror ul[data-type="taskList"] li > label input[type="checkbox"] { cursor: pointer; width: 14px; height: 14px; }
          .ProseMirror ul[data-type="taskList"] li > div { flex: 1; }
          .ProseMirror h1 { font-size: 1.875rem; font-weight: 700; margin-bottom: 0.5rem; }
          .ProseMirror h2 { font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem; }
          .ProseMirror h3 { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; }
          .ProseMirror p { margin-bottom: 0.5rem; }
          .ProseMirror a { color: #3b82f6; text-decoration: underline; }
        `}</style>
        <EditorContent editor={editor} />
      </div>

      {/* Barra de formato — fija en la parte inferior */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 flex-shrink-0">
        <div className="flex flex-wrap items-center gap-0.5">

          {/* Formato básico */}
          <BotonBarra onClick={() => editor.chain().focus().toggleBold().run()} activo={editor.isActive("bold")} titulo="Negrita">
            <BoldIcon />
          </BotonBarra>
          <BotonBarra onClick={() => editor.chain().focus().toggleItalic().run()} activo={editor.isActive("italic")} titulo="Cursiva">
            <ItalicIcon />
          </BotonBarra>
          <BotonBarra onClick={() => editor.chain().focus().toggleUnderline().run()} activo={editor.isActive("underline")} titulo="Subrayado">
            <UnderlineIcon />
          </BotonBarra>
          <BotonBarra onClick={() => editor.chain().focus().toggleStrike().run()} activo={editor.isActive("strike")} titulo="Tachado">
            <StrikeIcon />
          </BotonBarra>

          <Separador />

          {/* Tipografía */}
          <select value={nivelActual()}
            onChange={(e) => cambiarTamano(e.target.value)}
            className="h-7 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs text-gray-700 dark:text-gray-300 px-1 focus:outline-none cursor-pointer">
            <option value="p">Normal</option>
            <option value="1">Título 1</option>
            <option value="2">Título 2</option>
            <option value="3">Título 3</option>
          </select>

          <Separador />

          {/* Color de texto */}
          <div className="flex items-center gap-1" title="Color de texto">
            <span className="text-xs text-gray-500 dark:text-gray-400">A</span>
            <input type="color" defaultValue="#374151"
              onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
              className="h-5 w-5 rounded cursor-pointer border-0 bg-transparent p-0"
            />
          </div>

          {/* Color de fondo */}
          <div className="flex items-center gap-1 ml-1" title="Color de fondo">
            <span className="text-xs text-gray-500 dark:text-gray-400">F</span>
            <input type="color" defaultValue="#ffffff"
              onInput={(e) => editor.chain().focus().setHighlight({ color: e.target.value }).run()}
              className="h-5 w-5 rounded cursor-pointer border-0 bg-transparent p-0"
            />
          </div>

          <Separador />

          {/* Alineación */}
          <BotonBarra onClick={() => editor.chain().focus().setTextAlign("left").run()} activo={editor.isActive({ textAlign: "left" })} titulo="Izquierda">
            <AlignLeftIcon />
          </BotonBarra>
          <BotonBarra onClick={() => editor.chain().focus().setTextAlign("center").run()} activo={editor.isActive({ textAlign: "center" })} titulo="Centro">
            <AlignCenterIcon />
          </BotonBarra>
          <BotonBarra onClick={() => editor.chain().focus().setTextAlign("right").run()} activo={editor.isActive({ textAlign: "right" })} titulo="Derecha">
            <AlignRightIcon />
          </BotonBarra>

          <Separador />

          {/* Listas */}
          <BotonBarra onClick={() => editor.chain().focus().toggleBulletList().run()} activo={editor.isActive("bulletList")} titulo="Lista">
            <ListIcon />
          </BotonBarra>
          <BotonBarra onClick={() => editor.chain().focus().toggleOrderedList().run()} activo={editor.isActive("orderedList")} titulo="Lista numerada">
            <ListNumberIcon />
          </BotonBarra>
          <BotonBarra onClick={() => editor.chain().focus().toggleTaskList().run()} activo={editor.isActive("taskList")} titulo="Checklist">
            <ChecklistIcon />
          </BotonBarra>

          <Separador />

          {/* Link */}
          <BotonBarra onClick={agregarLink} activo={editor.isActive("link")} titulo="Insertar link">
            <LinkIcon />
          </BotonBarra>

        </div>
      </div>
    </div>
  )
}