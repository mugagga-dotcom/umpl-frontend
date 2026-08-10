import api from './api';

/**
 * Settings Service
 * Handles fetching site-wide settings including social media links
 */

export const settingsService = {
  // Get all site settings including social media links
  getSettings: async () => {
    try {
      const response = await api.get('/settings');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      return {
        social_media: {
          facebook_url: null,
          twitter_url: null,
          instagram_url: null,
          linkedin_url: null,
          youtube_url: null,
        }
      };
    }
  },

  // Update site settings (admin only)
  updateSettings: async (settings) => {
    try {
      const response = await api.put('/settings', settings);
      return response.data;
    } catch (error) {
      console.error('Failed to update settings:', error);
      throw error;
    }
  }
};

export default settingsService;