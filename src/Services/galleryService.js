import api from './api';

/**
 * Gallery Service
 * Handles fetching and managing gallery items from the backend API
 */

export const galleryService = {
  // Get all active gallery items
  getGalleryItems: async () => {
    try {
      const response = await api.get('/gallery');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch gallery items:', error);
      return [];
    }
  },

  // Get a single gallery item
  getGalleryItem: async (id) => {
    try {
      const response = await api.get(`/gallery/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch gallery item ${id}:`, error);
      throw error;
    }
  },

  // Create a new gallery item (admin only)
  createGalleryItem: async (itemData) => {
    try {
      const response = await api.post('/gallery', itemData);
      return response.data;
    } catch (error) {
      console.error('Failed to create gallery item:', error);
      throw error;
    }
  },

  // Update a gallery item (admin only)
  updateGalleryItem: async (id, itemData) => {
    try {
      const response = await api.put(`/gallery/${id}`, itemData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update gallery item ${id}:`, error);
      throw error;
    }
  },

  // Delete a gallery item (admin only)
  deleteGalleryItem: async (id) => {
    try {
      const response = await api.delete(`/gallery/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete gallery item ${id}:`, error);
      throw error;
    }
  },

  // Get site settings
  getSettings: async () => {
    try {
      const response = await api.get('/settings');
      return response.data.data || response.data;
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      throw error;
    }
  },

  // Update site settings (admin only)
  updateSettings: async (settingsData) => {
    try {
      const response = await api.put('/settings', settingsData);
      return response.data;
    } catch (error) {
      console.error('Failed to update settings:', error);
      throw error;
    }
  }
};

export default galleryService;
