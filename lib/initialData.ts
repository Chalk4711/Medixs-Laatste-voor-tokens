import { Vaccine, Customer, Invoice, Appointment, Trip, LogEntry } from './types'

export const initialVaccines: Vaccine[] = [
  {
    id: 'VAC001',
    name: 'COVID-19 Vaccine',
    supplier: 'PharmaCorp',
    purchaseCost: 20,
    sellingPrice: 50,
    details: 'mRNA-based vaccine for COVID-19',
    batches: [
      { id: 'BAT001', batchNumber: 'COV001', expiryDate: '2023-12-31', quantity: 100, dateAdded: '2023-01-15' },
      { id: 'BAT002', batchNumber: 'COV002', expiryDate: '2024-06-30', quantity: 150, dateAdded: '2023-02-20' },
    ],
  },
  {
    id: 'VAC002',
    name: 'Flu Vaccine',
    supplier: 'BioTech Inc.',
    purchaseCost: 10,
    sellingPrice: 30,
    details: 'Quadrivalent influenza vaccine',
    batches: [
      { id: 'BAT003', batchNumber: 'FLU001', expiryDate: '2023-12-31', quantity: 200, dateAdded: '2023-03-10' },
    ],
  },
]

export const initialCustomers: Customer[] = [
  { id: 'CUS001', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St, City, Country', notes: 'Prefers morning appointments' },
  { id: 'CUS002', name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', address: '456 Elm St, Town, Country', notes: 'Allergic to penicillin' },
]

export const initialInvoices: Invoice[] = [
  {
    id: 'INV001',
    number: 'INV-001',
    date: '2023-06-01',
    customerId: 'CUS001',
    items: [
      { id: 'ITM001', vaccineId: 'VAC001', batchId: 'BAT001', description: 'COVID-19 Vaccine', quantity: 10, price: 50, tax: 21 },
    ],
    status: 'Paid',
  },
  {
    id: 'INV002',
    number: 'INV-002',
    date: '2023-06-15',
    customerId: 'CUS002',
    items: [
      { id: 'ITM002', vaccineId: 'VAC002', batchId: 'BAT003', description: 'Flu Vaccine', quantity: 20, price: 30, tax: 21 },
    ],
    status: 'Unpaid',
  },
]

export const initialAppointments: Appointment[] = [
  { id: 'APP001', customerId: 'CUS001', date: '2023-07-01', time: '09:00', vaccineId: 'VAC001' },
  { id: 'APP002', customerId: 'CUS002', date: '2023-07-02', time: '14:00', vaccineId: 'VAC002' },
]

export const initialTrips: Trip[] = [
  { id: 'TRP001', countries: ['USA', 'CAN'], startDate: '2023-08-01', endDate: '2023-08-15', customerIds: ['CUS001'] },
  { id: 'TRP002', countries: ['FRA', 'DEU'], startDate: '2023-09-01', endDate: '2023-09-10', customerIds: ['CUS002'] },
]

export const initialLogs: LogEntry[] = [
  { id: 'LOG001', date: '2023-06-01', action: 'Invoice Created', details: 'Invoice INV-001 created for John Doe' },
  { id: 'LOG002', date: '2023-06-15', action: 'Invoice Created', details: 'Invoice INV-002 created for Jane Smith' },
]