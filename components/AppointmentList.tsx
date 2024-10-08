'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Eye, Edit, Plus } from 'lucide-react'
import { Appointment, Customer, Vaccine } from '@/lib/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface AppointmentListProps {
  appointments: Appointment[]
  customers: Customer[]
  vaccines: Vaccine[]
}

export default function AppointmentList({ appointments: initialAppointments, customers, vaccines }: AppointmentListProps) {
  const [appointments, setAppointments] = useState(initialAppointments)
  const [isNewAppointmentDialogOpen, setIsNewAppointmentDialogOpen] = useState(false)
  const [isViewAppointmentDialogOpen, setIsViewAppointmentDialogOpen] = useState(false)
  const [isEditAppointmentDialogOpen, setIsEditAppointmentDialogOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({})

  const getCustomerName = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId)
    return customer ? customer.name : 'Unknown'
  }

  const getVaccineName = (vaccineId: string) => {
    const vaccine = vaccines.find(v => v.id === vaccineId)
    return vaccine ? vaccine.name : 'Unknown'
  }

  const handleAddAppointment = () => {
    const newAppointmentId = `APP${appointments.length + 1}`
    const fullNewAppointment: Appointment = {
      ...newAppointment as Appointment,
      id: newAppointmentId,
    }
    setAppointments([...appointments, fullNewAppointment])
    setIsNewAppointmentDialogOpen(false)
    setNewAppointment({})
  }

  const handleEditAppointment = () => {
    if (selectedAppointment) {
      setAppointments(appointments.map(app => app.id === selectedAppointment.id ? selectedAppointment : app))
      setIsEditAppointmentDialogOpen(false)
      setSelectedAppointment(null)
    }
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setIsNewAppointmentDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Appointment
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Vaccine</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>{getCustomerName(appointment.customerId)}</TableCell>
              <TableCell>{getVaccineName(appointment.vaccineId)}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" onClick={() => {
                  setSelectedAppointment(appointment)
                  setIsViewAppointmentDialogOpen(true)
                }}>
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
                <Button variant="ghost" size="sm" onClick={() => {
                  setSelectedAppointment(appointment)
                  setIsEditAppointmentDialogOpen(true)
                }}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isNewAppointmentDialogOpen} onOpenChange={setIsNewAppointmentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Appointment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">Date</Label>
              <Input
                id="date"
                type="date"
                value={newAppointment.date || ''}
                onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">Time</Label>
              <Input
                id="time"
                type="time"
                value={newAppointment.time || ''}
                onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerId" className="text-right">Customer</Label>
              <select
                id="customerId"
                value={newAppointment.customerId || ''}
                onChange={(e) => setNewAppointment({ ...newAppointment, customerId: e.target.value })}
                className="col-span-3"
              >
                <option value="">Select a customer</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vaccineId" className="text-right">Vaccine</Label>
              <select
                id="vaccineId"
                value={newAppointment.vaccineId || ''}
                onChange={(e) => setNewAppointment({ ...newAppointment, vaccineId: e.target.value })}
                className="col-span-3"
              >
                <option value="">Select a vaccine</option>
                {vaccines.map(vaccine => (
                  <option key={vaccine.id} value={vaccine.id}>{vaccine.name}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddAppointment}>Add Appointment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewAppointmentDialogOpen} onOpenChange={setIsViewAppointmentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Appointment</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="grid gap-4 py-4">
              <div>Date: {new Date(selectedAppointment.date).toLocaleDateString()}</div>
              <div>Time: {selectedAppointment.time}</div>
              <div>Customer: {getCustomerName(selectedAppointment.customerId)}</div>
              <div>Vaccine: {getVaccineName(selectedAppointment.vaccineId)}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditAppointmentDialogOpen} onOpenChange={setIsEditAppointmentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editDate" className="text-right">Date</Label>
                <Input
                  id="editDate"
                  type="date"
                  value={selectedAppointment.date}
                  onChange={(e) => setSelectedAppointment({ ...selectedAppointment, date: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editTime" className="text-right">Time</Label>
                <Input
                  id="editTime"
                  type="time"
                  value={selectedAppointment.time}
                  onChange={(e) => setSelectedAppointment({ ...selectedAppointment, time: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editCustomerId" className="text-right">Customer</Label>
                <select
                  id="editCustomerId"
                  value={selectedAppointment.customerId}
                  onChange={(e) => setSelectedAppointment({ ...selectedAppointment, customerId: e.target.value })}
                  className="col-span-3"
                >
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editVaccineId" className="text-right">Vaccine</Label>
                <select
                  id="editVaccineId"
                  value={selectedAppointment.vaccineId}
                  onChange={(e) => setSelectedAppointment({ ...selectedAppointment, vaccineId: e.target.value })}
                  className="col-span-3"
                >
                  {vaccines.map(vaccine => (
                    <option key={vaccine.id} value={vaccine.id}>{vaccine.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleEditAppointment}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}