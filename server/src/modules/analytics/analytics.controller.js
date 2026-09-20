import AnalyticsService from './analytics.service.js';
import ApiResponse from '../../utils/apiResponse.js';

export class AnalyticsController {
  static async getDashboard(req, res, next) {
    try {
      const analytics = await AnalyticsService.getPlacementAnalytics();
      return ApiResponse.success(res, 'Analytics dashboard data retrieved.', { analytics });
    } catch (err) {
      next(err);
    }
  }
}

export default AnalyticsController;
