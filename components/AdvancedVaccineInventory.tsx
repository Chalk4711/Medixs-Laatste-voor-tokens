'use client'

import React, { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Vaccine } from "@/lib/types"
import { useVaccines } from "@/hooks/useVaccines"

export default function AdvancedVaccineInventory() {
  const { vaccines, isLoading, error } = useVaccines()
  const [filters, setFilters] = useState({
    search: "",
    supplier: "all",
  })

  const suppliers = useMemo(() => {
    const uniqueSuppliers = Array.from(new Set(vaccines.map(vaccine => vaccine.supplier)))
    return ["all", ...uniqueSuppliers.filter(supplier => supplier && supplier.trim() !== '')]
  }, [vaccines])

  const filteredVaccines = useMemo(() => {
    return vaccines.filter(vaccine => {
      const matchesSearch = vaccine.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                            vaccine.supplier.toLowerCase().includes(filters.search.toLowerCase())
      const matchesSupplier = filters.supplier === "all" || vaccine.supplier === filters.supplier
      return matchesSearch && matchesSupplier
    })
  }, [vaccines, filters])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Advanced Vaccine Inventory</h1>

      <div className="mb-6">
        <Input
          placeholder="Search vaccines..."
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          className="mb-2"
        />
        <Select
          value={filters.supplier}
          onValueChange={(value) => setFilters(prev => ({ ...prev, supplier: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select supplier" />
          </SelectTrigger>
          <SelectContent>
            {suppliers.map((supplier) => (
              <SelectItem key={supplier} value={supplier}>
                {supplier === "all" ? "All Suppliers" : supplier}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Purchase Cost</TableHead>
            <TableHead>Selling Price</TableHead>
            <TableHead>Total Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredVaccines.map((vaccine) => (
            <TableRow key={vaccine.id}>
              <TableCell>{vaccine.name}</TableCell>
              <TableCell>{vaccine.supplier}</TableCell>
              <TableCell>€{vaccine.purchaseCost.toFixed(2)}</TableCell>
              <TableCell>€{vaccine.sellingPrice.toFixed(2)}</TableCell>
              <TableCell>{vaccine.batches.reduce((sum, batch) => sum + batch.quantity, 0)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}