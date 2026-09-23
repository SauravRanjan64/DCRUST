import { maskPhoneNumber, sanitizeStudentProfile } from '../../src/utils/privacy.util.js';

describe('Privacy and Contact Masking Unit Tests', () => {
  test('Masks 10-digit mobile phone numbers to 98******90 format', () => {
    const masked = maskPhoneNumber('9876543210');
    expect(masked).toBe('98******10');
  });

  test('Masks numbers with international dialing codes', () => {
    const masked = maskPhoneNumber('+91 9812345678');
    expect(masked).toBe('98******78');
  });

  test('Sanitizes student profile before recruiter shortlisting', () => {
    const rawStudent = {
      id: 'std-1',
      fullName: 'Rahul Sharma',
      phone: '+91 9876543210',
      cgpa: 8.5,
      user: {
        passwordHash: 'secret_bcrypt_hash',
      },
    };

    const sanitized = sanitizeStudentProfile(rawStudent, false);
    expect(sanitized.phone).toBe('98******10');
    expect(sanitized.user.passwordHash).toBeUndefined();
  });

  test('Exposes full contact info once authorized and student is shortlisted or selected', () => {
    const rawStudent = {
      id: 'std-1',
      fullName: 'Rahul Sharma',
      phone: '+91 9876543210',
      cgpa: 8.5,
      user: {
        passwordHash: 'secret_bcrypt_hash',
      },
    };

    const unmasked = sanitizeStudentProfile(rawStudent, true);
    expect(unmasked.phone).toBe('+91 9876543210');
    expect(unmasked.user.passwordHash).toBeUndefined();
  });
});
