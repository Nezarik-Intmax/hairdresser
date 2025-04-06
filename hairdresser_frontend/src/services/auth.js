import api from './api';

export const login = async (username, password) => {
  try {
    const response = await api.post('token/', { username, password });
    localStorage.setItem('token', response.data.access);
    localStorage.setItem('refresh', response.data.refresh);
    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export const register = async (username, password, email) => {
  try {
    await api.post('register/', { username, password, email });
    return true;
  } catch (error) {
    console.error('Registration error:', error);
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh');
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('user/');
    return response.data;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
};