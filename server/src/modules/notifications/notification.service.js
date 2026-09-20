import { db } from '../../config/database.js';
import { emitApplicationStatusUpdate } from '../../socket/socket.server.js';
import logger from '../../config/logger.js';

export class NotificationService {
  /**
   * Creates a notification in the database and broadcasts via Socket.IO
   */
  static async send(notificationData, clientOrTx = db) {
    try {
      const { userId, type = 'STATUS_UPDATE', title, message } = notificationData;

      const record = await clientOrTx.notification.create({
        data: {
          userId,
          type,
          title,
          message,
          read: false,
        },
      });

      // Real-time delivery
      emitApplicationStatusUpdate(userId, {
        notificationId: record.id,
        type,
        title,
        message,
        createdAt: record.createdAt,
      });

      return record;
    } catch (err) {
      logger.error({ err, notificationData }, 'Failed to send notification');
      return null;
    }
  }

  static async getUserNotifications(userId) {
    return await db.notification.findMany({
      where: { userId },
    });
  }

  static async markAsRead(notificationId, userId) {
    return await db.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });
  }
}

export default NotificationService;
