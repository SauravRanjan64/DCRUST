import ApplicationService from './application.service.js';
import ApiResponse from '../../utils/apiResponse.js';
import ERROR_CODES from '../../utils/errorCodes.js';

export class ApplicationController {
  static async applyToJob(req, res, next) {
    try {
      const jobId = req.params.jobId || req.body.jobId;
      if (!jobId) {
        return ApiResponse.error(res, 'Job ID is required to apply.', ERROR_CODES.VALIDATION_ERROR, 400);
      }

      const reqMeta = {
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.headers['user-agent'],
      };

      const result = await ApplicationService.applyToJob(req.user.id, jobId, req.body, reqMeta);

      if (!result.success) {
        return ApiResponse.error(
          res,
          result.message,
          result.code || ERROR_CODES.APPLICATION_NOT_ELIGIBLE,
          result.code === 'JOB_NOT_FOUND' ? 404 : 400,
          result.errors || []
        );
      }

      return ApiResponse.success(res, result.message, { application: result.application }, 201);
    } catch (err) {
      next(err);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const applicationId = req.params.id || req.params.applicationId;
      const { status, reason } = req.body;

      const reqMeta = {
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.headers['user-agent'],
      };

      const result = await ApplicationService.updateApplicationStatus(
        applicationId,
        status,
        req.user,
        reason,
        reqMeta
      );

      if (!result.success) {
        return ApiResponse.error(
          res,
          result.message,
          result.code || ERROR_CODES.INVALID_STATUS_TRANSITION,
          result.code === 'RESOURCE_NOT_FOUND' ? 404 : result.code === 'AUTH_FORBIDDEN' ? 403 : 400
        );
      }

      return ApiResponse.success(res, result.message, { application: result.application });
    } catch (err) {
      next(err);
    }
  }

  static async shortlist(req, res, next) {
    req.body = { ...req.body, status: 'SHORTLISTED' };
    return ApplicationController.updateStatus(req, res, next);
  }

  static async reject(req, res, next) {
    req.body = { ...req.body, status: 'REJECTED' };
    return ApplicationController.updateStatus(req, res, next);
  }

  static async getMyApplications(req, res, next) {
    try {
      const studentId = req.user.studentId;
      if (!studentId) {
        return ApiResponse.error(res, 'Student profile not found.', ERROR_CODES.RESOURCE_NOT_FOUND, 404);
      }
      const applications = await ApplicationService.getStudentApplications(studentId);
      return ApiResponse.success(res, 'Applications retrieved.', { applications });
    } catch (err) {
      next(err);
    }
  }

  static async getApplicationById(req, res, next) {
    try {
      const app = await ApplicationService.getApplicationById(req.params.id, req.user);
      if (!app) {
        return ApiResponse.error(res, 'Application not found.', ERROR_CODES.RESOURCE_NOT_FOUND, 404);
      }
      if (app.unauthorized) {
        return ApiResponse.error(
          res,
          'Forbidden: You do not have permission to view this application.',
          ERROR_CODES.AUTH_FORBIDDEN,
          403
        );
      }
      return ApiResponse.success(res, 'Application details retrieved.', { application: app });
    } catch (err) {
      next(err);
    }
  }
}

export default ApplicationController;
