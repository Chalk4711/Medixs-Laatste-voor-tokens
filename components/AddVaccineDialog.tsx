'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Vaccine } from '@/lib/types'

interface AddVaccineDialogProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (vaccine: Vaccine) => void
}

export default function AddVaccineDialog({ isOpen, onClose, onAdd }: AddVaccineDialogProps) {
  const [newVaccine, setNewVaccine] = useState<Partial<Vaccine>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(newVaccine as Vaccine)
    setNewVaccine({})
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Vaccine</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="purchaseCost" className="text-right">Purchase Cost</Label>
              <Input
                id="purchaseCost"
                type="number"
                value={newVaccine.purchaseCost || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, purchaseCost: parseFloat(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sellingPrice" className="text-right">Selling Price</Label>
              <Input
                id="sellingPrice"
                type="number"
                value={newVaccine.sellingPrice || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, sellingPrice: parseFloat(e.target.value) })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Vaccine</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}