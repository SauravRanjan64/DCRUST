import fs from 'fs';
import path from 'path';
import { db } from '../../config/database.js';
import { calculateSkillMatch } from '../resumeMatcher/resumeMatcher.service.js';
import AuditService from '../audit/audit.service.js';

export class ResumeService {
  static async getResumeByStudentId(studentId) {
    return await db.resume.findFirst({
      where: { studentId },
    });
  }

  static async saveUploadedResume(studentId, fileInfo, skills = [], reqMeta = {}) {
    // Check if student already has a resume; if so, delete old record
    const existing = await db.resume.findFirst({ where: { studentId } });
    if (existing) {
      await db.resume.delete({ where: { id: existing.id } });
    }

    const resume = await db.resume.create({
      data: {
        studentId,
        fileName: fileInfo.originalname || fileInfo.fileName || 'resume.pdf',
        storageKey: fileInfo.filename || fileInfo.storageKey || `resume-${Date.now()}.pdf`,
        mimeType: fileInfo.mimetype || 'application/pdf',
        fileSize: fileInfo.size || 1024,
        skills: skills.length > 0 ? skills : ['React', 'Node.js', 'Express', 'JavaScript', 'SQL', 'Git'],
      },
    });

    const student = await db.student.findUnique({ where: { id: studentId } });
    if (student) {
      await AuditService.record({
        userId: student.userId,
        action: 'RESUME_UPLOADED',
        entityType: 'Resume',
        entityId: resume.id,
        metadata: { fileName: resume.fileName, fileSize: resume.fileSize },
        ipAddress: reqMeta.ipAddress,
        userAgent: reqMeta.userAgent,
      });
    }

    return resume;
  }

  static async deleteResume(studentId, reqMeta = {}) {
    const existing = await db.resume.findFirst({ where: { studentId } });
    if (!existing) return null;

    await db.resume.delete({ where: { id: existing.id } });

    const student = await db.student.findUnique({ where: { id: studentId } });
    if (student) {
      await AuditService.record({
        userId: student.userId,
        action: 'RESUME_DELETED',
        entityType: 'Resume',
        entityId: existing.id,
        ipAddress: reqMeta.ipAddress,
        userAgent: reqMeta.userAgent,
      });
    }

    return existing;
  }

  static async matchResumeAgainstJob(studentId, jobId, customSkills = null) {
    const job = await db.jobDrive.findUnique({
      where: { id: jobId },
      include: { skills: true },
    });

    if (!job) {
      throw new Error('Job drive not found.');
    }

    let skillsToMatch = customSkills;
    if (!skillsToMatch || skillsToMatch.length === 0) {
      const resume = await db.resume.findFirst({ where: { studentId } });
      skillsToMatch = resume?.skills || [];
    }

    const matchResult = calculateSkillMatch(skillsToMatch, job.skills || []);

    return {
      jobId: job.id,
      jobTitle: job.title,
      ...matchResult,
    };
  }
}

export default ResumeService;
