import { Header } from "../components/landing/Header"
import { Hero } from "../components/landing/Hero"
import { Features } from "../components/landing/Features"
import { Pricing } from "../components/landing/Pricing"
import { Footer } from "../components/landing/Footer"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}