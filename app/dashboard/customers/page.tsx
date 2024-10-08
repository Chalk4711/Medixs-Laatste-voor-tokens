import CustomerList from '@/components/CustomerList'
import { getCustomers } from '@/lib/data'

export default async function CustomersPage() {
  const customers = await getCustomers()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <CustomerList customers={customers} />
    </div>
  )
}