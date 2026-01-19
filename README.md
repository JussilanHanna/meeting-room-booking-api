# Meeting Room Booking API (Fastify + TypeScript)

## Requirements
- Node.js 20+

## Install
npm install

## Run (dev)
npm run dev

## Run tests
npm test

## Endpoints

### Health
curl http://localhost:3000/health

### List bookings
curl http://localhost:3000/rooms/A/bookings

List bookings – response (200)
[
  {
    "id": "f047261f-f29a-4db6-99f3-6a38012b61c4",
    "roomId": "A",
    "start": "2027-01-01T10:00:00Z",
    "end": "2027-01-01T11:00:00Z",
    "createdAt": "2026-01-19T10:37:12.911Z"
  },
  {
    "id": "65b5129e-7843-4737-86d3-41e0ff18750e",
    "roomId": "A",
    "start": "2028-01-01T10:00:00Z",
    "end": "2028-01-01T11:00:00Z",
    "createdAt": "2026-01-19T10:37:37.386Z"
  }
]

### Create booking
curl -i -X POST "http://localhost:3000/rooms/A/bookings" -H "Content-Type: application/json" -d "{\"start\":\"2030-01-01T10:00:00Z\",\"end\":\"2030-01-01T11:00:00Z\"}"

Create booking – response (201)
{
  "id": "605e2a2a-a65b-41c1-bac2-b376ea0bb24d",
  "roomId": "A",
  "start": "2030-01-01T10:00:00Z",
  "end": "2030-01-01T11:00:00Z",
  "createdAt": "2030-01-01T09:55:12.123Z"
}

### Cancel booking
curl -X DELETE http://localhost:3000/rooms/A/bookings/<bookingId>
curl -X DELETE http://localhost:3000/rooms/A/bookings/5736e86c-b1a0-4dc4-895d-4e9d11b98349

### Overlapping reservation
Overlapping booking (409)
{
  "error": {
    "code": "CONFLICT",
    "message": "Booking overlaps with an existing booking",
    "details": {
      "conflictingBookingId": "..."
    }
  }
}

### Validation error (400)
{
  "error": {
    "code": "REQUEST_VALIDATION_ERROR",
    "message": "...",
    "details": { }
  }
}
