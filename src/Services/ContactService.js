import api from './api';

/**
 * Contact Service
 * Handles sending contact form messages to the backend
 */

export const contactService = {
  // Send a contact message
  sendMessage: async (messageData) => {
    try {
      // Added trailing slash after /contact/
      const response = await api.post('/contact/', messageData);
      return response.data;
    } catch (error) {
      console.error('Failed to send contact message:', error);
      throw error;
    }
  }
};

export default contactService;