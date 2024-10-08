import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Vaccine } from "@/lib/types"

interface EditVaccineDialogProps {
  isOpen: boolean
  onClose: () => void
  vaccine: Vaccine | null
  onEdit: (e: React.FormEvent<HTMLFormElement>) => void
  addBatch: () => void
  removeBatch: (batchId: string) => void
}

export function EditVaccineDialog({ isOpen, onClose, vaccine, onEdit, addBatch, removeBatch }: EditVaccineDialogProps) {
  if (!vaccine) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Vaccine</DialogTitle>
        </DialogHeader>
        <form onSubmit={onEdit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" defaultValue={vaccine.name} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="supplier" className="text-right">
                Supplier
              </Label>
              <Input id="supplier" name="supplier" defaultValue={vaccine.supplier} className="col-span-3" required />
            </div>
            <div className="col-span-4">
              <h3 className="text-lg font-semibold mb-2">Batches</h3>
              {vaccine.batches.map((batch, index) => (
                <div key={batch.id} className="grid grid-cols-4 gap-4 items-center mb-4">
                  <Input
                    name={`batchNumber-${index}`}
                    defaultValue={batch.batchNumber}
                    placeholder="Batch Number"
                    required
                  />
                  <Input
                    name={`quantity-${index}`}
                    type="number"
                    defaultValue={batch.quantity}
                    placeholder="Quantity"
                    required
                    min="0"
                  />
                  <Input
                    name={`expiryDate-${index}`}
                    type="date"
                    defaultValue={batch.expiryDate}
                    required
                  />
                  <Button type="button" variant="destructive" onClick={() => removeBatch(batch.id)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addBatch} className="mt-2">
                Add Batch
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}