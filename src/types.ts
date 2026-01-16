export type ISODateTimeString = string;

export interface Booking {
  id: string;
  roomId: string;
  start: ISODateTimeString; // ISO 8601, treated as UTC
  end: ISODateTimeString;   // ISO 8601, treated as UTC
  createdAt: ISODateTimeString;
}
