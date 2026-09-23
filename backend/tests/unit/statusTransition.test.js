import { validateStatusTransition, APPLICATION_STATUS } from '../../src/modules/applications/statusTransition.service.js';

describe('Application Status Transition State Machine Tests', () => {
  test('Allowed transition: APPLIED -> SHORTLISTED is valid for COMPANY', () => {
    const res = validateStatusTransition(APPLICATION_STATUS.APPLIED, APPLICATION_STATUS.SHORTLISTED, 'COMPANY');
    expect(res.valid).toBe(true);
  });

  test('Allowed transition: APPLIED -> REJECTED is valid for COMPANY', () => {
    const res = validateStatusTransition(APPLICATION_STATUS.APPLIED, APPLICATION_STATUS.REJECTED, 'COMPANY');
    expect(res.valid).toBe(true);
  });

  test('Allowed transition: SHORTLISTED -> SELECTED is valid for COMPANY', () => {
    const res = validateStatusTransition(APPLICATION_STATUS.SHORTLISTED, APPLICATION_STATUS.SELECTED, 'COMPANY');
    expect(res.valid).toBe(true);
  });

  test('Allowed transition: SHORTLISTED -> REJECTED is valid for COMPANY', () => {
    const res = validateStatusTransition(APPLICATION_STATUS.SHORTLISTED, APPLICATION_STATUS.REJECTED, 'COMPANY');
    expect(res.valid).toBe(true);
  });

  test('Allowed transition: APPLIED -> WITHDRAWN is valid for STUDENT', () => {
    const res = validateStatusTransition(APPLICATION_STATUS.APPLIED, APPLICATION_STATUS.WITHDRAWN, 'STUDENT');
    expect(res.valid).toBe(true);
  });

  test('Disallowed transition: REJECTED -> SELECTED is rejected', () => {
    const res = validateStatusTransition(APPLICATION_STATUS.REJECTED, APPLICATION_STATUS.SELECTED, 'COMPANY');
    expect(res.valid).toBe(false);
    expect(res.message).toContain('Cannot transition application status');
  });

  test('Disallowed transition: SELECTED -> APPLIED is rejected', () => {
    const res = validateStatusTransition(APPLICATION_STATUS.SELECTED, APPLICATION_STATUS.APPLIED, 'COMPANY');
    expect(res.valid).toBe(false);
  });

  test('Disallowed transition: Arbitrary status string is rejected', () => {
    const res = validateStatusTransition(APPLICATION_STATUS.APPLIED, 'INTERVIEWED', 'COMPANY');
    expect(res.valid).toBe(false);
    expect(res.message).toContain('Invalid application status');
  });
});
