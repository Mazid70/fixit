import React, { useState, useEffect, useContext } from 'react';
import LoginView from './LoginView.jsx';
import RegisterView from './RegisterView.jsx';

// AOS for page transition animations
import AOS from 'aos';
import 'aos/dist/aos.css';

import heroBanner from '../../assets/image/fixit_hero_banner_1784038837238.jpg';
import { AuthContext } from '../../AuthProvider/AuthProvider.jsx';
import { useNavigate } from 'react-router';

export default function Logger() {
  const [view, setView] = useState('login');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Once AuthContext confirms a logged-in user, leave this page
  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  // Init AOS once
  useEffect(() => {
    AOS.init({ duration: 500, easing: 'ease-out-quad', once: false });
  }, []);

  // Refresh AOS animations whenever the view switches
  useEffect(() => {
    AOS.refresh();
  }, [view]);

  return (
    <div className="bg-slate-950 text-slate-100 h-screen selection:bg-orange-500/30 selection:text-orange-400 flex flex-col justify-between pt-10">
      {view === 'login' ? (
        <div key="login-page" data-aos="fade-up">
          <LoginView
            onSwitchView={() => setView('register')}
            heroImagePath={heroBanner}
          />
        </div>
      ) : (
        <div key="register-page" data-aos="fade-up">
          <RegisterView
            onSwitchView={() => setView('login')}
            heroImagePath={heroBanner}
          />
        </div>
      )}
    </div>
  );
}
