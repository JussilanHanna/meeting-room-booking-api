import { describe, it, expect } from "vitest";
import { InMemoryBookingRepository } from "../src/bookingRepository.js";
import { BookingService } from "../src/bookingService.js";

async function expectRejectCode(
  promise: Promise<unknown>,
  code: string,
  statusCode: number
) {
  await expect(promise).rejects.toMatchObject({
    code,
    statusCode
  });
}

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

  await expectRejectCode(
      service.create("A", futureIso(10), futureIso(10)),
      "VALIDATION_ERROR",
      400
    );
  });

  it("rejects bookings in the past", async () => {
    const repo = new InMemoryBookingRepository();
    const service = new BookingService(repo);

    const past = new Date(Date.now() - 60_000).toISOString();
    const future = futureIso(10);

   await expectRejectCode(
      service.create("A", past, future),
      "VALIDATION_ERROR",
      400
    );
  });

  it("rejects overlapping bookings", async () => {
    const repo = new InMemoryBookingRepository();
    const service = new BookingService(repo);

    await service.create("A", futureIso(10), futureIso(70));
    await expectRejectCode(
      service.create("A", futureIso(20), futureIso(40)),
      "CONFLICT",
      409
    );
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
