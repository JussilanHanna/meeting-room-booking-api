import Fastify from "fastify";
import { AppError } from "./errors.js";
import { InMemoryBookingRepository } from "./bookingRepository.js";
import { BookingService } from "./bookingService.js";
import { healthRoutes } from "./health.js";
import { bookingsRoutes } from "./bookings.js";

const errorResponseSchema = {
  type: "object",
  properties: {
    error: {
      type: "object",
      properties: {
        code: { type: "string" },
        message: { type: "string" },
        details: {}
      },
      required: ["code", "message"]
    }
  },
  required: ["error"]
} as const;

export function buildApp() {
  const app = Fastify({ logger: true });

  // Centralized error handler
  app.setErrorHandler((err, _req, reply) => {
    if (err instanceof AppError) {
      reply.status(err.statusCode).send({
        error: {
          code: err.code,
          message: err.message,
          details: err.details ?? null
        }
      });
      return;
    }

    // Fastify validation errors
    if (err?.validation) {
      reply.status(400).send({
        error: {
          code: "REQUEST_VALIDATION_ERROR",
          message: err.message ?? "Request validation failed",
          details: {
            validation: err.validation,
            validationContext: err.validationContext ?? null
          }
        }
      });
      return;
    }


    reply.status(500).send({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Unexpected error"
      }
    });
  });

  const repo = new InMemoryBookingRepository();
  const service = new BookingService(repo);

  app.register(healthRoutes);
  app.register(bookingsRoutes(service));

  return app;
}
