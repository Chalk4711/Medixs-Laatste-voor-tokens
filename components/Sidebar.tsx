'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MountainIcon, Package2, Bell, Home, Package, FileText, Users, Calendar, Plane, Settings, Syringe } from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
      ? 'bg-muted text-primary font-semibold'
      : ''
  }

  return (
    <div className="w-64 h-full bg-gray-100 border-r">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <MountainIcon className="h-6 w-6" />
          <span>Medixs</span>
        </Link>
      </div>
      <nav className="p-4">
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 mb-2 ${isActive('/dashboard')}`}
          asChild
        >
          <Link href="/dashboard">
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 mb-2 ${isActive('/dashboard/vaccines')}`}
          asChild
        >
          <Link href="/dashboard/vaccines">
            <Package className="h-4 w-4" />
            Vaccines
          </Link>
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 mb-2 ${isActive('/dashboard/customers')}`}
          asChild
        >
          <Link href="/dashboard/customers">
            <Users className="h-4 w-4" />
            Customers
          </Link>
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 mb-2 ${isActive('/dashboard/invoices')}`}
          asChild
        >
          <Link href="/dashboard/invoices">
            <FileText className="h-4 w-4" />
            Invoices
          </Link>
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 mb-2 ${isActive('/dashboard/appointments')}`}
          asChild
        >
          <Link href="/dashboard/appointments">
            <Calendar className="h-4 w-4" />
            Appointments
          </Link>
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 mb-2 ${isActive('/dashboard/trips')}`}
          asChild
        >
          <Link href="/dashboard/trips">
            <Plane className="h-4 w-4" />
            Trips
          </Link>
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 mb-2 ${isActive('/dashboard/settings')}`}
          asChild
        >
          <Link href="/dashboard/settings">
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </Button>
      </nav>
    </div>
  )
}