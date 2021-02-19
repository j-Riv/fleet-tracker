interface EventRecord {
  active: boolean;
  archive: boolean;
  createdAt: string;
  description: string;
  end_date: string;
  event_url: string;
  id: string;
  location: string;
  start_date: string;
  type: string;
  updatedAt: string;
  vehicle_id: string;
}

export interface RepairEvent extends EventRecord {
  Maintenance_Files?: unknown[];
}
export interface MaintenanceEvent extends EventRecord {
  Repair_Files?: unknown[];
}

export interface Event {
  vehicle: string;
  type: string;
  location: string;
  description: string;
  attendees: string;
  start_date: string;
  end_date: string;
  vehicle_id: string;
  event_url?: string;
}

export interface Files {
  vehicle_id: string;
  file: File;
}

export interface Images {
  vehicle_id: string;
  photos: File;
}

export interface GoogleEvent {
  summary: string;
  location: string;
  description: string;
  htmlLink?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  recurrence: string[];
  attendees: string;
  reminders: {
    useDefault: false;
    overrides: [{ method: string; minutes: number }, { method: string; minutes: number }];
  };
}

// export interface GoogleCalendarData {
//   kind: string;
//   etag: string;
//   summary: string;
//   description: string;
//   updated: string;
//   timeZone: string;
//   accessRole: string;
//   defaultReminders: [
//     {
//       method: string;
//       minutes: number;
//     }
//   ];
//   items: [GoogleCalendarItem];
// }

// export interface GoogleCalendarItem {
//   kind: string;
//   etag: string;
//   id: string;
//   status: string;
//   htmlLink: string;
//   created: string;
//   updated: string;
//   summary: string;
//   description: string;
//   location: string;
//   creator: {
//     email: string;
//     displayName: string;
//   };
//   organizer: {
//     email: string;
//     displayName: string;
//     self: boolean;
//   };
//   start: {
//     dateTime: string;
//     timeZone: string;
//   };
//   end: {
//     dateTime: string;
//     timeZone: string;
//   };
//   recurringEventId: string;
//   originalStartTime: {
//     dateTime: string;
//     timeZone: string;
//   };
//   iCalUID: string;
//   sequence: number;
//   attendees: [
//     {
//       email: string;
//       responseStatus: string;
//     }
//   ];
//   reminders: {
//     useDefault: boolean;
//     overrrides: [
//       {
//         method: string;
//         minutes: number;
//       }
//     ];
//   };
//   eventType: string;
// }
