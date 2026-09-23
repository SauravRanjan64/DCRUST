import { z } from 'zod';
import { APPLICATION_STATUS } from './statusTransition.service.js';

export const applyJobSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required').optional(), // can be in params or body
  resumeId: z.string().optional(),
});

export const updateApplicationStatusSchema = z.object({
  status: z.enum([
    APPLICATION_STATUS.SHORTLISTED,
    APPLICATION_STATUS.REJECTED,
    APPLICATION_STATUS.SELECTED,
    APPLICATION_STATUS.WITHDRAWN,
  ]),
  reason: z.string().optional(),
});

export const queryApplicationsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  jobId: z.string().optional(),
  status: z.enum([
    APPLICATION_STATUS.APPLIED,
    APPLICATION_STATUS.SHORTLISTED,
    APPLICATION_STATUS.REJECTED,
    APPLICATION_STATUS.SELECTED,
    APPLICATION_STATUS.WITHDRAWN,
  ]).optional(),
  branch: z.string().optional(),
  search: z.string().optional(),
});

export default {
  applyJobSchema,
  updateApplicationStatusSchema,
  queryApplicationsSchema,
};
