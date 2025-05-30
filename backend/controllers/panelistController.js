import asyncHandler from 'express-async-handler';
import { db } from '../config/firebase.js';

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
  const panelistQuery = await db.collection('panelists')
    .where('phone', '==', phone)
    .where('type', '==', 'sms')
    .get();

  if (!panelistQuery.empty) {
    res.status(400);
    throw new Error('Panelist already exists');
  }

  // Create panelist
  const panelistData = {
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
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'active',
    participationHistory: []
  };

  const panelistRef = await db.collection('panelists').add(panelistData);
  const panelist = await panelistRef.get();

  if (panelist.exists) {
    res.status(201).json({
      id: panelist.id,
      ...panelist.data()
    });
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
  
  let query = db.collection('panelists');
  
  if (type) {
    query = query.where('type', '==', type);
  }
  
  if (status) {
    query = query.where('status', '==', status);
  }
  
  const snapshot = await query.orderBy('createdAt', 'desc').get();
  const panelists = [];
  
  snapshot.forEach(doc => {
    panelists.push({
      id: doc.id,
      ...doc.data()
    });
  });
  
  res.json(panelists);
});

// @desc    Get panelist by ID
// @route   GET /api/panels/:id
// @access  Private
export const getPanelistById = asyncHandler(async (req, res) => {
  const panelist = await db.collection('panelists').doc(req.params.id).get();

  if (panelist.exists) {
    res.json({
      id: panelist.id,
      ...panelist.data()
    });
  } else {
    res.status(404);
    throw new Error('Panelist not found');
  }
});

// @desc    Update panelist
// @route   PUT /api/panels/:id
// @access  Private/Manager/Admin
export const updatePanelist = asyncHandler(async (req, res) => {
  const panelistRef = db.collection('panelists').doc(req.params.id);
  const panelist = await panelistRef.get();

  if (panelist.exists) {
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

    const updateData = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(email && { email }),
      ...(age && { age }),
      ...(gender && { gender }),
      ...(location && { location }),
      ...(status && { status }),
      updatedAt: new Date()
    };

    if (consentStatus !== undefined && consentStatus !== panelist.data().consentStatus) {
      updateData.consentStatus = consentStatus;
      if (consentStatus) {
        updateData.consentDate = new Date();
      }
    }

    await panelistRef.update(updateData);
    
    const updatedPanelist = await panelistRef.get();
    res.json({
      id: updatedPanelist.id,
      ...updatedPanelist.data()
    });
  } else {
    res.status(404);
    throw new Error('Panelist not found');
  }
});

// @desc    Delete panelist
// @route   DELETE /api/panels/:id
// @access  Private/Manager/Admin
export const deletePanelist = asyncHandler(async (req, res) => {
  const panelistRef = db.collection('panelists').doc(req.params.id);
  const panelist = await panelistRef.get();

  if (panelist.exists) {
    await panelistRef.delete();
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
  const panelistRef = db.collection('panelists').doc(req.params.id);
  const panelist = await panelistRef.get();

  if (panelist.exists) {
    await panelistRef.update({
      status: 'opted_out',
      updatedAt: new Date()
    });
    
    const updatedPanelist = await panelistRef.get();
    res.json({
      success: true,
      message: 'Panelist has been opted out successfully',
      panelist: {
        id: updatedPanelist.id,
        ...updatedPanelist.data()
      }
    });
  } else {
    res.status(404);
    throw new Error('Panelist not found');
  }
});