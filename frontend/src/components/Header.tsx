import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/NavigationLink';

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar sx={{ bgcolor: "transparent", position: 'static', boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink bg="#00fffc" to="/chat"
                text='Go to Chat'
                textColor='black'
              />
              <span style={{ margin: '0 10px' }} /> {/* Add space between buttons */}
              <NavigationLink bg="#51538f"
                textColor='white'
                to='/'
                text='logout'
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink bg="#00fffc" to="/login"
                text='Login'
                textColor='black'
              />
              <span style={{ margin: '0 10px' }} /> {/* Add space between buttons */}
              <NavigationLink bg="#51538f"
                textColor='white'
                to='/signup'
                text='Signup'
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
