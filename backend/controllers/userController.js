import asyncHandler from 'express-async-handler';
import { auth, db } from '../config/firebase.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const userDoc = await db.collection('users').doc(req.user.uid).get();
  
  if (userDoc.exists) {
    const userData = userDoc.data();
    res.json({
      uid: req.user.uid,
      name: userData.name,
      email: userData.email,
      role: userData.role
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const userRef = db.collection('users').doc(req.user.uid);
  const userDoc = await userRef.get();

  if (userDoc.exists) {
    const updateData = {};
    
    if (req.body.name) {
      updateData.name = req.body.name;
      // Update display name in Firebase Auth
      await auth.updateUser(req.user.uid, {
        displayName: req.body.name
      });
    }
    
    if (req.body.email) {
      updateData.email = req.body.email;
      // Update email in Firebase Auth
      await auth.updateUser(req.user.uid, {
        email: req.body.email
      });
    }

    await userRef.update(updateData);
    
    const updatedDoc = await userRef.get();
    const userData = updatedDoc.data();

    res.json({
      uid: req.user.uid,
      name: userData.name,
      email: userData.email,
      role: userData.role
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const usersSnapshot = await db.collection('users').get();
  const users = [];
  
  usersSnapshot.forEach(doc => {
    const userData = doc.data();
    users.push({
      uid: doc.id,
      name: userData.name,
      email: userData.email,
      role: userData.role
    });
  });
  
  res.json(users);
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const userDoc = await db.collection('users').doc(req.params.id).get();

  if (userDoc.exists) {
    const userData = userDoc.data();
    res.json({
      uid: userDoc.id,
      name: userData.name,
      email: userData.email,
      role: userData.role
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const userRef = db.collection('users').doc(req.params.id);
  const userDoc = await userRef.get();

  if (userDoc.exists) {
    const updateData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role
    };

    await userRef.update(updateData);
    
    // Update Auth user if email changed
    if (req.body.email) {
      await auth.updateUser(req.params.id, {
        email: req.body.email
      });
    }

    const updatedDoc = await userRef.get();
    const userData = updatedDoc.data();

    res.json({
      uid: updatedDoc.id,
      name: userData.name,
      email: userData.email,
      role: userData.role
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const userRef = db.collection('users').doc(req.params.id);
  const userDoc = await userRef.get();

  if (userDoc.exists) {
    await userRef.delete();
    await auth.deleteUser(req.params.id);
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});