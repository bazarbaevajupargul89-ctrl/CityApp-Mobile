// API Service
// Mock service for development, replace with real Firebase queries

export const apiService = {
  getReels: async (limit = 10) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            user: 'Aru',
            handle: '@aru',
            title: 'Sunset city vibes',
            likes: 12800,
            comments: 822,
            colorA: '#ff7b72',
            colorB: '#f59e0b',
            music: 'Night Drive',
            videoUrl: 'https://via.placeholder.com/400x600?text=Video1',
            userId: 'user1',
            duration: 15,
          },
          {
            id: 2,
            user: 'Mira',
            handle: '@mira',
            title: 'Creative studio',
            likes: 21400,
            comments: 1339,
            colorA: '#60a5fa',
            colorB: '#8b5cf6',
            music: 'Skyline',
            videoUrl: 'https://via.placeholder.com/400x600?text=Video2',
            userId: 'user2',
            duration: 20,
          },
          {
            id: 3,
            user: 'Dias',
            handle: '@dias',
            title: 'Coffee & friends',
            likes: 9800,
            comments: 514,
            colorA: '#34d399',
            colorB: '#10b981',
            music: 'Morning Mood',
            videoUrl: 'https://via.placeholder.com/400x600?text=Video3',
            userId: 'user3',
            duration: 18,
          },
        ]);
      }, 500);
    });
  },

  getMyReels: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 101,
            title: 'My first reel',
            likes: 150,
            comments: 12,
            views: 1200,
          },
          {
            id: 102,
            title: 'Amazing content',
            likes: 450,
            comments: 45,
            views: 3200,
          },
        ]);
      }, 500);
    });
  },

  addLike: async (reelId, userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, liked: true });
      }, 300);
    });
  },

  removeLike: async (reelId, userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, liked: false });
      }, 300);
    });
  },

  addComment: async (reelId, userId, text) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          userId,
          userName: 'User',
          text,
          createdAt: new Date(),
          likes: 0,
        });
      }, 300);
    });
  },

  getComments: async (reelId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            userName: 'User1',
            text: 'Amazing!',
            likes: 10,
            createdAt: new Date(),
          },
          {
            id: 2,
            userName: 'User2',
            text: 'Love this',
            likes: 5,
            createdAt: new Date(),
          },
        ]);
      }, 500);
    });
  },

  getTrends: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'Fashion', views: 1000000 },
          { id: 2, name: 'Travel', views: 900000 },
          { id: 3, name: 'Tech', views: 800000 },
          { id: 4, name: 'Food', views: 700000 },
          { id: 5, name: 'Music', views: 600000 },
          { id: 6, name: 'Life', views: 500000 },
        ]);
      }, 500);
    });
  },
};
