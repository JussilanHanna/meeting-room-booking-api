import { ValidationError } from "./errors.js";

export function parseISOToMs(iso: string): number {
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) {
    throw new ValidationError("Invalid ISO datetime format", { value: iso });
  }
  return ms;
}

export function isOverlap(aStart: number, aEnd: number, bStart: number, bEnd: number): boolean {
  // [start, end) half-open to allow back-to-back bookings
  return aStart < bEnd && bStart < aEnd;
}
