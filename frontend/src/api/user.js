const API_BASE_URL = 'http://localhost:8080/api'; 

// Function untuk login user
export const loginUser = async (email, password) => {
  const url = `${API_BASE_URL}/users/login`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Login successful:', result);

    if (result && result.data && result.data.token) {
      localStorage.setItem('token', result.data.token);  
    }

    return result; 
  } catch (error) {
    console.error('Error during login:', error.message);
    throw error;
  }
};


// Function untuk get detail user
export const getUserProfile = async () => {
    const token = localStorage.getItem('token'); 
  
    if (!token) {
      throw new Error('No token found');
    }
  
    const url = `${API_BASE_URL}/users/profile`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching profile: ${response.status}`);
      }
  
      const result = await response.json();
      return result.data; 
    } catch (error) {
      console.error('Error fetching profile:', error.message);
      throw error;
    }
  };