import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Delete, Edit, FileCopy } from '@mui/icons-material';

const Contactos = () => {
  const [primerNombre, setPrimerNombre] = useState('');
  const [segundoNombre, setSegundoNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [estado, setEstado] = useState('');
  const [sucursal, setSucursal] = useState('');
  const [contactos, setContactos] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Validar los campos antes de guardar
    if (
      !primerNombre ||
      !primerApellido ||
      !correo ||
      !telefono ||
      !estado ||
      !sucursal
    ) {
      alert('Todos los campos son requeridos.');
      return;
    }

    // Guardar el contacto
    const nuevoContacto = {
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      correo,
      telefono,
      estado,
      sucursal,
    };
    setContactos([...contactos, nuevoContacto]);

    // Limpiar los campos después de guardar
    setPrimerNombre('');
    setSegundoNombre('');
    setPrimerApellido('');
    setSegundoApellido('');
    setCorreo('');
    setTelefono('');
    setEstado('');
    setSucursal('');
  };

  const handleDelete = (index) => {
    const nuevosContactos = [...contactos];
    nuevosContactos.splice(index, 1);
    setContactos(nuevosContactos);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '1em', marginLeft: 0 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Primer Nombre"
          variant="outlined"
          fullWidth
          size="small"
          value={primerNombre}
          onChange={(e) => setPrimerNombre(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Segundo Nombre"
          variant="outlined"
          fullWidth
          size="small"
          value={segundoNombre}
          onChange={(e) => setSegundoNombre(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Primer Apellido"
          variant="outlined"
          fullWidth
          size="small"
          value={primerApellido}
          onChange={(e) => setPrimerApellido(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Segundo Apellido"
          variant="outlined"
          fullWidth
          size="small"
          value={segundoApellido}
          onChange={(e) => setSegundoApellido(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Correo"
          variant="outlined"
          fullWidth
          size="small"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Teléfono"
          variant="outlined"
          fullWidth
          size="small"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          margin="normal"
          required
        />
        <FormControl variant="outlined" fullWidth size="small" margin="normal" required>
          <InputLabel>Estado</InputLabel>
          <Select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            label="Estado"
          >
            <MenuItem value="activo">Activo</MenuItem>
            <MenuItem value="inactivo">Inactivo</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" fullWidth size="small" margin="normal" required>
          <InputLabel>Sucursal</InputLabel>
          <Select
            value={sucursal}
            onChange={(e) => setSucursal(e.target.value)}
            label="Sucursal"
          >
            <MenuItem value="sucursal1">Sucursal 1</MenuItem>
            <MenuItem value="sucursal2">Sucursal 2</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth size="large">
          Guardar
        </Button>
      </form>

      <TableContainer component={Paper} style={{ marginTop: '2em' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Primer Nombre</TableCell>
              <TableCell>Segundo Nombre</TableCell>
              <TableCell>Primer Apellido</TableCell>
              <TableCell>Segundo Apellido</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Sucursal</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contactos.map((contacto, index) => (
              <TableRow key={index}>
                <TableCell>{contacto.primerNombre}</TableCell>
                <TableCell>{contacto.segundoNombre}</TableCell>
                <TableCell>{contacto.primerApellido}</TableCell>
                <TableCell>{contacto.segundoApellido}</TableCell>
                <TableCell>{contacto.correo}</TableCell>
                <TableCell>{contacto.telefono}</TableCell>
                <TableCell>{contacto.estado}</TableCell>
                <TableCell>{contacto.sucursal}</TableCell>
                <TableCell>
                  <IconButton>
                    <Edit />
                  </IconButton>
                  <IconButton>
                    <FileCopy />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)}>
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

export default Contactos;
