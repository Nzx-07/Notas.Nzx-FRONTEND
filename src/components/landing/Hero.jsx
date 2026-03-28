export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">

        <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
          Organiza tus ideas en un solo lugar
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-500 dark:text-gray-400">
          Sin complicaciones, sin distracciones.
          Solo tú y tus pensamientos.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="/registro"
            className="inline-flex w-full items-center justify-center rounded-lg bg-gray-900 dark:bg-white px-8 py-3 text-base font-medium text-white dark:text-gray-900 transition-colors hover:bg-gray-700 dark:hover:bg-gray-100 sm:w-auto">
            Crear cuenta gratis
          </a>
          <a href="#features"
            className="inline-flex w-full items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 px-8 py-3 text-base font-medium text-gray-900 dark:text-white transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 sm:w-auto">
            Ver características
          </a>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-4xl px-4 sm:mt-20">
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg">
          <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-2 text-sm text-gray-500">Mi nota</span>
          </div>
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Ideas para el proyecto</h2>
            <div className="mt-4 space-y-3">
              {["Investigar opciones de diseño", "Definir objetivos principales"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded border border-gray-300 dark:border-gray-600" />
                  <span className="text-gray-500 dark:text-gray-400">{item}</span>
                </div>
              ))}
              <div className="flex items-center gap-3">
                <div className="flex h-4 w-4 items-center justify-center rounded border border-gray-900 dark:border-white bg-gray-900 dark:bg-white">
                  <svg className="h-3 w-3 text-white dark:text-gray-900" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-gray-400 line-through">Crear estructura inicial</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}