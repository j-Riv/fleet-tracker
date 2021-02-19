import { MaintenanceEvent, RepairEvent } from './records';

export interface Vehicle {
  Images?: Image[];
  Maintenance?: MaintenanceEvent[];
  Repairs?: RepairEvent[];
  active: boolean;
  address?: string;
  archive: boolean;
  building?: string;
  city?: string;
  color: string;
  cost_new: string;
  createdAt: string;
  id: string;
  image: string;
  insurance_exp: string;
  key_number: string;
  license_plate: string;
  location: string;
  make: string;
  model: string;
  name: string;
  non_op: boolean;
  note: string;
  owner: string;
  pink_slip: null | string;
  registration_exp: string;
  type: string;
  updatedAt: string;
  use: string;
  vin: string;
  year: string;
  zip?: string;
}

export interface Image {
  createdAt: string;
  file_type: string;
  file_url: string;
  id: string;
  updatedAt: string;
  vehicle_id: string;
}
