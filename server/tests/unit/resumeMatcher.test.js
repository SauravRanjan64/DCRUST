import { calculateSkillMatch } from '../../src/modules/resumeMatcher/resumeMatcher.service.js';

describe('Resume Matcher Unit Tests', () => {
  const jobSkills = ['React', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'Git'];

  test('Calculates deterministic match percentage and extracts matched/missing skills', () => {
    const candidateSkills = ['React', 'Node.js', 'Express', 'Git'];
    const result = calculateSkillMatch(candidateSkills, jobSkills);

    // 4 / 6 * 100 = 66.7%
    expect(result.score).toBe(66.7);
    expect(result.matchedSkills).toEqual(['React', 'Node.js', 'Express', 'Git']);
    expect(result.missingSkills).toEqual(['PostgreSQL', 'Docker']);
  });

  test('Handles 100% skill match', () => {
    const candidateSkills = ['React', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'Git', 'AWS'];
    const result = calculateSkillMatch(candidateSkills, jobSkills);
    expect(result.score).toBe(100);
    expect(result.missingSkills).toHaveLength(0);
  });

  test('Handles 0% skill match', () => {
    const candidateSkills = ['C#', '.NET', 'Unity', 'Blender'];
    const result = calculateSkillMatch(candidateSkills, jobSkills);
    expect(result.score).toBe(0);
    expect(result.matchedSkills).toHaveLength(0);
    expect(result.missingSkills).toHaveLength(6);
  });

  test('Handles raw unformatted resume text input and strips stop words and punctuation', () => {
    const resumeText = `
      Passionate engineer with experience working on React web applications,
      building REST APIs using Node.js and Express, and version controlling projects with Git.
    `;
    const result = calculateSkillMatch(resumeText, jobSkills);
    expect(result.matchedSkills).toContain('React');
    expect(result.matchedSkills).toContain('Node.js');
    expect(result.matchedSkills).toContain('Express');
    expect(result.matchedSkills).toContain('Git');
    expect(result.missingSkills).toContain('PostgreSQL');
    expect(result.missingSkills).toContain('Docker');
    expect(result.score).toBe(66.7);
  });
});
