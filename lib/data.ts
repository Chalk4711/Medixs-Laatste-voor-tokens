import { Vaccine, Customer, Invoice, Appointment, Trip, LogEntry } from './types';
import { initialVaccines, initialCustomers, initialInvoices, initialAppointments, initialTrips, initialLogs } from './initialData';

export const getVaccines = async (): Promise<Vaccine[]> => {
  return Promise.resolve(initialVaccines);
};

export const getInvoices = async (): Promise<Invoice[]> => {
  return Promise.resolve(initialInvoices);
};

export const getCustomers = async (): Promise<Customer[]> => {
  return Promise.resolve(initialCustomers);
};

export const getAppointments = async (): Promise<Appointment[]> => {
  return Promise.resolve(initialAppointments);
};

export const getTrips = async (): Promise<Trip[]> => {
  return Promise.resolve(initialTrips);
};

export const getLogs = async (): Promise<LogEntry[]> => {
  return Promise.resolve(initialLogs);
};