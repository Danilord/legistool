import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  MenuItem,
  Switch,
  Grid
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const DistribucionCorreo = () => {
  const [organizacionSeleccionada, setOrganizacionSeleccionada] = useState('');
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
  const [email, setEmail] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [errorEmail, setErrorEmail] = useState('');

  // Objeto para almacenar las listas de correos por cada sucursal
  const [listasCorreos, setListasCorreos] = useState({
    'Sucursal 1-1': [
      { id: 1, email: 'correo1@sucursal1-1.com', enabled: true },
      { id: 2, email: 'correo2@sucursal1-1.com', enabled: true },
    ],
    'Sucursal 1-2': [
      { id: 1, email: 'correo1@sucursal1-2.com', enabled: false },
    ],
    'Sucursal 2-1': [
      { id: 1, email: 'correo1@sucursal2-1.com', enabled: true },
      { id: 2, email: 'correo2@sucursal2-1.com', enabled: true },
      { id: 3, email: 'correo3@sucursal2-1.com', enabled: false },
    ],
    'Sucursal 2-2': [],
  });

  const organizaciones = [
    {
      id: 1,
      nombre: 'Organización 1',
      sucursales: [
        { id: 1, nombre: 'Sucursal 1-1' },
        { id: 2, nombre: 'Sucursal 1-2' },
      ],
    },
    {
      id: 2,
      nombre: 'Organización 2',
      sucursales: [
        { id: 3, nombre: 'Sucursal 2-1' },
        { id: 4, nombre: 'Sucursal 2-2' },
      ],
    },
  ];

  const handleInputChange = (event, setter) => {
    setter(event.target.value);

    // Limpiar el error de correo electrónico al cambiar de sucursal
    setErrorEmail('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email.trim() === '') {
      setErrorEmail('El correo electrónico es requerido');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorEmail('El formato del correo electrónico no es válido');
      return;
    }

    // Limpiar el error si pasa la validación
    setErrorEmail('');

    // Inicializar listas de correos si es undefined
    if (!listasCorreos[sucursalSeleccionada]) {
      listasCorreos[sucursalSeleccionada] = [];
    }

    const nuevoCorreo = {
      id: listasCorreos[sucursalSeleccionada].length + 1,
      email,
      enabled: true,
    };

    if (editandoId !== null) {
      const nuevosCorreos = listasCorreos[sucursalSeleccionada].map(correo =>
        correo.id === editandoId ? { ...correo, email } : correo
      );
      setListasCorreos({ ...listasCorreos, [sucursalSeleccionada]: nuevosCorreos });
      setEditandoId(null);
    } else {
      setListasCorreos({
        ...listasCorreos,
        [sucursalSeleccionada]: [...listasCorreos[sucursalSeleccionada], nuevoCorreo]
      });
    }

    setEmail('');
  };

  const handleDelete = (id) => {
    const nuevosCorreos = listasCorreos[sucursalSeleccionada].filter(correo => correo.id !== id);
    setListasCorreos({ ...listasCorreos, [sucursalSeleccionada]: nuevosCorreos });
  };

  const handleEdit = (id) => {
    const correoEdit = listasCorreos[sucursalSeleccionada].find(correo => correo.id === id);
    if (correoEdit) {
      setEmail(correoEdit.email);
      setEditandoId(id);
    }
  };

  const handleToggleEnabled = (id) => {
    const nuevosCorreos = listasCorreos[sucursalSeleccionada].map(correo =>
      correo.id === id ? { ...correo, enabled: !correo.enabled } : correo
    );
    setListasCorreos({ ...listasCorreos, [sucursalSeleccionada]: nuevosCorreos });
  };

  const renderTablaCorreos = () => {
    if (!sucursalSeleccionada || !listasCorreos[sucursalSeleccionada]) {
      return null;
    }

    return (
      <TableContainer component={Paper} style={{ marginTop: '2em', overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Correo Electrónico</TableCell>
              <TableCell>Activo</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listasCorreos[sucursalSeleccionada].map((correo) => (
              <TableRow key={correo.id}>
                <TableCell component="th" scope="row">
                  {correo.email}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={correo.enabled}
                    onChange={() => handleToggleEnabled(correo.id)}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(correo.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(correo.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const sucursalesFiltradas = () => {
    const organizacion = organizaciones.find(org => org.nombre === organizacionSeleccionada);
    return organizacion ? organizacion.sucursales : [];
  };

  return (
    <Container style={{ marginTop: '1em', marginLeft: 0 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Lista de Distribución de Correos
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Organización"
            variant="outlined"
            fullWidth
            value={organizacionSeleccionada}
            onChange={(e) => {
              handleInputChange(e, setOrganizacionSeleccionada);
              setSucursalSeleccionada('');
            }}
            margin="normal"
          >
            {organizaciones.map((org) => (
              <MenuItem key={org.id} value={org.nombre}>
                {org.nombre}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Sucursal"
            variant="outlined"
            fullWidth
            value={sucursalSeleccionada}
            onChange={(e) => handleInputChange(e, setSucursalSeleccionada)}
            margin="normal"
            disabled={!organizacionSeleccionada}
          >
            {sucursalesFiltradas().map((suc) => (
              <MenuItem key={suc.id} value={suc.nombre}>
                {suc.nombre}
              </MenuItem>
            ))}
          </TextField>
          {sucursalSeleccionada && (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Correo Electrónico"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
                margin="normal"
                error={!!errorEmail}
                helperText={errorEmail}
              />
              <Button type="submit" variant="contained" color="primary">
                {editandoId !== null ? 'Guardar Edición' : 'Agregar'}
              </Button>
            </form>
          )}
        </Grid>
        <Grid item xs={12}>
          {renderTablaCorreos()}
        </Grid>
      </Grid>
    </Container>
  );
};

export default DistribucionCorreo;
