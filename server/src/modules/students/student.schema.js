import { z } from 'zod';

export const updateStudentProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
  branch: z.string().min(2).optional(),
  batch: z.coerce.number().int().min(2020).max(2035).optional(),
  semester: z.coerce.number().int().min(1).max(8).optional(),
  cgpa: z.coerce.number().min(0).max(10).optional(),
  activeBacklogs: z.coerce.number().int().min(0).optional(),
  phone: z.string().min(10).optional(),
  graduationYear: z.coerce.number().int().min(2020).max(2035).optional(),
});

export default {
  updateStudentProfileSchema,
};
