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

  # Response
  [{"id":"5736e86c-b1a0-4dc4-895d-4e9d11b98349","roomId":"A","start":"2030-01-01T10:00:00Z","end":"2030-01-01T11:00:00Z","createdAt":"2026-01-19T10:14:41.770Z"}]

### Create booking
curl -i -X POST "http://localhost:3000/rooms/A/bookings" -H "Content-Type: application/json" -d "{\"start\":\"2030-01-01T10:00:00Z\",\"end\":\"2030-01-01T11:00:00Z\"}"

  # Response
  {"id":"5736e86c-b1a0-4dc4-895d-4e9d11b98349","roomId":"A","start":"2030-01-01T10:00:00Z","end":"2030-01-01T11:00:00Z","createdAt":"2026-01-19T10:14:41.770Z"}

### Cancel booking
curl -X DELETE http://localhost:3000/rooms/A/bookings/<bookingId>

  # Response

### Overlapping reservation
  # Response
  {"error":{"code":"CONFLICT","message":"Booking overlaps with an existing booking","details":{"conflictingBookingId":"5736e86c-b1a0-4dc4-895d-4e9d11b98349"}}}
