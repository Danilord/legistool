// src/App.js
import { AccountCircle } from '@mui/icons-material';
import { AppBar, CssBaseline, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';
import React, { createContext, useContext, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AuditResult from './pages/AuditResult';
import Categorias from './pages/Categorias';
import Checklist from './pages/Checklist';
import Contactos from './pages/Contactos';
import Country from './pages/Country';
import DistribucionCorreo from './pages/DistribucionCorreo';
import Documentos from './pages/Documentos';
import Inicio from './pages/Inicio';
import Organizacion from './pages/Organizacion';
import Permisos from './pages/Permisos';
import PermisosSucursal from './pages/PermisosSucursal';
import RegulacionesSucursal from './pages/RegulacionesSucursal';
import Regulation from './pages/Regulation';
import Requerimientos from './pages/Requerimientos';
import SubCategorias from './pages/SubCategorias';
import Sucursales from './pages/Sucursales';
import TipoDocumento from './pages/TipoDocumento';
import VistaRegulaciones from './pages/Vista de Regulaciones';
import VistaChecklist from './pages/Vista de Checklist';
import Login from './pages/Login';

const AuthContext = createContext();

const drawerWidth = 240; // Ancho del menú lateral

const App = () => {
  const [user, setUser] = useState({ name: 'John Doe', role: 'admin' }); // Ejemplo de un usuario autenticado como administrador

  return (
    <AuthContext.Provider value={user}>
      <Router>
        <div style={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" style={{ zIndex: 1201 }}>
            <Toolbar>
              <Typography variant="h6" noWrap component="div" style={{ flexGrow: 1 }}>
                LegisTool
              </Typography>
              <Typography variant="body1" component="div">
                {user.name}
              </Typography>
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="persistent"
            open={true}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
          >
            <Toolbar />
            <div>
              <List>
                
                <ListItem  component={Link} to="/">
                  <ListItemText primary="Inicio" />
                </ListItem>
                <ListItem  component={Link} to="/categorias">
                  <ListItemText primary="Categorías" />
                </ListItem>
                <ListItem  component={Link} to="/checklist">
                  <ListItemText primary="Checklist" />
                </ListItem>
                <ListItem  component={Link} to="/contactos">
                  <ListItemText primary="Contactos" />
                </ListItem>
                <ListItem  component={Link} to="/distribucion-correo">
                  <ListItemText primary="Distribución de Correos" />
                </ListItem>
                <ListItem  component={Link} to="/documentos">
                  <ListItemText primary="Documentos" />
                </ListItem>
                <ListItem  component={Link} to="/organizacion">
                  <ListItemText primary="Organización" />
                </ListItem>
                <ListItem  component={Link} to="/paises">
                  <ListItemText primary="Paises" />
                </ListItem>
                <ListItem  component={Link} to="/permisos">
                  <ListItemText primary="Permisos" />
                </ListItem>
                <ListItem  component={Link} to="/permisossucursales">
                  <ListItemText primary="Permisos por sucursal" />
                </ListItem>
                <ListItem  component={Link} to="/regulation">
                  <ListItemText primary="Regulaciones" />
                </ListItem>
                <ListItem  component={Link} to="/regulacionessucursales">
                  <ListItemText primary="Regulaciones por sucursal" />
                </ListItem>
                <ListItem  component={Link} to="/requerimientos">
                  <ListItemText primary="Requerimientos" />
                </ListItem>
                <ListItem  component={Link} to="/resultadodeauditoria">
                  <ListItemText primary="Resultado de Auditoria" />
                </ListItem>
                <ListItem  component={Link} to="/subcategorias">
                  <ListItemText primary="Sub Categorias" />
                </ListItem>
                <ListItem  component={Link} to="/sucursales">
                  <ListItemText primary="Sucursales" />
                </ListItem>
                <ListItem  component={Link} to="/tipodocumento">
                  <ListItemText primary="Tipo de Documento" />
                </ListItem>
                <ListItem  component={Link} to="/vistaregulaciones">
                  <ListItemText primary="Vista de Regulaciones" />
                </ListItem>
                <ListItem  component={Link} to="/vistachecklist">
                  <ListItemText primary="Vista de Checklist" />
                </ListItem>
              </List>
            </div>
          </Drawer>
          <main style={{ flexGrow: 1, padding: '24px', marginLeft: 0 }}>
            <Toolbar />
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/login" element={<Login />} />
              <Route path="/organizacion" element={<Organizacion />} />
              <Route path="/paises" element={<Country />} />
              <Route path="/sucursales" element={<Sucursales />} />
              <Route path="/distribucion-correo" element={<DistribucionCorreo />} />
              <Route path="/contactos" element={<Contactos />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/checklist" element={<Checklist />} />
              <Route path="/subcategorias" element={<SubCategorias />} />
              <Route path="/permisos" element={<Permisos />} />
              <Route path="/tipodocumento" element={<TipoDocumento />} />
              <Route path="/permisossucursales" element={<PermisosSucursal />} />
              <Route path="/regulation" element={<Regulation />} />
              <Route path="/regulacionessucursales" element={<RegulacionesSucursal />} />
              <Route path="/documentos" element={<Documentos />} />
              <Route path="/resultadodeauditoria" element={<AuditResult />} />
              <Route path="/requerimientos" element={<Requerimientos />} />
              <Route path="/vistaregulaciones" element={<VistaRegulaciones />} />
              <Route path="/vistachecklist" element={<VistaChecklist />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

export const useAuth = () => useContext(AuthContext);
