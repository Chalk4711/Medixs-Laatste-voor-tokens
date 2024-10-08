import React from 'react'
import InvoiceList from '@/components/InvoiceList'
import { getInvoices, getCustomers } from '@/lib/data'

export default async function InvoicesPage() {
  const invoices = await getInvoices()
  const customers = await getCustomers()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>
      <InvoiceList invoices={invoices} customers={customers} />
    </div>
  )
}