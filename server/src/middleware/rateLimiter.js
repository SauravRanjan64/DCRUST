import rateLimit from 'express-rate-limit';
import ApiResponse from '../utils/apiResponse.js';
import ERROR_CODES from '../utils/errorCodes.js';

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return ApiResponse.error(
      res,
      'Too many requests from this IP, please try again after 15 minutes.',
      ERROR_CODES.AUTH_FORBIDDEN,
      429
    );
  },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30, // 30 login attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return ApiResponse.error(
      res,
      'Too many authentication attempts. Please try again after 15 minutes.',
      ERROR_CODES.AUTH_FORBIDDEN,
      429
    );
  },
});

export default {
  globalLimiter,
  authLimiter,
};
