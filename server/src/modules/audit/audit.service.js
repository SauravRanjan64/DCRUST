import { db } from '../../config/database.js';
import logger from '../../config/logger.js';

export class AuditService {
  /**
   * Records an audit log entry
   */
  static async record(entry, clientOrTx = db) {
    try {
      const {
        userId = null,
        action,
        entityType,
        entityId = null,
        metadata = null,
        ipAddress = null,
        userAgent = null,
      } = entry;

      return await clientOrTx.auditLog.create({
        data: {
          userId,
          action,
          entityType,
          entityId,
          metadata,
          ipAddress,
          userAgent,
        },
      });
    } catch (err) {
      logger.error({ err, entry }, 'Failed to record audit log');
      // Do not crash the caller if audit logging encounters an issue
      return null;
    }
  }

  static async getLogs(filters = {}) {
    const { userId, action, take = 100 } = filters;
    return await db.auditLog.findMany({
      where: {
        ...(userId ? { userId } : {}),
        ...(action ? { action } : {}),
      },
      take,
    });
  }
}

export default AuditService;
