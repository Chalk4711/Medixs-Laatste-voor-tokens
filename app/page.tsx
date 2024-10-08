import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Welcome to Medixs</h1>
        <p className="text-xl mb-8">Your comprehensive medical management solution</p>
        <Link href="/dashboard" passHref>
          <Button>Go to Dashboard</Button>
        </Link>
      </main>
      <Footer />
    </div>
  )
}