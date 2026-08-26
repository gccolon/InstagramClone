import {
  signInWithEmailAndPassword,
  signOut,
  getCurrentUser,
  isAuthenticated,
  isValidEmail,
} from './authService';
import firebase from 'firebase';

// Mock firebase
jest.mock('firebase', () => ({
  auth: jest.fn(() => ({
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    currentUser: null,
  })),
}));

describe('authService', () => {
  let mockAuth;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    mockAuth = {
      signInWithEmailAndPassword: jest.fn(),
      signOut: jest.fn(),
      currentUser: null,
    };
    firebase.auth.mockReturnValue(mockAuth);
  });

  describe('signInWithEmailAndPassword', () => {
    it('should successfully sign in with valid credentials', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const mockUserCredential = {
        user: { uid: '123', email },
      };

      mockAuth.signInWithEmailAndPassword.mockResolvedValue(mockUserCredential);

      const result = await signInWithEmailAndPassword(email, password);

      expect(mockAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(email, password);
      expect(result).toEqual(mockUserCredential);
    });

    it('should throw error when email is empty', async () => {
      await expect(signInWithEmailAndPassword('', 'password123')).rejects.toThrow(
        'Email and password are required'
      );
    });

    it('should throw error when password is empty', async () => {
      await expect(signInWithEmailAndPassword('test@example.com', '')).rejects.toThrow(
        'Email and password are required'
      );
    });

    it('should throw error when email is null', async () => {
      await expect(signInWithEmailAndPassword(null, 'password123')).rejects.toThrow(
        'Email and password are required'
      );
    });

    it('should throw error when password is null', async () => {
      await expect(signInWithEmailAndPassword('test@example.com', null)).rejects.toThrow(
        'Email and password are required'
      );
    });

    it('should throw error for invalid email format', async () => {
      await expect(signInWithEmailAndPassword('invalid-email', 'password123')).rejects.toThrow(
        'Invalid email format'
      );
    });

    it('should handle auth/user-not-found error', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const firebaseError = { code: 'auth/user-not-found', message: 'User not found' };

      mockAuth.signInWithEmailAndPassword.mockRejectedValue(firebaseError);

      await expect(signInWithEmailAndPassword(email, password)).rejects.toThrow(
        'No account found with this email'
      );
    });

    it('should handle auth/wrong-password error', async () => {
      const email = 'test@example.com';
      const password = 'wrongpassword';
      const firebaseError = { code: 'auth/wrong-password', message: 'Wrong password' };

      mockAuth.signInWithEmailAndPassword.mockRejectedValue(firebaseError);

      await expect(signInWithEmailAndPassword(email, password)).rejects.toThrow(
        'Incorrect password'
      );
    });

    it('should handle auth/invalid-email error', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const firebaseError = { code: 'auth/invalid-email', message: 'Invalid email' };

      mockAuth.signInWithEmailAndPassword.mockRejectedValue(firebaseError);

      await expect(signInWithEmailAndPassword(email, password)).rejects.toThrow(
        'Invalid email address'
      );
    });

    it('should handle auth/user-disabled error', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const firebaseError = { code: 'auth/user-disabled', message: 'User disabled' };

      mockAuth.signInWithEmailAndPassword.mockRejectedValue(firebaseError);

      await expect(signInWithEmailAndPassword(email, password)).rejects.toThrow(
        'This account has been disabled'
      );
    });

    it('should handle auth/too-many-requests error', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const firebaseError = { code: 'auth/too-many-requests', message: 'Too many requests' };

      mockAuth.signInWithEmailAndPassword.mockRejectedValue(firebaseError);

      await expect(signInWithEmailAndPassword(email, password)).rejects.toThrow(
        'Too many failed login attempts. Please try again later'
      );
    });

    it('should handle auth/network-request-failed error', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const firebaseError = { code: 'auth/network-request-failed', message: 'Network error' };

      mockAuth.signInWithEmailAndPassword.mockRejectedValue(firebaseError);

      await expect(signInWithEmailAndPassword(email, password)).rejects.toThrow(
        'Network error. Please check your connection'
      );
    });

    it('should handle unknown errors with generic message', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const firebaseError = { code: 'auth/unknown-error', message: 'Unknown error occurred' };

      mockAuth.signInWithEmailAndPassword.mockRejectedValue(firebaseError);

      await expect(signInWithEmailAndPassword(email, password)).rejects.toThrow(
        'Unknown error occurred'
      );
    });
  });

  describe('signOut', () => {
    it('should successfully sign out', async () => {
      mockAuth.signOut.mockResolvedValue();

      await signOut();

      expect(mockAuth.signOut).toHaveBeenCalled();
    });

    it('should handle sign out errors', async () => {
      const error = new Error('Sign out failed');
      mockAuth.signOut.mockRejectedValue(error);

      await expect(signOut()).rejects.toThrow('Failed to sign out: Sign out failed');
    });
  });

  describe('getCurrentUser', () => {
    it('should return current user when authenticated', () => {
      const mockUser = { uid: '123', email: 'test@example.com' };
      mockAuth.currentUser = mockUser;

      const user = getCurrentUser();

      expect(user).toEqual(mockUser);
    });

    it('should return null when not authenticated', () => {
      mockAuth.currentUser = null;

      const user = getCurrentUser();

      expect(user).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when user is authenticated', () => {
      mockAuth.currentUser = { uid: '123', email: 'test@example.com' };

      const result = isAuthenticated();

      expect(result).toBe(true);
    });

    it('should return false when currentUser is null', () => {
      mockAuth.currentUser = null;

      const result = isAuthenticated();

      expect(result).toBe(false);
    });

    it('should return false when currentUser is undefined', () => {
      mockAuth.currentUser = undefined;

      const result = isAuthenticated();

      expect(result).toBe(false);
    });
  });

  describe('isValidEmail', () => {
    it('should return true for valid email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@example.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.com')).toBe(true);
      expect(isValidEmail('user_name@example.com')).toBe(true);
    });

    it('should return false for invalid email addresses', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('invalid@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('invalid@example')).toBe(false);
      expect(isValidEmail('invalid @example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('invalid..email@example.com')).toBe(false);
    });
  });
});
