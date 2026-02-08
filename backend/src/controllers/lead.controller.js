import Lead from '../models/Lead.js';
import Task from '../models/Task.js';

// ===============================
// GET ALL LEADS
// ===============================
export const getLeads = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = '', assignedTo = '' } =
      req.query;

    const query = { isDeleted: false };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) query.status = status;
    if (assignedTo) query.assignedTo = assignedTo;

    const totalLeads = await Lead.countDocuments(query);

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((page - 1) * limit);

    res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        totalLeads,
        totalPages: Math.ceil(totalLeads / limit),
        currentPage: Number(page),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// GET SINGLE LEAD
// ===============================
export const getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// CREATE LEAD
// ===============================
export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);

    res.status(201).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// UPDATE LEAD
// ===============================
export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// SOFT DELETE LEAD
// ===============================
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    lead.isDeleted = true;
    lead.deletedAt = new Date();
    await lead.save();

    res.status(200).json({ success: true, message: 'Lead deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// DASHBOARD STATS
// ===============================
export const getDashboardStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments({ isDeleted: false });
    const qualifiedLeads = await Lead.countDocuments({
      status: 'Qualified',
      isDeleted: false,
    });

    const completedTasks = await Task.countDocuments({
      status: 'Completed',
    });

    res.status(200).json({
      success: true,
      data: {
        totalLeads,
        qualifiedLeads,
        completedTasks,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
