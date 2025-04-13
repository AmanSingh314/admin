import axios from 'axios';
import { BASE_URL } from "./api";

export const addYoutubeLinks = async (usercode, links) => {
  try {
    // Validate payload structure
    if (!links || !Array.isArray(links)) {
      throw new Error('Invalid payload: links array is required');
    }

    const payload = {
      user_code: usercode,
      links: links
    };

    const response = await axios.post(`${BASE_URL}/addytubelink`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    if (!response.data) {
      throw new Error('Empty response from server');
    }

    return response.data;
  } catch (error) {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      config: error.config
    });
    
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Failed to save links';
    throw new Error(errorMessage);
  }
};