import axios from 'axios';

// =======================================
// AXIOS INSTANCE
// =======================================
const axiosPublic = axios.create({
  baseURL: 'https://fixit-backend.up.railway.app',
});

// =======================================
// TOKEN FUNCTIONS
// =======================================
export const saveTokens = ({ access, refresh }) => {
  if (access) localStorage.setItem('access', access);
  if (refresh) localStorage.setItem('refresh', refresh);
};

export const getAccessToken = () => {
  return localStorage.getItem('access');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refresh');
};

export const clearTokens = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
};

export const logout = () => {
  clearTokens();
  window.location.href = '/login';
};

// =======================================
// REFRESH TOKEN
// =======================================
const refreshAccessToken = async () => {
  try {
    const refresh = getRefreshToken();

    if (!refresh) return null;

    const res = await axios.post(
      'https://fixit-backend.up.railway.app/token/refresh/',
      {
        refresh,
      },
    );

    const newAccess = res.data.access;

    localStorage.setItem('access', newAccess);

    if (res.data.refresh) {
      localStorage.setItem('refresh', res.data.refresh);
    }

    return newAccess;
  } catch (err) {
    console.log('Refresh Failed:', err.response?.data || err.message);

    logout();

    return null;
  }
};

// =======================================
// REQUEST INTERCEPTOR
// =======================================
axiosPublic.interceptors.request.use(
  config => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

// =======================================
// RESPONSE INTERCEPTOR
// =======================================
axiosPublic.interceptors.response.use(
  response => response,

  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccess = await refreshAccessToken();

      if (newAccess) {
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return axiosPublic(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

const useAxiosData = () => axiosPublic;

export default useAxiosData;
