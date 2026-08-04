import { createContext, useEffect, useState } from 'react';
import useAxiosData from '../CustomHooks/useAxiosData';




export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosData();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfile] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('access'));

  // ============================
  // LOAD USER
  // ============================
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const res = await axiosPublic.get('/me/');

        setUser(res.data);

        // const profile = await axiosPublic.get("/profile/");

        // setProfile(profile);
        // console.log(profile)
      } catch (error) {
        console.log(error.response?.data || error.message);

        localStorage.removeItem('access');
        localStorage.removeItem('refresh');

        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  // ============================
  // SAVE TOKEN + LOAD USER
  // ============================
  const login = async (access, refresh) => {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);

    setToken(access);

    const res = await axiosPublic.get('/me/', {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    setUser(res.data);
  };
  console.log(user)
  // ============================
  // REGISTER
  // ============================
  const register = async ({
    username,
    email,
    password,
  }) => {
    const res = await axiosPublic.post('/register/', {
      username,
      email,
      password,
    });

    // Register API থেকেই token আসবে
    const { access, refresh } = res.data;

    await login(access, refresh);

    return res.data;
  };

  // ============================
  // LOGOUT
  // ============================
  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');

    setUser(null);
    setToken(null);
  };

  // ============================
  // IMAGE URL
  // ============================
  const getImageUrl = url => {
    if (!url) return '';

    let decoded = decodeURIComponent(
      url.replace('http://127.0.0.1:8000/media/', '').replace('/media/', ''),
    );

    if (decoded.startsWith('https:/') && !decoded.startsWith('https://')) {
      decoded = decoded.replace('https:/', 'https://');
    }

    if (decoded.startsWith('http:/') && !decoded.startsWith('http://')) {
      decoded = decoded.replace('http:/', 'http://');
    }

    return decoded;
  };

  const authInfo = {
    user,
    loading,
    profileData,
    login,
    register,
    logout,
    setUser,
    getImageUrl,
  };


  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
