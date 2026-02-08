import Lead from '../models/Lead.js';
import Company from '../models/Company.js';
import Task from '../models/Task.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const totalCompanies = await Company.countDocuments();
    const totalTasks = await Task.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalLeads,
        totalCompanies,
        totalTasks,
      },
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard stats',
    });
  }
};
