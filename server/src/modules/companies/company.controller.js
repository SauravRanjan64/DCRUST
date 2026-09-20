import CompanyService from './company.service.js';
import ApplicationService from '../applications/application.service.js';
import ApiResponse from '../../utils/apiResponse.js';
import ERROR_CODES from '../../utils/errorCodes.js';

export class CompanyController {
  static async getProfile(req, res, next) {
    try {
      const company = await CompanyService.getProfileByUserId(req.user.id);
      if (!company) {
        return ApiResponse.error(res, 'Company profile not found.', ERROR_CODES.RESOURCE_NOT_FOUND, 404);
      }
      return ApiResponse.success(res, 'Company profile retrieved.', { company });
    } catch (err) {
      next(err);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const reqMeta = {
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.headers['user-agent'],
      };

      const updated = await CompanyService.updateProfile(req.user.id, req.body, reqMeta);
      return ApiResponse.success(res, 'Company profile updated.', { company: updated });
    } catch (err) {
      next(err);
    }
  }

  static async getStats(req, res, next) {
    try {
      const stats = await CompanyService.getCompanyStats(req.user.id);
      return ApiResponse.success(res, 'Company stats retrieved.', { stats });
    } catch (err) {
      next(err);
    }
  }

  static async getDrives(req, res, next) {
    try {
      const drives = await CompanyService.getCompanyDrives(req.user.id);
      return ApiResponse.success(res, 'Company drives retrieved.', { drives });
    } catch (err) {
      next(err);
    }
  }

  static async getApplicants(req, res, next) {
    try {
      const result = await ApplicationService.getCompanyApplicants(req.user.id, req.query);
      return ApiResponse.success(res, 'Applicants retrieved.', { applicants: result.applicants }, 200, result.pagination);
    } catch (err) {
      next(err);
    }
  }

  static async shortlistApplicant(req, res, next) {
    try {
      const reqMeta = {
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.headers['user-agent'],
      };
      const result = await ApplicationService.updateApplicationStatus(
        req.params.applicationId,
        'SHORTLISTED',
        req.user,
        '',
        reqMeta
      );
      if (!result.success) {
        return ApiResponse.error(res, result.message, result.code, result.code === 'AUTH_FORBIDDEN' ? 403 : 400);
      }
      return ApiResponse.success(res, result.message, { application: result.application });
    } catch (err) {
      next(err);
    }
  }

  static async rejectApplicant(req, res, next) {
    try {
      const reqMeta = {
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.headers['user-agent'],
      };
      const result = await ApplicationService.updateApplicationStatus(
        req.params.applicationId,
        'REJECTED',
        req.user,
        req.body.reason || '',
        reqMeta
      );
      if (!result.success) {
        return ApiResponse.error(res, result.message, result.code, result.code === 'AUTH_FORBIDDEN' ? 403 : 400);
      }
      return ApiResponse.success(res, result.message, { application: result.application });
    } catch (err) {
      next(err);
    }
  }
}

export default CompanyController;
