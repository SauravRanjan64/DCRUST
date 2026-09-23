/**
 * Masks student phone numbers for privacy protection before shortlisting
 * E.g., "+91 9876543210" or "9876543210" -> "98******10"
 */
export function maskPhoneNumber(phone) {
  if (!phone || typeof phone !== 'string') return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.length <= 4) {
    return '******';
  }
  // Take first 2 digits and last 2 digits
  const prefix = digits.slice(-10, -8) || digits.slice(0, 2);
  const suffix = digits.slice(-2);
  return `${prefix}******${suffix}`;
}

/**
 * Sanitizes student records for recruiter or public listing
 * @param {Object} student - student data object
 * @param {boolean} isFullAccessGranted - true if student is SHORTLISTED/SELECTED and viewed by authorized recruiter/admin
 */
export function sanitizeStudentProfile(student, isFullAccessGranted = false) {
  if (!student) return null;
  const clone = { ...student };
  if (!isFullAccessGranted) {
    clone.phone = maskPhoneNumber(clone.phone);
    if (clone.user && clone.user.passwordHash) {
      delete clone.user.passwordHash;
    }
  } else {
    if (clone.user && clone.user.passwordHash) {
      delete clone.user.passwordHash;
    }
  }
  return clone;
}

export default {
  maskPhoneNumber,
  sanitizeStudentProfile,
};
