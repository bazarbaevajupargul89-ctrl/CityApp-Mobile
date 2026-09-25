// Mock Auth Service
// Замените на реальный Firebase Auth для production

export const authService = {
  signup: async (email, password, name) => {
    return new Promise((resolve, reject) => {
      if (!email || !password || !name) {
        reject(new Error('All fields required'));
        return;
      }
      setTimeout(() => {
        resolve({
          uid: Math.random().toString(36).substr(2, 9),
          email,
          name,
          createdAt: new Date(),
          photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        });
      }, 500);
    });
  },

  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      if (!email || !password) {
        reject(new Error('Email and password required'));
        return;
      }
      setTimeout(() => {
        resolve({
          uid: Math.random().toString(36).substr(2, 9),
          email,
          name: 'User',
          photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        });
      }, 500);
    });
  },

  logout: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 300);
    });
  },

  getCurrentUser: async () => {
    return null;
  },

  updateProfile: async (userId, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, user: data });
      }, 500);
    });
  },
};
