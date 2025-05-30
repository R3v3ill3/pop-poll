import asyncHandler from 'express-async-handler';
import { db } from '../config/firebase.js';

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

  const surveyData = {
    title,
    description,
    questions,
    targetAudience,
    quotas,
    distribution,
    targetResponses,
    creator: req.user.uid,
    status: 'draft',
    currentResponses: 0,
    marginOfError: 2.0,
    createdAt: new Date(),
    updatedAt: new Date(),
    startDate: null,
    endDate: null
  };

  const surveyRef = await db.collection('surveys').add(surveyData);
  const survey = await surveyRef.get();

  if (survey.exists) {
    res.status(201).json({
      id: survey.id,
      ...survey.data()
    });
  } else {
    res.status(400);
    throw new Error('Invalid survey data');
  }
});

// @desc    Get all surveys
// @route   GET /api/surveys
// @access  Private
export const getSurveys = asyncHandler(async (req, res) => {
  const surveysSnapshot = await db.collection('surveys')
    .orderBy('createdAt', 'desc')
    .get();
  
  const surveys = [];
  
  for (const doc of surveysSnapshot.docs) {
    const creatorDoc = await db.collection('users').doc(doc.data().creator).get();
    surveys.push({
      id: doc.id,
      ...doc.data(),
      creator: creatorDoc.exists ? {
        uid: creatorDoc.id,
        name: creatorDoc.data().name,
        email: creatorDoc.data().email
      } : null
    });
  }
  
  res.json(surveys);
});

// @desc    Get survey by ID
// @route   GET /api/surveys/:id
// @access  Private
export const getSurveyById = asyncHandler(async (req, res) => {
  const survey = await db.collection('surveys').doc(req.params.id).get();

  if (survey.exists) {
    const creatorDoc = await db.collection('users').doc(survey.data().creator).get();
    
    res.json({
      id: survey.id,
      ...survey.data(),
      creator: creatorDoc.exists ? {
        uid: creatorDoc.id,
        name: creatorDoc.data().name,
        email: creatorDoc.data().email
      } : null
    });
  } else {
    res.status(404);
    throw new Error('Survey not found');
  }
});

// @desc    Update survey
// @route   PUT /api/surveys/:id
// @access  Private
export const updateSurvey = asyncHandler(async (req, res) => {
  const surveyRef = db.collection('surveys').doc(req.params.id);
  const survey = await surveyRef.get();

  if (survey.exists) {
    // Only allow updates if survey is in draft status
    if (survey.data().status !== 'draft') {
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

    const updateData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(questions && { questions }),
      ...(targetAudience && { targetAudience }),
      ...(quotas && { quotas }),
      ...(distribution && { distribution }),
      ...(targetResponses && { targetResponses }),
      updatedAt: new Date()
    };

    await surveyRef.update(updateData);
    
    const updatedSurvey = await surveyRef.get();
    res.json({
      id: updatedSurvey.id,
      ...updatedSurvey.data()
    });
  } else {
    res.status(404);
    throw new Error('Survey not found');
  }
});

// @desc    Delete survey
// @route   DELETE /api/surveys/:id
// @access  Private
export const deleteSurvey = asyncHandler(async (req, res) => {
  const surveyRef = db.collection('surveys').doc(req.params.id);
  const survey = await surveyRef.get();

  if (survey.exists) {
    // Only allow deletion if survey is in draft status
    if (survey.data().status !== 'draft') {
      res.status(400);
      throw new Error('Cannot delete a survey that is not in draft status');
    }

    await surveyRef.delete();
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
  const surveyRef = db.collection('surveys').doc(req.params.id);
  const survey = await surveyRef.get();

  if (survey.exists) {
    if (survey.data().status !== 'draft') {
      res.status(400);
      throw new Error('Survey is already deployed or completed');
    }

    await surveyRef.update({
      status: 'active',
      startDate: new Date(),
      updatedAt: new Date()
    });

    const updatedSurvey = await surveyRef.get();
    res.json({
      id: updatedSurvey.id,
      ...updatedSurvey.data()
    });
  } else {
    res.status(404);
    throw new Error('Survey not found');
  }
});

// @desc    Pause survey
// @route   POST /api/surveys/:id/pause
// @access  Private/Manager/Admin
export const pauseSurvey = asyncHandler(async (req, res) => {
  const surveyRef = db.collection('surveys').doc(req.params.id);
  const survey = await surveyRef.get();

  if (survey.exists) {
    if (survey.data().status !== 'active') {
      res.status(400);
      throw new Error('Survey is not active');
    }

    await surveyRef.update({
      status: 'paused',
      updatedAt: new Date()
    });

    const updatedSurvey = await surveyRef.get();
    res.json({
      id: updatedSurvey.id,
      ...updatedSurvey.data()
    });
  } else {
    res.status(404);
    throw new Error('Survey not found');
  }
});

// @desc    Resume survey
// @route   POST /api/surveys/:id/resume
// @access  Private/Manager/Admin
export const resumeSurvey = asyncHandler(async (req, res) => {
  const surveyRef = db.collection('surveys').doc(req.params.id);
  const survey = await surveyRef.get();

  if (survey.exists) {
    if (survey.data().status !== 'paused') {
      res.status(400);
      throw new Error('Survey is not paused');
    }

    await surveyRef.update({
      status: 'active',
      updatedAt: new Date()
    });

    const updatedSurvey = await surveyRef.get();
    res.json({
      id: updatedSurvey.id,
      ...updatedSurvey.data()
    });
  } else {
    res.status(404);
    throw new Error('Survey not found');
  }
});

// @desc    Complete survey
// @route   POST /api/surveys/:id/complete
// @access  Private/Manager/Admin
export const completeSurvey = asyncHandler(async (req, res) => {
  const surveyRef = db.collection('surveys').doc(req.params.id);
  const survey = await surveyRef.get();

  if (survey.exists) {
    if (survey.data().status === 'completed') {
      res.status(400);
      throw new Error('Survey is already completed');
    }

    await surveyRef.update({
      status: 'completed',
      endDate: new Date(),
      updatedAt: new Date()
    });

    const updatedSurvey = await surveyRef.get();
    res.json({
      id: updatedSurvey.id,
      ...updatedSurvey.data()
    });
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

  res.json({
    success: true,
    data: mockGeneratedQuestions,
  });
});