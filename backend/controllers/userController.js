import asyncHandler from 'express-async-handler';
import { auth, db } from '../config/firebase.js';

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  // Check if user exists
  const userExists = await auth.getUserByEmail(email).catch(() => null);
  
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create user in Firebase Auth
  const userRecord = await auth.createUser({
    email,
    password,
    displayName: name,
  });

  // Create user document in Firestore
  await db.collection('users').doc(userRecord.uid).set({
    name,
    email,
    role: 'user',
    createdAt: new Date().toISOString()
  });

  if (userRecord) {
    res.status(201).json({
      uid: userRecord.uid,
      name: userRecord.displayName,
      email: userRecord.email,
      role: 'user'
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { idToken } = req.body;

  try {
    // Verify the ID token
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // Get the user's Firestore document
    const userDoc = await db.collection('users').doc(decodedToken.uid).get();
    
    if (!userDoc.exists) {
      res.status(404);
      throw new Error('User not found');
    }

    const userData = userDoc.data();

    res.json({
      uid: decodedToken.uid,
      name: userData.name,
      email: userData.email,
      role: userData.role
    });
  } catch (error) {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

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