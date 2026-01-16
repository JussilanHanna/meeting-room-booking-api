import { describe, it, expect } from "vitest";
import { InMemoryBookingRepository } from "../src/bookingRepository.js";
import { BookingService } from "../src/bookingService.js";

function futureIso(minutesFromNow: number) {
  return new Date(Date.now() + minutesFromNow * 60_000).toISOString();
}

describe("BookingService", () => {
  it("creates a booking", async () => {
    const repo = new InMemoryBookingRepository();
    const service = new BookingService(repo);

    const booking = await service.create("A", futureIso(10), futureIso(70));
    expect(booking.roomId).toBe("A");
  });

  it("rejects start >= end", async () => {
    const repo = new InMemoryBookingRepository();
    const service = new BookingService(repo);

    await expect(service.create("A", futureIso(10), futureIso(10))).rejects.toBeTruthy();
  });

  it("rejects bookings in the past", async () => {
    const repo = new InMemoryBookingRepository();
    const service = new BookingService(repo);

    const past = new Date(Date.now() - 60_000).toISOString();
    const future = futureIso(10);

    await expect(service.create("A", past, future)).rejects.toBeTruthy();
  });

  it("rejects overlapping bookings", async () => {
    const repo = new InMemoryBookingRepository();
    const service = new BookingService(repo);

    await service.create("A", futureIso(10), futureIso(70));
    await expect(service.create("A", futureIso(20), futureIso(40))).rejects.toBeTruthy();
  });

  it("allows back-to-back bookings", async () => {
    const repo = new InMemoryBookingRepository();
    const service = new BookingService(repo);

    const start = futureIso(10);
    const end = futureIso(70);

    await service.create("A", start, end);
    await expect(service.create("A", end, futureIso(120))).resolves.toBeTruthy();
  });
});
