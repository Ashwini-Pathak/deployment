export class CustomResponse {
  constructor(message = '', meta = {}) {
    return {
      success: true,
      errors: null,
      response: {
        code: 202,
        message,
        meta,
      },
    };
  }
}
