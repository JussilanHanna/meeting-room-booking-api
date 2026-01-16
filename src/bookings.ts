import { FastifyPluginAsync } from "fastify";
import { BookingService } from "./bookingService.js";

export function bookingsRoutes(service: BookingService): FastifyPluginAsync {
  return async (app) => {
    app.get("/rooms/:roomId/bookings", {
      schema: {
        params: {
          type: "object",
          required: ["roomId"],
          properties: { roomId: { type: "string", minLength: 1 } }
        },
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              required: ["id", "roomId", "start", "end", "createdAt"],
              properties: {
                id: { type: "string" },
                roomId: { type: "string" },
                start: { type: "string", format: "date-time" },
                end: { type: "string", format: "date-time" },
                createdAt: { type: "string", format: "date-time" }
              }
            }
          }
        }
      }
    }, async (req) => {
      const { roomId } = req.params as { roomId: string };
      return service.list(roomId);
    });


    app.post("/rooms/:roomId/bookings", {
      schema: {
        params: {
          type: "object",
          required: ["roomId"],
          properties: { roomId: { type: "string", minLength: 1 } }
        },
        body: {
          type: "object",
          required: ["start", "end"],
          properties: {
            start: { type: "string", format: "date-time" },
            end: { type: "string", format: "date-time" }
          }
        }
      }
    }, async (req, reply) => {
      const { roomId } = req.params as { roomId: string };
      const { start, end } = req.body as { start: string; end: string };
      const booking = await service.create(roomId, start, end);
      reply.code(201);
      return booking;
    });

    app.delete("/rooms/:roomId/bookings/:bookingId", {
      schema: {
        params: {
          type: "object",
          required: ["roomId", "bookingId"],
          properties: {
            roomId: { type: "string", minLength: 1 },
            bookingId: { type: "string", minLength: 1 }
          }
        }
      }
    }, async (req, reply) => {
      const { roomId, bookingId } = req.params as { roomId: string; bookingId: string };
      await service.cancel(roomId, bookingId);
      reply.code(204);
      return;
    });
  };
}
