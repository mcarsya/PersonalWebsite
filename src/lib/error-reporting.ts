export function reportAppError(error: unknown, context: Record<string, unknown> = {}) {
  // A generic error reporting function for your own use.
  // You can connect this to Sentry, LogRocket, or any other telemetry service.
  console.error("App Error Caught:", error, context);
}
