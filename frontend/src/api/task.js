const API_URL = 'http://localhost:8080/api/tasks';

// Function untuk get semua task user yang login
export const getTask = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  const response = await fetch('http://localhost:8080/api/tasks', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return await response.json();
};

// Function untuk add task baru
export const addTask = async (newTask) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  const response = await fetch('http://localhost:8080/api/tasks', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: newTask }),
  });

  if (!response.ok) {
    throw new Error('Failed to add task');
  }

  return await response.json();
};

// Function untuk update task
export const updateTask = async (token, taskId, updatedTask) => {
  try {
    const response = await fetch(`${API_URL}/${taskId}/done`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });

    if (!response.ok) {
      throw new Error('Failed to update task status');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function untuk menghapus task
export const deleteTask = async (token, taskId) => {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': '*/*',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};