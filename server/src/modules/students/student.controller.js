import StudentService from './student.service.js';
import ApiResponse from '../../utils/apiResponse.js';
import ERROR_CODES from '../../utils/errorCodes.js';

export class StudentController {
  static async getProfile(req, res, next) {
    try {
      const student = await StudentService.getProfileByUserId(req.user.id);
      if (!student) {
        return ApiResponse.error(res, 'Student profile not found.', ERROR_CODES.RESOURCE_NOT_FOUND, 404);
      }
      return ApiResponse.success(res, 'Student profile retrieved.', { student });
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

      const updated = await StudentService.updateProfile(req.user.id, req.body, reqMeta);
      return ApiResponse.success(res, 'Profile updated successfully.', { student: updated });
    } catch (err) {
      next(err);
    }
  }

  static async getStats(req, res, next) {
    try {
      const studentId = req.user.studentId;
      if (!studentId) {
        return ApiResponse.error(res, 'Student record not found.', ERROR_CODES.RESOURCE_NOT_FOUND, 404);
      }
      const stats = await StudentService.getStudentStats(studentId);
      return ApiResponse.success(res, 'Student statistics retrieved.', { stats });
    } catch (err) {
      next(err);
    }
  }
}

export default StudentController;
