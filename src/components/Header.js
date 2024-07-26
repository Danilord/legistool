// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography} from '@mui/material';
//const nombre = "daniel test name";

const Header = (/*{ nombre }*/) => {
  return (
    <AppBar position="fixed" style={{ zIndex: 1201 }}>
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                LegisTool
              </Typography>
            </Toolbar>
          </AppBar>
  );
};

export default Header;
