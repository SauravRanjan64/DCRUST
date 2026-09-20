export class ApiResponse {
  static success(res, message = 'Success', data = {}, statusCode = 200, pagination = null) {
    const payload = {
      success: true,
      message,
      data,
    };
    if (pagination) {
      payload.pagination = pagination;
    }
    return res.status(statusCode).json(payload);
  }

  static error(res, message = 'An error occurred', code = 'INTERNAL_SERVER_ERROR', statusCode = 500, errors = []) {
    return res.status(statusCode).json({
      success: false,
      code,
      message,
      errors: Array.isArray(errors) ? errors : [errors],
    });
  }
}

export default ApiResponse;
