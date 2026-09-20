import ApiResponse from '../utils/apiResponse.js';
import ERROR_CODES from '../utils/errorCodes.js';

/**
 * Zod validation middleware generator
 * Validates body, query, and params
 * @param {import('zod').ZodSchema} schema 
 * @param {'body' | 'query' | 'params'} location 
 */
export function validate(schema, location = 'body') {
  return (req, res, next) => {
    try {
      const dataToValidate = req[location];
      const parsed = schema.safeParse(dataToValidate);

      if (!parsed.success) {
        const errors = parsed.error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message,
          rule: issue.code,
        }));

        return ApiResponse.error(
          res,
          'Validation failed. Please check your request parameters.',
          ERROR_CODES.VALIDATION_ERROR,
          400,
          errors
        );
      }

      // Replace with sanitized and transformed values
      req[location] = parsed.data;
      next();
    } catch (err) {
      next(err);
    }
  };
}

export default validate;
