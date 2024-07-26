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
  Grid
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const Permisos = () => {
  const [numero, setNumero] = useState('');
  const [nombre, setNombre] = useState('');
  const [permisos, setPermisos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [errorNumero, setErrorNumero] = useState('');
  const [errorNombre, setErrorNombre] = useState('');

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (numero.trim() === '') {
      setErrorNumero('El número es requerido');
      return;
    }

    if (nombre.trim() === '') {
      setErrorNombre('El nombre es requerido');
      return;
    }

    setErrorNumero('');
    setErrorNombre('');

    const nuevoPermiso = {
      id: permisos.length + 1,
      numero,
      nombre
    };

    if (editandoId !== null) {
      const nuevosPermisos = permisos.map(permiso =>
        permiso.id === editandoId ? { ...permiso, numero, nombre } : permiso
      );
      setPermisos(nuevosPermisos);
      setEditandoId(null);
    } else {
      setPermisos([...permisos, nuevoPermiso]);
    }

    setNumero('');
    setNombre('');
  };

  const handleDelete = (id) => {
    const nuevosPermisos = permisos.filter(permiso => permiso.id !== id);
    setPermisos(nuevosPermisos);
  };

  const handleEdit = (id) => {
    const permisoEdit = permisos.find(permiso => permiso.id === id);
    if (permisoEdit) {
      setNumero(permisoEdit.numero);
      setNombre(permisoEdit.nombre);
      setEditandoId(id);
    }
  };

  return (
    <Container style={{ marginTop: '1em' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Archivo de Permisos
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Número"
              variant="outlined"
              fullWidth
              value={numero}
              onChange={handleInputChange(setNumero)}
              margin="normal"
              error={!!errorNumero}
              helperText={errorNumero}
            />
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              value={nombre}
              onChange={handleInputChange(setNombre)}
              margin="normal"
              error={!!errorNombre}
              helperText={errorNombre}
            />
            <Button type="submit" variant="contained" color="primary">
              {editandoId !== null ? 'Guardar Edición' : 'Agregar'}
            </Button>
          </form>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper} style={{ marginTop: '2em', overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Número</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {permisos.map((permiso) => (
                  <TableRow key={permiso.id}>
                    <TableCell component="th" scope="row">
                      {permiso.numero}
                    </TableCell>
                    <TableCell>{permiso.nombre}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEdit(permiso.id)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(permiso.id)}>
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

export default Permisos;
