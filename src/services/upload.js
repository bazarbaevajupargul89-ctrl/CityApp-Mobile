// Upload Service for Videos and Images
// Uses Firebase Storage in production

export const uploadService = {
  uploadVideo: async (videoUri, title, description) => {
    return new Promise((resolve, reject) => {
      if (!videoUri) {
        reject(new Error('Video URI required'));
        return;
      }
      setTimeout(() => {
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          url: 'https://via.placeholder.com/400x600?text=Video+' + Math.random(),
          title,
          description,
          uploadedAt: new Date(),
          fileSize: Math.random() * 100,
        });
      }, 1500);
    });
  },

  uploadImage: async (imageUri) => {
    return new Promise((resolve, reject) => {
      if (!imageUri) {
        reject(new Error('Image URI required'));
        return;
      }
      setTimeout(() => {
        resolve({
          url: imageUri,
          uploadedAt: new Date(),
        });
      }, 800);
    });
  },

  deleteVideo: async (videoId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },
};
