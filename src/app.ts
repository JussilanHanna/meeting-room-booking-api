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

    // Fastify validation errors (shape differs from AppError)
    const anyErr = err as any;
    if (anyErr?.validation) {
      reply.status(400).send({
        error: {
          code: "REQUEST_VALIDATION_ERROR",
          message: err.message ?? "Request validation failed",
          details: {
            validation: anyErr.validation,
            validationContext: anyErr.validationContext ?? null
          }
        }
      });
      return;
    }

    reply.status(500).send({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Unexpected error",
        details: null
      }
    });
  });

  const repo = new InMemoryBookingRepository();
  const service = new BookingService(repo);

  app.register(healthRoutes);
  app.register(bookingsRoutes(service));

  return app;
}
