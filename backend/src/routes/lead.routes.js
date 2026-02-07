import express from 'express';
import {
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
  getDashboardStats,
} from '../controllers/lead.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/stats/dashboard', protect, getDashboardStats);
router.route('/').get(protect, getLeads).post(protect, createLead);
router
  .route('/:id')
  .get(protect, getLead)
  .put(protect, updateLead)
  .delete(protect, deleteLead);

export default router;
