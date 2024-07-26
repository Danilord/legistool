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
import { Delete, Edit, ContentCopy } from '@mui/icons-material';

const TipoDocumento = () => {
  const [nombre, setNombre] = useState('');
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [errorNombre, setErrorNombre] = useState('');

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (nombre.trim() === '') {
      setErrorNombre('El nombre es requerido');
      return;
    }

    setErrorNombre('');

    const nuevoTipoDocumento = {
      id: tiposDocumento.length + 1,
      nombre
    };

    if (editandoId !== null) {
      const nuevosTiposDocumento = tiposDocumento.map(tipo =>
        tipo.id === editandoId ? { ...tipo, nombre } : tipo
      );
      setTiposDocumento(nuevosTiposDocumento);
      setEditandoId(null);
    } else {
      setTiposDocumento([...tiposDocumento, nuevoTipoDocumento]);
    }

    setNombre('');
  };

  const handleDelete = (id) => {
    const nuevosTiposDocumento = tiposDocumento.filter(tipo => tipo.id !== id);
    setTiposDocumento(nuevosTiposDocumento);
  };

  const handleEdit = (id) => {
    const tipoEdit = tiposDocumento.find(tipo => tipo.id === id);
    if (tipoEdit) {
      setNombre(tipoEdit.nombre);
      setEditandoId(id);
    }
  };

  const handleCopy = (id) => {
    const tipoToCopy = tiposDocumento.find(tipo => tipo.id === id);
    if (tipoToCopy) {
      const nuevoTipoDocumento = {
        id: tiposDocumento.length + 1, // Generamos un nuevo ID
        nombre: tipoToCopy.nombre
      };
      setTiposDocumento([...tiposDocumento, nuevoTipoDocumento]);
    }
  };

  return (
    <Container style={{ marginTop: '1em' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tipos de Documento
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
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
                  <TableCell>Nombre</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tiposDocumento.map((tipo) => (
                  <TableRow key={tipo.id}>
                    <TableCell component="th" scope="row">
                      {tipo.nombre}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEdit(tipo.id)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(tipo.id)}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleCopy(tipo.id)}>
                        <ContentCopy />
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

export default TipoDocumento;
