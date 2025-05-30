import asyncHandler from 'express-async-handler';
import Panelist from '../models/panelistModel.js';

// @desc    Add new SMS panelist
// @route   POST /api/panels
// @access  Private/Manager/Admin
export const addSMSPanelist = asyncHandler(async (req, res) => {
  const {
    phone,
    firstName,
    lastName,
    email,
    age,
    gender,
    location,
    consentStatus,
  } = req.body;

  // Check if panelist exists
  const panelistExists = await Panelist.findOne({ phone, type: 'sms' });

  if (panelistExists) {
    res.status(400);
    throw new Error('Panelist already exists');
  }

  // Create panelist
  const panelist = await Panelist.create({
    phone,
    firstName,
    lastName,
    email,
    age,
    gender,
    location,
    consentStatus,
    consentDate: consentStatus ? new Date() : null,
    type: 'sms',
  });

  if (panelist) {
    res.status(201).json(panelist);
  } else {
    res.status(400);
    throw new Error('Invalid panelist data');
  }
});

// @desc    Get all panelists
// @route   GET /api/panels
// @access  Private
export const getPanelists = asyncHandler(async (req, res) => {
  const { type, status } = req.query;
  
  let query = {};
  
  if (type) {
    query.type = type;
  }
  
  if (status) {
    query.status = status;
  }
  
  const panelists = await Panelist.find(query).sort({ createdAt: -1 });
  
  res.json(panelists);
});

// @desc    Get panelist by ID
// @route   GET /api/panels/:id
// @access  Private
export const getPanelistById = asyncHandler(async (req, res) => {
  const panelist = await Panelist.findById(req.params.id);

  if (panelist) {
    res.json(panelist);
  } else {
    res.status(404);
    throw new Error('Panelist not found');
  }
});

// @desc    Update panelist
// @route   PUT /api/panels/:id
// @access  Private/Manager/Admin
export const updatePanelist = asyncHandler(async (req, res) => {
  const panelist = await Panelist.findById(req.params.id);

  if (panelist) {
    const {
      firstName,
      lastName,
      email,
      age,
      gender,
      location,
      consentStatus,
      status,
    } = req.body;

    panelist.firstName = firstName || panelist.firstName;
    panelist.lastName = lastName || panelist.lastName;
    panelist.email = email || panelist.email;
    panelist.age = age || panelist.age;
    panelist.gender = gender || panelist.gender;
    panelist.location = location || panelist.location;
    
    if (consentStatus !== undefined && consentStatus !== panelist.consentStatus) {
      panelist.consentStatus = consentStatus;
      if (consentStatus) {
        panelist.consentDate = new Date();
      }
    }
    
    panelist.status = status || panelist.status;

    const updatedPanelist = await panelist.save();
    res.json(updatedPanelist);
  } else {
    res.status(404);
    throw new Error('Panelist not found');
  }
});

// @desc    Delete panelist
// @route   DELETE /api/panels/:id
// @access  Private/Manager/Admin
export const deletePanelist = asyncHandler(async (req, res) => {
  const panelist = await Panelist.findById(req.params.id);

  if (panelist) {
    await panelist.deleteOne();
    res.json({ message: 'Panelist removed' });
  } else {
    res.status(404);
    throw new Error('Panelist not found');
  }
});

// @desc    Import panelists from CSV
// @route   POST /api/panels/import
// @access  Private/Admin
export const importPanelists = asyncHandler(async (req, res) => {
  // In a real implementation, this would process a CSV file
  // For the mock version, we'll just return a success message
  
  res.json({
    success: true,
    message: 'Panelists imported successfully',
    imported: 10,
    errors: 0,
  });
});

// @desc    Export panelists to CSV
// @route   GET /api/panels/export
// @access  Private/Manager/Admin
export const exportPanelists = asyncHandler(async (req, res) => {
  // In a real implementation, this would generate a CSV file
  // For the mock version, we'll just return a success message
  
  res.json({
    success: true,
    message: 'Panelist export initiated',
    download_url: '/api/panels/download/export_12345.csv',
  });
});

// @desc    Opt out a panelist
// @route   POST /api/panels/:id/opt-out
// @access  Private
export const optOutPanelist = asyncHandler(async (req, res) => {
  const panelist = await Panelist.findById(req.params.id);

  if (panelist) {
    panelist.status = 'opted_out';
    const updatedPanelist = await panelist.save();
    
    res.json({
      success: true,
      message: 'Panelist has been opted out successfully',
      panelist: updatedPanelist,
    });
  } else {
    res.status(404);
    throw new Error('Panelist not found');
  }
});