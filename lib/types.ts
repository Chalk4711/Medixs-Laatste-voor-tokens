export interface Batch {
  id: string;
  batchNumber: string;
  quantity: number;
  expiryDate: string;
  dateAdded: string;
}

export interface Vaccine {
  id: string;
  name: string;
  supplier: string;
  purchaseCost: number;
  sellingPrice: number;
  details: string;
  batches: Batch[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}

export interface InvoiceItem {
  id: string;
  vaccineId: string;
  batchId: string;
  description: string;
  quantity: number;
  price: number;
  tax: number;
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  customerId: string;
  items: InvoiceItem[];
  status: string;
}

export interface Appointment {
  id: string;
  customerId: string;
  date: string;
  time: string;
  vaccineId: string;
}

export interface Trip {
  id: string;
  countries: string[];
  startDate: string;
  endDate: string;
  customerIds: string[];
}

export interface LogEntry {
  id: string;
  date: string;
  action: string;
  details: string;
}

export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}