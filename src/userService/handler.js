const crypto = require('crypto');
const { firestore } = require('../firebase');
const { Storage } = require('@google-cloud/storage');
const dotenv = require('dotenv');

dotenv.config();

const BUCKET_NAME = process.env.BUCKET_NAME;

const storage = new Storage();
const bucket = storage.bucket(BUCKET_NAME);

// User data will be stored inside Firebase Firestore
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new Error('Missing required fields: username, email, password');
    }
    
    // Check if username is already in use
    const usernameSnapshot = await firestore.collection('users').where('username', '==', username).get();
      if (!usernameSnapshot.empty) {
      return res.status(400).json({
        status: 'fail',
        message: 'Username already in use'
      });
    }

    // Check if email is already in use
    const emailSnapshot = await firestore.collection('users').where('email', '==', email).get();
    if (!emailSnapshot.empty) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email already in use'
      });
    }

    // Check if password meets minimum length requirement
    if (password.length < 8) {
      return res.status(400).json({
        status: 'fail',
        message: 'Password must be at least 8 characters long'
      });
    }

    const user = {
      id: crypto.randomUUID(),
      username,
      email,
      password,
      createdAt: new Date()
    };

    const userRef = firestore.collection('users').doc(user.id);
    await userRef.set(user);

    return res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error.message || 'Internal Server Error'
    });
  }
};

// Retrieve User data by id inside token payload 
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userRef = firestore.collection('users').doc(id);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      });
    }

    const data = userDoc.data();
    const user = {
      id: data.id,
      username: data.username,
      email: data.email,
      createdAt: data.createdAt.toDate().toISOString()
    };

    return res.status(200).json({
      status: 'success',
      message: 'User retrieved successfully',
      data: user
    });
  } catch (error) {
      return res.status(500).json({
        status: 'fail',
        message: error.message || 'Internal Server Error'
      });
  }
};

// Update username (must be unique)
const updateUsername = async (req, res) => {
  try {
    const { id } = req.params;
    const { newUsername } = req.body;

    // Check if newUsername is already in use
    const usernameSnapshot = await firestore.collection('users').where('username', '==', newUsername).get();
    if (!usernameSnapshot.empty) {
      return res.status(400).json({
        status: 'fail',
        message: 'Username already in use'
      });
    }

    const userRef = firestore.collection('users').doc(id);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      });
    }
      
    await userRef.update({ username: newUsername });

    return res.status(200).json({
      status: 'success',
      message: 'Username updated successfully'
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error.message || 'Internal Server Error'
    });
  }
};

// Update email (must be unique)
const updateUserEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { newEmail } = req.body;

    // Check if newEmail is already in use
    const emailSnapshot = await firestore.collection('users').where('email', '==', newEmail).get();
    if (!emailSnapshot.empty) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email already in use'
      });
    }

    const userRef = firestore.collection('users').doc(id);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      });
    }
    
    await userRef.update({ email: newEmail });

    return res.status(200).json({
      status: 'success',
      message: 'Email updated successfully'
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error.message || 'Internal Server Error'
    });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    // Check if newPassword meets minimum length requirement
    if (newPassword.length < 8) {
      return res.status(400).json({
        status: 'fail',
        message: 'New password must be at least 8 characters long'
      });
    }

    const userRef = firestore.collection('users').doc(id);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      });
    }
    await userRef.update({ password: newPassword });

    return res.status(200).json({
      status: 'success',
      message: 'User password updated successfully'
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error.message || 'Internal Server Error'
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userRef = firestore.collection('users').doc(id);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      });
    }

    // Delete user history from Firestore
    const historySnapshot = await firestore.collection('histories').where('userId', '==', id).get();
    const batch = firestore.batch();
    historySnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Delete user's folder from Cloud Storage
    await deleteFolderFromBucket(id);

    await userRef.delete();

    return res.status(200).json({
      status: 'success',
      message: 'User deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error.message || 'Internal Server Error'
    });
  }
};

const deleteFolderFromBucket = async (folderName) => {
  const [files] = await bucket.getFiles({ prefix: `${folderName}/` });
  const deletions = files.map(file => file.delete());
  await Promise.all(deletions);
};

module.exports = {
    createUser,
    getUserById,
    updateUsername,
    updateUserEmail,
    updateUserPassword,
    deleteUserById
};
