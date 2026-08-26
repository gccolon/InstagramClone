import firebase from 'firebase';

/**
 * Auth Service - Handles authentication operations
 */

/**
 * Sign in a user with email and password
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<firebase.auth.UserCredential>} - Firebase user credential
 * @throws {Error} - Firebase authentication error
 */
export const signInWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  if (!isValidEmail(email)) {
    throw new Error('Invalid email format');
  }

  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    return userCredential;
  } catch (error) {
    // Re-throw with more specific error messages
    throw handleAuthError(error);
  }
};

/**
 * Sign out the current user
 * @returns {Promise<void>}
 */
export const signOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    throw new Error('Failed to sign out: ' + error.message);
  }
};

/**
 * Get the current authenticated user
 * @returns {firebase.User | null} - Current user or null if not authenticated
 */
export const getCurrentUser = () => {
  return firebase.auth().currentUser;
};

/**
 * Check if a user is currently authenticated
 * @returns {boolean} - True if user is authenticated, false otherwise
 */
export const isAuthenticated = () => {
  return firebase.auth().currentUser !== null && firebase.auth().currentUser !== undefined;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Handle Firebase authentication errors and return user-friendly messages
 * @param {Error} error - Firebase error object
 * @returns {Error} - Error with user-friendly message
 */
const handleAuthError = (error) => {
  const errorMessages = {
    'auth/invalid-email': 'Invalid email address',
    'auth/user-disabled': 'This account has been disabled',
    'auth/user-not-found': 'No account found with this email',
    'auth/wrong-password': 'Incorrect password',
    'auth/too-many-requests': 'Too many failed login attempts. Please try again later',
    'auth/network-request-failed': 'Network error. Please check your connection',
    'auth/invalid-credential': 'Invalid credentials provided',
  };

  const message = errorMessages[error.code] || error.message || 'Authentication failed';
  const newError = new Error(message);
  newError.code = error.code;
  return newError;
};

export default {
  signInWithEmailAndPassword,
  signOut,
  getCurrentUser,
  isAuthenticated,
  isValidEmail,
};
