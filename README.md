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

### Create booking
curl -X POST http://localhost:3000/rooms/A/bookings \
  -H "content-type: application/json" \
  -d '{"start":"2026-01-16T10:00:00.000Z","end":"2026-01-16T11:00:00.000Z"}'

### Cancel booking
curl -X DELETE http://localhost:3000/rooms/A/bookings/<bookingId>
