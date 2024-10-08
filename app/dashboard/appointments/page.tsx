import AppointmentList from '@/components/AppointmentList'
import { getAppointments, getCustomers, getVaccines } from '@/lib/data'

export default async function AppointmentsPage() {
  const appointments = await getAppointments()
  const customers = await getCustomers()
  const vaccines = await getVaccines()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      <AppointmentList appointments={appointments} customers={customers} vaccines={vaccines} />
    </div>
  )
}