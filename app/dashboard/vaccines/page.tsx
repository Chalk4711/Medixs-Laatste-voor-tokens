import VaccineList from '@/components/VaccineList'
import { getVaccines } from '@/lib/data'

export default async function VaccinesPage() {
  const vaccines = await getVaccines()

  return (
    <div className="p-6">
      <VaccineList vaccines={vaccines} />
    </div>
  )
}