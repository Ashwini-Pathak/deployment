import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(message = 'ForbiddenException', errors = {}) {
    const _errors = [
      {
        code: HttpStatus.FORBIDDEN,
        message,
        data: errors,
      },
    ];

    super(_errors, HttpStatus.FORBIDDEN);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message = 'InternalServerErrorException', errors = {}) {
    const _errors = [
      {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message,
        data: errors,
      },
    ];

    super(_errors, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class ConflictException extends HttpException {
  constructor(message = 'ConflictException', errors = {}) {
    const _errors = [
      {
        code: HttpStatus.CONFLICT,
        message,
        data: errors,
      },
    ];

    super(_errors, HttpStatus.CONFLICT);
  }
}

export class BadRequestException extends HttpException {
  constructor(message = 'BadRequestException', errors = {}) {
    const _errors = [
      {
        code: HttpStatus.BAD_REQUEST,
        message,
        data: errors,
      },
    ];

    super(_errors, HttpStatus.BAD_REQUEST);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = 'UnauthorizedException', errors = {}) {
    const _errors = [
      {
        code: HttpStatus.UNAUTHORIZED,
        message,
        data: errors,
      },
    ];

    super(_errors, HttpStatus.UNAUTHORIZED);
  }
}

export class NotFoundException extends HttpException {
  constructor(message = 'NotFoundException', errors = {}) {
    const _errors = [
      {
        code: HttpStatus.NOT_FOUND,
        message,
        data: errors,
      },
    ];

    super(_errors, HttpStatus.NOT_FOUND);
  }
}

export class InsuffucientBalanceException extends HttpException {
  constructor(message = 'InsuffucientBalanceException', errors = {}) {
    const _errors = [
      {
        code: HttpStatus.PAYMENT_REQUIRED,
        message,
        data: errors,
      },
    ];

    super(_errors, HttpStatus.PAYMENT_REQUIRED);
  }
}

export class ContactExistsException extends HttpException {
  constructor(message = 'ContactExistsException', errors = {}) {
    const _errors = [
      {
        code: HttpStatus.CONFLICT,
        message,
        data: errors,
      },
    ];

    super(_errors, HttpStatus.CONFLICT);
  }
}

export class ResourceNotFound extends HttpException {
  constructor(message = 'ResourceNotFound: Precondition failed', errors = {}) {
    const _errors = [
      {
        code: HttpStatus.PRECONDITION_FAILED,
        message,
        data: errors,
      },
    ];

    super(_errors, HttpStatus.PRECONDITION_FAILED);
  }
}
