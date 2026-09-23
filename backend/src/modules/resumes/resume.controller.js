import ResumeService from './resume.service.js';
import ApiResponse from '../../utils/apiResponse.js';
import ERROR_CODES from '../../utils/errorCodes.js';

export class ResumeController {
  static async getResume(req, res, next) {
    try {
      const studentId = req.user.studentId;
      if (!studentId) {
        return ApiResponse.error(res, 'Student record not found.', ERROR_CODES.RESOURCE_NOT_FOUND, 404);
      }
      const resume = await ResumeService.getResumeByStudentId(studentId);
      return ApiResponse.success(res, 'Resume metadata retrieved.', { resume });
    } catch (err) {
      next(err);
    }
  }

  static async uploadResume(req, res, next) {
    try {
      const studentId = req.user.studentId;
      if (!studentId) {
        return ApiResponse.error(res, 'Student record not found.', ERROR_CODES.RESOURCE_NOT_FOUND, 404);
      }

      // If file was uploaded via multipart/form-data
      const fileInfo = req.file || {
        originalname: req.body.fileName || 'Resume.pdf',
        filename: `res-${Date.now()}.pdf`,
        mimetype: 'application/pdf',
        size: 1024 * 1024,
      };

      const skills = req.body.skills ? (Array.isArray(req.body.skills) ? req.body.skills : JSON.parse(req.body.skills)) : [];

      const reqMeta = {
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.headers['user-agent'],
      };

      const resume = await ResumeService.saveUploadedResume(studentId, fileInfo, skills, reqMeta);
      return ApiResponse.success(res, 'Resume uploaded successfully.', { resume }, 201);
    } catch (err) {
      next(err);
    }
  }

  static async deleteResume(req, res, next) {
    try {
      const studentId = req.user.studentId;
      if (!studentId) {
        return ApiResponse.error(res, 'Student record not found.', ERROR_CODES.RESOURCE_NOT_FOUND, 404);
      }

      const reqMeta = {
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.headers['user-agent'],
      };

      await ResumeService.deleteResume(studentId, reqMeta);
      return ApiResponse.success(res, 'Resume deleted successfully.', {});
    } catch (err) {
      next(err);
    }
  }

  static async matchResume(req, res, next) {
    try {
      const studentId = req.user.studentId;
      const { jobId, customSkills } = req.body;

      if (!jobId) {
        return ApiResponse.error(res, 'Job ID is required for resume matching.', ERROR_CODES.VALIDATION_ERROR, 400);
      }

      const match = await ResumeService.matchResumeAgainstJob(studentId, jobId, customSkills);
      return ApiResponse.success(res, 'Resume match calculated.', { match });
    } catch (err) {
      next(err);
    }
  }
}

export default ResumeController;
