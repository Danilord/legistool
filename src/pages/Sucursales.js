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
  Grid,
} from '@mui/material';
import { Delete, Edit, FileCopy } from '@mui/icons-material';
import { useAuth } from '../App';

const Sucursales = () => {
  const { user } = useAuth();
  const [nombre, setNombre] = useState('');
  const [organizacion, setOrganizacion] = useState('');
  const [estado, setEstado] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [legal_Id, setlegal_Id] = useState('');
  const [sucursales, setSucursales] = useState([]);
  const [errorNombre, setErrorNombre] = useState('');
  const [errorOrganizacion, setErrorOrganizacion] = useState('');

  const [editandoId, setEditandoId] = useState(null);

  // Datos de ejemplo de organizaciones
  const organizaciones = [
    { id: 1, nombre: 'Organización 1' },
    { id: 2, nombre: 'Organización 2' },
    // Agrega más organizaciones según sea necesario
  ];

  const handleInputChange = (event, setter, setError) => {
    const value = event.target.value;
    setter(value);
    if (value.trim() === '') {
      setError(`El ${event.target.name} es requerido`);
    } else {
      setError('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar si el nombre ya existe en las sucursales existentes
    const nombreExistente = sucursales.some(
      (suc) => suc.nombre === nombre && suc.id !== editandoId
    );

    if (nombre.trim() === '') {
      setErrorNombre('El nombre es requerido');
      return;
    } else if (nombreExistente) {
      setErrorNombre('El nombre ya está en uso');
      return;
    }

    setErrorNombre('');

    const nuevaSucursal = {
      id: editandoId !== null ? editandoId : sucursales.length + 1,
      nombre,
      organizacion,
      estado,
      ciudad,
      telefono,
      legal_Id,
    };

    if (editandoId !== null) {
      const nuevasSucursales = sucursales.map((suc) =>
        suc.id === editandoId ? nuevaSucursal : suc
      );
      setSucursales(nuevasSucursales);
      setEditandoId(null);
    } else {
      setSucursales([...sucursales, nuevaSucursal]);
    }

    setNombre('');
    setOrganizacion('');
    setEstado('');
    setCiudad('');
    setTelefono('');
    setlegal_Id('');
  };

  const handleDelete = (id) => {
    setSucursales(sucursales.filter((suc) => suc.id !== id));
  };

  const handleCopy = (sucursal) => {
    setNombre(sucursal.nombre);
    setOrganizacion(sucursal.organizacion);
    setEstado(sucursal.estado);
    setCiudad(sucursal.ciudad);
    setTelefono(sucursal.telefono);
    setlegal_Id(sucursal.legal_Id);
  };

  const handleEdit = (id) => {
    const sucursalEdit = sucursales.find((suc) => suc.id === id);
    if (sucursalEdit) {
      setNombre(sucursalEdit.nombre);
      setOrganizacion(sucursalEdit.organizacion);
      setEstado(sucursalEdit.estado);
      setCiudad(sucursalEdit.ciudad);
      setTelefono(sucursalEdit.telefono);
      setlegal_Id(sucursalEdit.legal_Id);
      setEditandoId(id);
    }
  };

  return (
    <Container style={{ marginTop: '1em', marginLeft: 0 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sucursales
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              value={nombre}
              onChange={(e) =>
                handleInputChange(e, setNombre, setErrorNombre)
              }
              margin="normal"
              error={!!errorNombre}
              helperText={errorNombre}
              required
              name="Nombre"
            />
            <TextField
              select
              label="Organización"
              variant="outlined"
              fullWidth
              value={organizacion}
              onChange={(e) =>
                handleInputChange(e, setOrganizacion, setErrorOrganizacion)
              }
              margin="normal"
              error={!!errorOrganizacion}
              helperText={errorOrganizacion}
              required
              name="Organización"
            >
              {organizaciones.map((org) => (
                <MenuItem key={org.id} value={org.nombre}>
                  {org.nombre}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Estado"
              variant="outlined"
              fullWidth
              value={estado}
              onChange={(e) => handleInputChange(e, setEstado, () => {})}
              margin="normal"
            />
            <TextField
              label="Ciudad"
              variant="outlined"
              fullWidth
              value={ciudad}
              onChange={(e) => handleInputChange(e, setCiudad, () => {})}
              margin="normal"
            />
            <TextField
              label="Teléfono"
              variant="outlined"
              fullWidth
              value={telefono}
              onChange={(e) => handleInputChange(e, setTelefono, () => {})}
              margin="normal"
            />
            <TextField
              label="ID Legal"
              variant="outlined"
              fullWidth
              value={legal_Id}
              onChange={(e) => handleInputChange(e, setlegal_Id, () => {})}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              {editandoId !== null ? 'Guardar Edición' : 'Guardar'}
            </Button>
          </form>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper} style={{ marginTop: '2em', overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Organización</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Ciudad</TableCell>
                  <TableCell>Teléfono</TableCell>
                  <TableCell>ID Legal</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sucursales.map((suc) => (
                  <TableRow key={suc.id}>
                    <TableCell component="th" scope="row">
                      {suc.nombre}
                    </TableCell>
                    <TableCell>{suc.organizacion}</TableCell>
                    <TableCell>{suc.estado}</TableCell>
                    <TableCell>{suc.ciudad}</TableCell>
                    <TableCell>{suc.telefono}</TableCell>
                    <TableCell>{suc.legal_Id}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEdit(suc.id)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleCopy(suc)}>
                        <FileCopy />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(suc.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Sucursales;
