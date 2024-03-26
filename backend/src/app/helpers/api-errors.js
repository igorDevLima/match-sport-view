export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export class BadRequestError extends ApiError {
  constructor(message) {
    super(message, 400);
  }
}

export class NotFoundError extends ApiError {
  constructor(message) {
    super(message, 404);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message) {
    super(message, 401);
  }
}

export class ConflictError extends ApiError {
  constructor(message) {
    super(message, 409);
  }
}

export class TooManyRequestsError extends ApiError {
  constructor(message) {
    super(message, 429);
  }
}
