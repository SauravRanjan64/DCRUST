import { db } from '../../config/database.js';

export class AnalyticsService {
  /**
   * Computes placement metrics conforming to requirement #62
   */
  static async getPlacementAnalytics() {
    const students = await db.student.findMany();
    const companies = await db.company.findMany();
    const jobs = await db.jobDrive.findMany({ include: { company: true } });
    const applications = await db.application.findMany({
      include: {
        student: true,
        job: {
          include: {
            company: true,
          },
        },
      },
    });

    const totalStudents = students.length;
    const totalCompanies = companies.length;
    const activeDrives = jobs.filter(j => j.status === 'ACTIVE').length;
    const totalApplications = applications.length;

    let shortlistedCount = 0;
    let selectedCount = 0;
    let rejectedCount = 0;

    const branchMap = {};
    const companyMap = {};

    applications.forEach(app => {
      if (app.status === 'SHORTLISTED') shortlistedCount++;
      if (app.status === 'SELECTED') selectedCount++;
      if (app.status === 'REJECTED') rejectedCount++;

      // Branch distribution
      const branch = (app.student?.branch || 'OTHER').toUpperCase();
      branchMap[branch] = (branchMap[branch] || 0) + 1;

      // Company distribution
      const compName = app.job?.company?.companyName || 'Unknown';
      companyMap[compName] = (companyMap[compName] || 0) + 1;
    });

    // Count unique selected students
    const uniqueSelectedStudents = new Set(
      applications.filter(a => a.status === 'SELECTED').map(a => a.studentId)
    ).size;

    const placementPercentage =
      totalStudents > 0 ? Math.round((uniqueSelectedStudents / totalStudents) * 1000) / 10 : 0;

    const applicationsByBranch = Object.entries(branchMap).map(([branch, count]) => ({ branch, count }));
    const applicationsByCompany = Object.entries(companyMap).map(([company, count]) => ({ company, count }));

    return {
      totalStudents,
      totalCompanies,
      activeJobDrives: activeDrives,
      totalApplications,
      shortlistedCount,
      selectedCount,
      rejectedCount,
      uniqueSelectedStudents,
      placementPercentage,
      applicationsByBranch,
      applicationsByCompany,
    };
  }
}

export default AnalyticsService;
