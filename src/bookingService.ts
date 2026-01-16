import { randomUUID } from "crypto";
import { Booking } from "./types.js";
import { BookingRepository } from "./bookingRepository.js";
import { ConflictError, NotFoundError, ValidationError } from "./errors.js";
import { isOverlap, parseISOToMs } from "./date.js";

export class BookingService {
  constructor(private repo: BookingRepository) {}

  async list(roomId: string): Promise<Booking[]> {
    return this.repo.listByRoom(roomId);
  }

  async create(roomId: string, start: string, end: string): Promise<Booking> {
    const startMs = parseISOToMs(start);
    const endMs = parseISOToMs(end);

    if (startMs >= endMs) {
      throw new ValidationError("Start time must be before end time", { start, end });
    }

    const now = Date.now();
    if (startMs < now || endMs < now) {
      throw new ValidationError("Bookings cannot be in the past", { start, end, now: new Date(now).toISOString() });
    }

    const existing = await this.repo.listByRoom(roomId);
    for (const b of existing) {
      const bStart = parseISOToMs(b.start);
      const bEnd = parseISOToMs(b.end);
      if (isOverlap(startMs, endMs, bStart, bEnd)) {
        throw new ConflictError("Booking overlaps with an existing booking", { conflictingBookingId: b.id });
      }
    }

    const booking: Booking = {
      id: randomUUID(),
      roomId,
      start,
      end,
      createdAt: new Date().toISOString()
    };

    return this.repo.create(booking);
  }

  async cancel(roomId: string, bookingId: string): Promise<void> {
    const ok = await this.repo.delete(roomId, bookingId);
    if (!ok) throw new NotFoundError("Booking not found", { roomId, bookingId });
  }
}
