/**
 * Centralized API Client Service
 * Configured with environment-aware base URL and standardized request handling.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function apiClient(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const token = localStorage.getItem('auth_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers
  });

  return response;
}

export const api = {
  get: (endpoint, options = {}) => apiClient(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) => apiClient(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body, options = {}) => apiClient(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint, options = {}) => apiClient(endpoint, { ...options, method: 'DELETE' })
};
