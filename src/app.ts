import Fastify from "fastify";
import { AppError } from "./errors.js";
import { InMemoryBookingRepository } from "./bookingRepository.js";
import { BookingService } from "./bookingService.js";
import { healthRoutes } from "./health.js";
import { bookingsRoutes } from "./bookings.js";

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
    // @ts-expect-error fastify error typing varies
    if (err?.validation) {
      reply.status(400).send({
        error: {
          code: "REQUEST_VALIDATION_ERROR",
          message: "Request validation failed",
          details: err.validation
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
