import asyncHandler from 'express-async-handler';
import Survey from '../models/surveyModel.js';

// @desc    Create a new survey
// @route   POST /api/surveys
// @access  Private
export const createSurvey = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    questions,
    targetAudience,
    quotas,
    distribution,
    targetResponses,
  } = req.body;

  const survey = await Survey.create({
    title,
    description,
    questions,
    targetAudience,
    quotas,
    distribution,
    targetResponses,
    creator: req.user._id,
  });

  if (survey) {
    res.status(201).json(survey);
  } else {
    res.status(400);
    throw new Error('Invalid survey data');
  }
});

// @desc    Get all surveys
// @route   GET /api/surveys
// @access  Private
export const getSurveys = asyncHandler(async (req, res) => {
  const surveys = await Survey.find({})
    .populate('creator', 'name email')
    .sort({ createdAt: -1 });
  
  res.json(surveys);
});

// @desc    Get survey by ID
// @route   GET /api/surveys/:id
// @access  Private
export const getSurveyById = asyncHandler(async (req, res) => {
  const survey = await Survey.findById(req.params.id)
    .populate('creator', 'name email');

  if (survey) {
    res.json(survey);
  } else {
    res.status(404);
    throw new Error('Survey not found');
  }
});

// @desc    Update survey
// @route   PUT /api/surveys/:id
// @access  Private
export const updateSurvey = asyncHandler(async (req, res) => {
  const survey = await Survey.findById(req.params.id);

  if (survey) {
    // Only allow updates if survey is in draft status
    if (survey.status !== 'draft') {
      res.status(400);
      throw new Error('Cannot update a survey that is not in draft status');
    }

    const {
      title,
      description,
      questions,
      targetAudience,
      quotas,
      distribution,
      targetResponses,
    } = req.body;

    survey.title = title || survey.title;
    survey.description = description || survey.description;
    survey.questions = questions || survey.questions;
    survey.targetAudience = targetAudience || survey.targetAudience;
    survey.quotas = quotas || survey.quotas;
    survey.distribution = distribution || survey.distribution;
    survey.targetResponses = targetResponses || survey.targetResponses;

    const updatedSurvey = await survey.save();
    res.json(updatedSurvey);
  } else {
    res.status(404);
    throw new Error('Survey not found');
  }
});

// @desc    Delete survey
// @route   DELETE /api/surveys/:id
// @access  Private
export const deleteSurvey = asyncHandler(async (req, res) => {
  const survey = await Survey.findById(req.params.id);

  if (survey) {
    // Only allow deletion if survey is in draft status
    if (survey.status !== 'draft') {
      res.status(400);
      throw new Error('Cannot delete a survey that is not in draft status');
    }

    await survey.deleteOne();
    res.json({ message: 'Survey removed' });
  } else {
    res.status(404);
    throw new Error('Survey not found');
  }
});

// @desc    Deploy survey
// @route   POST /api/surveys/:id/deploy
// @access  Private/Manager/Admin
export const deploySurvey = asyncHandler(async (req, res) => {
  const survey = await Survey.findById(req.params.id);

  if (survey) {
    if (survey.status !== 'draft') {
      res.status(400);
      throw new Error('Survey is already deployed or completed');
    }

    // In a real system, this would trigger deployment to SMS and Dynata platforms
    survey.status = 'active';
    survey.startDate = new Date();

    const updatedSurvey = await survey.save();
    res.json(updatedSurvey);
  } else {
    res.status(404);
    throw new Error('Survey not found');
  }
});

// @desc    Pause survey
// @route   POST /api/surveys/:id/pause
// @access  Private/Manager/Admin
export const pauseSurvey = asyncHandler(async (req, res) => {
  const survey = await Survey.findById(req.params.id);

  if (survey) {
    if (survey.status !== 'active') {
      res.status(400);
      throw new Error('Survey is not active');
    }

    survey.status = 'paused';

    const updatedSurvey = await survey.save();
    res.json(updatedSurvey);
  } else {
    res.status(404);
    throw new Error('Survey not found');
  }
});

// @desc    Resume survey
// @route   POST /api/surveys/:id/resume
// @access  Private/Manager/Admin
export const resumeSurvey = asyncHandler(async (req, res) => {
  const survey = await Survey.findById(req.params.id);

  if (survey) {
    if (survey.status !== 'paused') {
      res.status(400);
      throw new Error('Survey is not paused');
    }

    survey.status = 'active';

    const updatedSurvey = await survey.save();
    res.json(updatedSurvey);
  } else {
    res.status(404);
    throw new Error('Survey not found');
  }
});

// @desc    Complete survey
// @route   POST /api/surveys/:id/complete
// @access  Private/Manager/Admin
export const completeSurvey = asyncHandler(async (req, res) => {
  const survey = await Survey.findById(req.params.id);

  if (survey) {
    if (survey.status === 'completed') {
      res.status(400);
      throw new Error('Survey is already completed');
    }

    survey.status = 'completed';
    survey.endDate = new Date();

    const updatedSurvey = await survey.save();
    res.json(updatedSurvey);
  } else {
    res.status(404);
    throw new Error('Survey not found');
  }
});

// @desc    Generate AI questions
// @route   POST /api/surveys/ai/generate-questions
// @access  Private
export const generateAIQuestions = asyncHandler(async (req, res) => {
  const { topic, questionCount, questionTypes } = req.body;

  if (!topic) {
    res.status(400);
    throw new Error('Please provide a topic for question generation');
  }

  // This is a mock implementation - in production this would call OpenAI API
  const mockGeneratedQuestions = [
    {
      text: `What is your opinion on ${topic}?`,
      type: 'multiple_choice',
      options: ['Very positive', 'Somewhat positive', 'Neutral', 'Somewhat negative', 'Very negative'],
      required: true,
      order: 1,
    },
    {
      text: `How likely are you to recommend ${topic} to a friend or colleague?`,
      type: 'likert',
      options: ['1 - Not at all likely', '2', '3', '4', '5 - Extremely likely'],
      required: true,
      order: 2,
    },
    {
      text: `What aspects of ${topic} are most important to you?`,
      type: 'open_ended',
      options: [],
      required: false,
      order: 3,
    },
  ];

  // Return the generated questions
  res.json({
    success: true,
    data: mockGeneratedQuestions,
  });
});