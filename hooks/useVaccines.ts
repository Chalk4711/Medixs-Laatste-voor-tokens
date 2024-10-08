"use client"

import { useState, useEffect } from 'react'
import { Vaccine } from '@/lib/types'
import { getVaccines } from '@/lib/data'

export function useVaccines() {
  const [vaccines, setVaccines] = useState<Vaccine[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const fetchedVaccines = await getVaccines()
        setVaccines(fetchedVaccines)
        setIsLoading(false)
      } catch (err) {
        setError('Failed to fetch vaccines')
        setIsLoading(false)
      }
    }

    fetchVaccines()
  }, [])

  return { vaccines, isLoading, error }
}