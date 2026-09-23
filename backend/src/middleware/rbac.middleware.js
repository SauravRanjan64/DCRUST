import ApiResponse from '../utils/apiResponse.js';
import ERROR_CODES from '../utils/errorCodes.js';

/**
 * Role-Based Access Control Middleware
 * @param  {...string} roles Allowed roles (STUDENT, COMPANY, ADMIN)
 */
export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return ApiResponse.error(
        res,
        'Authentication required before role verification.',
        ERROR_CODES.AUTH_UNAUTHORIZED,
        401
      );
    }

    if (!roles.includes(req.user.role)) {
      return ApiResponse.error(
        res,
        `Forbidden: Role '${req.user.role}' is not authorized to access this resource.`,
        ERROR_CODES.AUTH_FORBIDDEN,
        403
      );
    }

    next();
  };
}

export default authorize;
