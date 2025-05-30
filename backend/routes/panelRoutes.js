import express from 'express';
import {
  addSMSPanelist,
  getPanelists,
  getPanelistById,
  updatePanelist,
  deletePanelist,
  importPanelists,
  exportPanelists,
  optOutPanelist
} from '../controllers/panelistController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// All panel routes are protected
router.use(protect);

router.route('/')
  .post(authorize('manager', 'admin'), addSMSPanelist)
  .get(getPanelists);

router.route('/:id')
  .get(getPanelistById)
  .put(authorize('manager', 'admin'), updatePanelist)
  .delete(authorize('manager', 'admin'), deletePanelist);

router.route('/import')
  .post(authorize('admin'), importPanelists);

router.route('/export')
  .get(authorize('manager', 'admin'), exportPanelists);

router.route('/:id/opt-out')
  .post(optOutPanelist);

export default router;