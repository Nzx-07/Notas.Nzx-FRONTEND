export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <nav className="flex items-center gap-6">
          {["Privacidad", "Términos", "Contacto"].map((item) => (
            <a key={item} href="#" className="text-sm text-gray-500 dark:text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white">
              {item}
            </a>
          ))}
        </nav>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Notas.Nzx
        </p>
      </div>
    </footer>
  )
}