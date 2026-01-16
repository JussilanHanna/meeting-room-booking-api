import { Booking } from "./types";

export interface BookingRepository {
  listByRoom(roomId: string): Promise<Booking[]>;
  getById(roomId: string, bookingId: string): Promise<Booking | null>;
  create(booking: Booking): Promise<Booking>;
  delete(roomId: string, bookingId: string): Promise<boolean>;
}

export class InMemoryBookingRepository implements BookingRepository {
  private bookingsByRoom = new Map<string, Booking[]>();

  async listByRoom(roomId: string): Promise<Booking[]> {
    return (this.bookingsByRoom.get(roomId) ?? []).slice().sort((a, b) => a.start.localeCompare(b.start));
  }

  async getById(roomId: string, bookingId: string): Promise<Booking | null> {
    const list = this.bookingsByRoom.get(roomId) ?? [];
    return list.find(b => b.id === bookingId) ?? null;
  }

  async create(booking: Booking): Promise<Booking> {
    const list = this.bookingsByRoom.get(booking.roomId) ?? [];
    list.push(booking);
    this.bookingsByRoom.set(booking.roomId, list);
    return booking;
  }

  async delete(roomId: string, bookingId: string): Promise<boolean> {
    const list = this.bookingsByRoom.get(roomId) ?? [];
    const next = list.filter(b => b.id !== bookingId);
    this.bookingsByRoom.set(roomId, next);
    return next.length !== list.length;
  }
}
