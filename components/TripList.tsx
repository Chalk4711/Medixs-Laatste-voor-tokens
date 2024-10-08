'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Eye, Edit, Plus } from 'lucide-react'
import { Trip, Customer } from '@/lib/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface TripListProps {
  trips: Trip[]
  customers: Customer[]
}

export default function TripList({ trips: initialTrips, customers }: TripListProps) {
  const [trips, setTrips] = useState(initialTrips)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)

  const getCustomerNames = (customerIds: string[]) => {
    return customerIds.map(id => {
      const customer = customers.find(c => c.id === id)
      return customer ? customer.name : 'Unknown'
    }).join(', ')
  }

  const handleViewTrip = (trip: Trip) => {
    setSelectedTrip(trip)
    setIsViewDialogOpen(true)
  }

  const handleEditTrip = (trip: Trip) => {
    setSelectedTrip(trip)
    setIsEditDialogOpen(true)
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Trip
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Countries</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Customers</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trips.map((trip) => (
            <TableRow key={trip.id}>
              <TableCell>{trip.countries.join(', ')}</TableCell>
              <TableCell>{new Date(trip.startDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(trip.endDate).toLocaleDateString()}</TableCell>
              <TableCell>{getCustomerNames(trip.customerIds)}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" onClick={() => handleViewTrip(trip)}>
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleEditTrip(trip)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Trip</DialogTitle>
          </DialogHeader>
          {selectedTrip && (
            <div>
              <p>Countries: {selectedTrip.countries.join(', ')}</p>
              <p>Start Date: {new Date(selectedTrip.startDate).toLocaleDateString()}</p>
              <p>End Date: {new Date(selectedTrip.endDate).toLocaleDateString()}</p>
              <p>Customers: {getCustomerNames(selectedTrip.customerIds)}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Trip</DialogTitle>
          </DialogHeader>
          {selectedTrip && (
            <div>
              <Label htmlFor="countries">Countries</Label>
              <Input
                id="countries"
                value={selectedTrip.countries.join(', ')}
                onChange={(e) => setSelectedTrip({ ...selectedTrip, countries: e.target.value.split(', ') })}
              />
              {/* Add more fields for editing */}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => {
              // Implement save logic here
              setIsEditDialogOpen(false)
            }}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}