'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Eye, Edit, Plus, Trash2 } from 'lucide-react'
import { Vaccine } from '@/lib/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from "@/components/ui/use-toast"

export default function VaccineList({ vaccines: initialVaccines }: { vaccines: Vaccine[] }) {
  const [vaccines, setVaccines] = useState<Vaccine[]>(initialVaccines)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedVaccine, setSelectedVaccine] = useState<Vaccine | null>(null)
  const [newVaccine, setNewVaccine] = useState<Partial<Vaccine>>({})
  const { toast } = useToast()

  const handleAddVaccine = () => {
    const vaccineToAdd: Vaccine = {
      id: Math.max(...vaccines.map(v => v.id)) + 1,
      name: newVaccine.name || '',
      supplier: newVaccine.supplier || '',
      batches: []
    }
    setVaccines([...vaccines, vaccineToAdd])
    setIsAddDialogOpen(false)
    setNewVaccine({})
    toast({
      title: "Vaccine Added",
      description: `${vaccineToAdd.name} has been added to the inventory.`,
    })
  }

  const handleEditVaccine = () => {
    if (selectedVaccine) {
      setVaccines(vaccines.map(v => v.id === selectedVaccine.id ? selectedVaccine : v))
      setIsEditDialogOpen(false)
      setSelectedVaccine(null)
      toast({
        title: "Vaccine Updated",
        description: `${selectedVaccine.name} has been updated.`,
      })
    }
  }

  const handleDeleteVaccine = (id: number) => {
    setVaccines(vaccines.filter(v => v.id !== id))
    toast({
      title: "Vaccine Deleted",
      description: "The vaccine has been removed from the inventory.",
    })
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Vaccine Inventory</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Vaccine
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Total Quantity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vaccines.map((vaccine) => (
            <TableRow key={vaccine.id}>
              <TableCell>{vaccine.name}</TableCell>
              <TableCell>{vaccine.supplier}</TableCell>
              <TableCell>{vaccine.batches.reduce((sum, batch) => sum + batch.quantity, 0)}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" onClick={() => {
                  setSelectedVaccine(vaccine)
                  setIsEditDialogOpen(true)
                }}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteVaccine(vaccine.id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Vaccine</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                value={newVaccine.name || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="supplier" className="text-right">Supplier</Label>
              <Input
                id="supplier"
                value={newVaccine.supplier || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, supplier: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddVaccine}>Add Vaccine</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Vaccine</DialogTitle>
          </DialogHeader>
          {selectedVaccine && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Name</Label>
                <Input
                  id="edit-name"
                  value={selectedVaccine.name}
                  onChange={(e) => setSelectedVaccine({ ...selectedVaccine, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-supplier" className="text-right">Supplier</Label>
                <Input
                  id="edit-supplier"
                  value={selectedVaccine.supplier}
                  onChange={(e) => setSelectedVaccine({ ...selectedVaccine, supplier: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleEditVaccine}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}