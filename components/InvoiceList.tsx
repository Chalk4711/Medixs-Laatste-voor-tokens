'use client'

import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Eye, Edit, Plus } from 'lucide-react'
import { Invoice, Customer } from '@/lib/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface InvoiceListProps {
  invoices: Invoice[]
  customers: Customer[]
}

export default function InvoiceList({ invoices: initialInvoices, customers }: InvoiceListProps) {
  const [invoices, setInvoices] = useState(initialInvoices)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const getCustomerName = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId)
    return customer ? customer.name : 'Unknown'
  }

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setIsViewDialogOpen(true)
  }

  const handleEditInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setIsEditDialogOpen(true)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice Number</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.number}</TableCell>
              <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
              <TableCell>{getCustomerName(invoice.customerId)}</TableCell>
              <TableCell>
                ${invoice.items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2)}
              </TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" onClick={() => handleViewInvoice(invoice)}>
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleEditInvoice(invoice)}>
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
            <DialogTitle>View Invoice</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div>
              <p>Invoice Number: {selectedInvoice.number}</p>
              <p>Date: {new Date(selectedInvoice.date).toLocaleDateString()}</p>
              <p>Customer: {getCustomerName(selectedInvoice.customerId)}</p>
              <p>Status: {selectedInvoice.status}</p>
              <h3>Items:</h3>
              <ul>
                {selectedInvoice.items.map((item, index) => (
                  <li key={index}>
                    {item.description} - Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Invoice</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div>
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                value={selectedInvoice.status}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, status: e.target.value })}
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