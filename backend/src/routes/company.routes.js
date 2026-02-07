import express from 'express';
import {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} from '../controllers/company.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/').get(protect, getCompanies).post(protect, createCompany);
router
  .route('/:id')
  .get(protect, getCompany)
  .put(protect, updateCompany)
  .delete(protect, deleteCompany);

export default router;
