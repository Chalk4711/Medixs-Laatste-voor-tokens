'use client'

import { useState } from 'react'
import Link from "next/link"
import {
  Bell,
  CircleUser,
  Home,
  Package,
  Package2,
  FileText,
  Search,
  ArrowLeft,
  Plus,
  Users,
  Eye,
  X,
  Calendar,
  Plane,
  Edit,
  Settings,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Import types and initial data
import { Vaccine, Customer, Invoice, Appointment, Trip, LogEntry, Theme } from '@/lib/types'
import { initialVaccines, initialCustomers, initialInvoices, initialAppointments, initialTrips, initialLogs } from '@/lib/initialData'

export default function Dashboard() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [vaccines, setVaccines] = useState<Vaccine[]>(initialVaccines)
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers)
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices)
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const [trips, setTrips] = useState<Trip[]>(initialTrips)
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs)
  const [isNewItemDialogOpen, setIsNewItemDialogOpen] = useState(false)
  const [isEditItemDialogOpen, setIsEditItemDialogOpen] = useState(false)
  const [isLogDetailDialogOpen, setIsLogDetailDialogOpen] = useState(false)
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null)
  const [newItem, setNewItem] = useState<any>({})
  const [editingItem, setEditingItem] = useState<any>(null)
  const [theme, setTheme] = useState<Theme>({
    primary: '#3b82f6',
    secondary: '#10b981',
    accent: '#f59e0b',
    background: '#ffffff',
  })

  const handleAddItem = () => {
    switch (currentView) {
      case 'vaccineList':
        const newVaccineId = `VAC${(vaccines.length + 1).toString().padStart(3, '0')}`
        setVaccines([...vaccines, { ...newItem, id: newVaccineId, batches: [] }])
        break
      case 'customers':
        const newCustomerId = `CUS${(customers.length + 1).toString().padStart(3, '0')}`
        setCustomers([...customers, { ...newItem, id: newCustomerId }])
        break
      case 'invoices':
        const newInvoiceId = `INV${(invoices.length + 1).toString().padStart(3, '0')}`
        setInvoices([...invoices, { ...newItem, id: newInvoiceId, items: [] }])
        break
      case 'appointments':
        const newAppointmentId = `APP${(appointments.length + 1).toString().padStart(3, '0')}`
        setAppointments([...appointments, { ...newItem, id: newAppointmentId }])
        break
      case 'trips':
        const newTripId = `TRP${(trips.length + 1).toString().padStart(3, '0')}`
        setTrips([...trips, { ...newItem, id: newTripId }])
        break
    }
    setIsNewItemDialogOpen(false)
    setNewItem({})
  }

  const handleEditItem = () => {
    switch (editingItem.type) {
      case 'vaccine':
        setVaccines(vaccines.map(v => v.id === editingItem.id ? editingItem : v))
        break
      case 'customer':
        setCustomers(customers.map(c => c.id === editingItem.id ? editingItem : c))
        break
      case 'invoice':
        setInvoices(invoices.map(i => i.id === editingItem.id ? editingItem : i))
        break
      case 'appointment':
        setAppointments(appointments.map(a => a.id === editingItem.id ? editingItem : a))
        break
      case 'trip':
        setTrips(trips.map(t => t.id === editingItem.id ? editingItem : t))
        break
    }
    setIsEditItemDialogOpen(false)
    setEditingItem(null)
  }

  const renderNewItemDialog = () => {
    switch (currentView) {
      case 'vaccineList':
        return (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                value={newItem.name || ''}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="supplier" className="text-right">Supplier</Label>
              <Input
                id="supplier"
                value={newItem.supplier || ''}
                onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="purchaseCost" className="text-right">Purchase Cost</Label>
              <Input
                id="purchaseCost"
                type="number"
                value={newItem.purchaseCost || ''}
                onChange={(e) => setNewItem({ ...newItem, purchaseCost: parseFloat(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sellingPrice" className="text-right">Selling Price</Label>
              <Input
                id="sellingPrice"
                type="number"
                value={newItem.sellingPrice || ''}
                onChange={(e) => setNewItem({ ...newItem, sellingPrice: parseFloat(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="details" className="text-right">Details</Label>
              <Textarea
                id="details"
                value={newItem.details || ''}
                onChange={(e) => setNewItem({ ...newItem, details: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
        )
      // Add cases for other views (customers, invoices, appointments, trips) here
      default:
        return null
    }
  }

  const renderEditDialog = () => {
    if (!editingItem) return null

    switch (editingItem.type) {
      case 'vaccine':
        return (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                value={editingItem.name}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="supplier" className="text-right">Supplier</Label>
              <Input
                id="supplier"
                value={editingItem.supplier}
                onChange={(e) => setEditingItem({ ...editingItem, supplier: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="purchaseCost" className="text-right">Purchase Cost</Label>
              <Input
                id="purchaseCost"
                type="number"
                value={editingItem.purchaseCost}
                onChange={(e) => setEditingItem({ ...editingItem, purchaseCost: parseFloat(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sellingPrice" className="text-right">Selling Price</Label>
              <Input
                id="sellingPrice"
                type="number"
                value={editingItem.sellingPrice}
                onChange={(e) => setEditingItem({ ...editingItem, sellingPrice: parseFloat(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="details" className="text-right">Details</Label>
              <Textarea
                id="details"
                value={editingItem.details}
                onChange={(e) => setEditingItem({ ...editingItem, details: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
        )
      // Add cases for other item types (customer, invoice, appointment, trip) here
      default:
        return null
    }
  }

  const renderView = () => {
    switch(currentView) {
      case 'dashboard':
        return (
          <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Vaccines</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{vaccines.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{invoices.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{customers.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{appointments.length}</div>
                </CardContent>
              </Card>
            </div>
            {/* Add more dashboard content here */}
          </div>
        )
      case 'vaccineList':
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <Button onClick={() => setCurrentView('dashboard')}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Button>
              <Button onClick={() => setIsNewItemDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Vaccine
              </Button>
            </div>
            <h1 className="text-2xl font-bold mb-4">Vaccine Inventory</h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Purchase Cost</TableHead>
                  <TableHead>Selling Price</TableHead>
                  <TableHead>Total Quantity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vaccines.map((vaccine) => (
                  <TableRow key={vaccine.id}>
                    <TableCell>{vaccine.name}</TableCell>
                    <TableCell>{vaccine.supplier}</TableCell>
                    <TableCell>€{vaccine.purchaseCost.toFixed(2)}</TableCell>
                    <TableCell>€{vaccine.sellingPrice.toFixed(2)}</TableCell>
                    <TableCell>{vaccine.batches.reduce((sum, batch) => sum + batch.quantity, 0)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => {
                        setSelectedItemId(vaccine.id)
                        setCurrentView('vaccineDetail')
                      }}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => {
                        setEditingItem({ ...vaccine, type: 'vaccine' })
                        setIsEditItemDialogOpen(true)
                      }}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )
      // Add cases for other views (invoices, customers, appointments, trips, settings) here
      default:
        return <div>Unknown view</div>
    }
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]" style={{ backgroundColor: theme.background }}>
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Medixs</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  currentView === 'dashboard'
                    ? 'bg-muted text-primary font-semibold border-l-4 border-primary'
                    : ''
                }`}
                onClick={() => setCurrentView('dashboard')}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  currentView === 'vaccineList' || currentView === 'vaccineDetail'
                    ? 'bg-muted text-primary font-semibold border-l-4 border-primary'
                    : ''
                }`}
                onClick={() => setCurrentView('vaccineList')}
              >
                <Package className="h-4 w-4" />
                Vaccines
              </Button>
              {/* Add buttons for other views (invoices, customers, appointments, trips, settings) here */}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
          <div className="w-full flex-1">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>
      <Dialog open={isNewItemDialogOpen} onOpenChange={setIsNewItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
          </DialogHeader>
          {renderNewItemDialog()}
          <DialogFooter>
            <Button onClick={handleAddItem}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isEditItemDialogOpen} onOpenChange={setIsEditItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          {renderEditDialog()}
          <DialogFooter>
            <Button onClick={handleEditItem}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isLogDetailDialogOpen} onOpenChange={setIsLogDetailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log Details</DialogTitle>
          </DialogHeader>
          {selectedLog && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Date:</Label>
                <div className="col-span-3">{new Date(selectedLog.date).toLocaleString()}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Action:</Label>
                <div className="col-span-3">{selectedLog.action}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Details:</Label>
                <div className="col-span-3">{selectedLog.details}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}