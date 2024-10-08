import TripList from '@/components/TripList'
import { getTrips, getCustomers } from '@/lib/data'

export default async function TripsPage() {
  const trips = await getTrips()
  const customers = await getCustomers()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Trips</h1>
      <TripList trips={trips} customers={customers} />
    </div>
  )
}