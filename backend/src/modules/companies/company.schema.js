import { z } from 'zod';

export const updateCompanyProfileSchema = z.object({
  companyName: z.string().min(2).optional(),
  companyEmail: z.string().email().optional(),
  industry: z.string().min(2).optional(),
  website: z.string().url().or(z.string()).optional(),
  description: z.string().optional(),
});

export default {
  updateCompanyProfileSchema,
};
