const plans = [
  {
    name: "Gratis",
    price: "$0",
    description: "Perfecto para empezar a organizar tus ideas.",
    features: ["Hasta 50 notas", "Sincronización básica", "Acceso desde 2 dispositivos", "Búsqueda de notas"],
    cta: "Comenzar gratis",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$5",
    period: "/mes",
    description: "Para quienes necesitan más espacio y funciones.",
    features: ["Notas ilimitadas", "Sincronización instantánea", "Dispositivos ilimitados", "Carpetas y etiquetas", "Temas premium incluidos", "Soporte prioritario"],
    cta: "Probar 14 días gratis",
    highlighted: true,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Precios simples y transparentes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
            Empieza gratis y mejora cuando lo necesites. Sin sorpresas.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:mt-16 lg:grid-cols-2">
          {plans.map((plan) => (
            <div key={plan.name}
              className={`relative rounded-xl border p-6 sm:p-8 bg-white dark:bg-gray-900 ${plan.highlighted ? "border-gray-900 dark:border-white shadow-lg" : "border-gray-200 dark:border-gray-700"}`}>
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-gray-900 dark:bg-white px-3 py-1 text-xs font-medium text-white dark:text-gray-900">
                    Más popular
                  </span>
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                {plan.period && <span className="text-gray-500 dark:text-gray-400">{plan.period}</span>}
              </div>
              <p className="mt-2 text-gray-500 dark:text-gray-400">{plan.description}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span className="text-gray-500 dark:text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="/registro"
                className={`mt-8 block w-full rounded-lg py-3 text-center text-sm font-medium transition-colors ${plan.highlighted ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700" : "border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}