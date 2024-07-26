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
} from '@mui/material';
import { Delete, Edit, FileCopy } from '@mui/icons-material';

const Country = () => {
  const [nombre, setNombre] = useState('');
  const [paises, setPaises] = useState([]);
  const [errorNombre, setErrorNombre] = useState('');
  const [editandoId, setEditandoId] = useState(null); // Estado para almacenar el ID del país en edición

  const handleInputChange = (event) => {
    setNombre(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (nombre.trim() === '') {
      setErrorNombre('El nombre es requerido');
      return;
    }

    // Verificar si el nombre ya existe en la lista de países
    const nombreExistente = paises.some((pais) => pais.nombre === nombre && pais.id !== editandoId);
    if (nombreExistente) {
      setErrorNombre('El nombre ya está en uso');
      return;
    }

    // Limpiar el error si pasa la validación
    setErrorNombre('');

    if (editandoId !== null) {
      // Editar país existente
      const nuevosPaises = paises.map((pais) =>
        pais.id === editandoId ? { ...pais, nombre } : pais
      );
      setPaises(nuevosPaises);
      setEditandoId(null); // Finalizar modo edición
    } else {
      // Agregar nuevo país
      setPaises([...paises, { id: paises.length + 1, nombre }]);
    }

    setNombre('');
  };

  const handleDelete = (id) => {
    setPaises(paises.filter((pais) => pais.id !== id));
  };

  const handleCopy = (nombre) => {
    setNombre(nombre);
  };

  const handleEdit = (id) => {
    const paisEdit = paises.find((pais) => pais.id === id);
    if (paisEdit) {
      setNombre(paisEdit.nombre);
      setEditandoId(id);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '1em', marginLeft: 0 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        País
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          value={nombre}
          onChange={handleInputChange}
          margin="normal"
          error={!!errorNombre}
          helperText={errorNombre}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          {editandoId !== null ? 'Guardar Edición' : 'Guardar'}
        </Button>
      </form>

      <TableContainer component={Paper} style={{ marginTop: '2em' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paises.map((pais) => (
              <TableRow key={pais.id}>
                <TableCell component="th" scope="row">
                  {pais.nombre}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(pais.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleCopy(pais.nombre)}>
                    <FileCopy />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(pais.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Country;
