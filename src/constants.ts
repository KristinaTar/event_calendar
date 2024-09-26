export enum AppointmentStatusCode {
  Pending = 'P',
  CheckedIn = 'CI',
}

export const EVENT_STATUS_COLORS: Record<AppointmentStatusCode, string> = {
  [AppointmentStatusCode.Pending]: '#bee2fa',
  [AppointmentStatusCode.CheckedIn]: '#c7edca',
};

