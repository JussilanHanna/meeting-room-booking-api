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
curl -i -X POST "http://localhost:3000/rooms/A/bookings" -H "Content-Type: application/json" -d "{\"start\":\"2030-01-01T10:00:00Z\",\"end\":\"2030-01-01T11:00:00Z\"}"

### Cancel booking
curl -X DELETE http://localhost:3000/rooms/A/bookings/<bookingId>
