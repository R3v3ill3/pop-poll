import express from 'express';
import {
  createSurvey,
  getSurveys,
  getSurveyById,
  updateSurvey,
  deleteSurvey,
  deploySurvey,
  pauseSurvey,
  resumeSurvey,
  completeSurvey,
  generateAIQuestions
} from '../controllers/surveyController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// All survey routes are protected
router.use(protect);

router.route('/')
  .post(createSurvey)
  .get(getSurveys);

router.route('/:id')
  .get(getSurveyById)
  .put(updateSurvey)
  .delete(deleteSurvey);

router.route('/:id/deploy')
  .post(authorize('manager', 'admin'), deploySurvey);

router.route('/:id/pause')
  .post(authorize('manager', 'admin'), pauseSurvey);

router.route('/:id/resume')
  .post(authorize('manager', 'admin'), resumeSurvey);

router.route('/:id/complete')
  .post(authorize('manager', 'admin'), completeSurvey);

router.route('/ai/generate-questions')
  .post(generateAIQuestions);

export default router;