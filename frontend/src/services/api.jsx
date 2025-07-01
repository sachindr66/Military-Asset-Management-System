import axios from 'axios';

const API = axios.create({
  // baseURL: 'http://localhost:5000/api', 
  baseURL:"https://military-asset-management-system-ba.vercel.app/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (data) => {
  try {
    const response = await API.post('/auth/login', data);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const fetchDashboardMetrics = async (filter = {}) => {
  try {
    const base_id = localStorage.getItem('base_id');
    const params = {
      base_id,
      ...filter,
    };
    const response = await API.get('/dashboard', { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error);
    throw error;
  }
};

export const fetchAssets = async () => {
  try {
    const response = await API.get('/assets');
    return response.data;
  } catch (error) {
    console.error("Error fetching assets:", error);
    throw error;
  }
};

export const createPurchase = async (data) => {
  try {
    const response = await API.post('/purchases', data);
    return response.data;
  } catch (error) {
    console.error("Error creating purchase:", error);
    throw error;
  }
};

export const createTransfer = async (data) => {
  try {
    const response = await API.post('/transfers', data);
    console.log("✅ Transfer created response:", response);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating transfer:", error.response?.data || error.message);
    throw error;
  }
};


export const createAssignment = async (data) => {
  try {
    const response = await API.post('/assignments', data);
    return response.data;
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw error;
  }
};

export const getAssets = async () => {
  const response = await API.get('/assets');
  return response.data;
};

export const getPersonnel = async () => {
  const response = await API.get('/personnel');
  return response.data;
};



export const fetchTransfers = async () => {
  try {
    const response = await API.get('/transfers');
    return response.data;
  } catch (error) {
    console.error("Error fetching transfers:", error);
    throw error;
  }
};

export const fetchBases = async () => {
  try {
    const response = await API.get('/bases');
    return response.data;
  } catch (error) {
    console.error("Error fetching bases:", error);
    throw error;
  }
};
