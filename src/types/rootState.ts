export interface RootState {
  auth: AuthState;
}

export interface AuthState {
  email: string | null;
  authenticated: string | null;
  errorMessage: string | null;
  error: boolean;
  message: string | null;
  googleAuth: boolean;
  user: string | null;
  admin: boolean;
}

export interface EventsState {
  event: any;
  data: any;
  eventLink: string | null;
  addEventMsg: string | null;
  maintenanceRecords: any;
  repairRecords: any;
  record: any;
  recordsLoading: boolean;
  loading: boolean;
  eventError: boolean;
}

export interface UserState {
  dark: boolean;
  users: any[] | null;
}

export interface VehiclesState {
  allVehicles: any[] | null;
  currentVehicle: any | null;
  addVehicleMsg: string | null;
  loading: boolean;
  vehicleType: string;
}
