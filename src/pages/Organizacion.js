import React, { useState, useEffect } from 'react';
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Delete, Edit, FileCopy } from '@mui/icons-material';

const Organizacion = () => {
  const [nombre, setNombre] = useState('');
  const [cedulaJuridica, setCedulaJuridica] = useState(''); // Nuevo estado para Cédula Jurídica
  const [razonSocial, setRazonSocial] = useState(''); // Nuevo estado para Razón Social
  const [descripcion, setDescripcion] = useState(''); // Nuevo estado para Descripción
  const [organizaciones, setOrganizaciones] = useState([]);
  const [paises, setPaises] = useState([]); // Estado para almacenar la lista de países
  const [selectedPais, setSelectedPais] = useState(''); // Estado para almacenar el país seleccionado
  const [errorNombre, setErrorNombre] = useState('');
  const [errorPais, setErrorPais] = useState('');
  const [errorCedula, setErrorCedula] = useState(''); // Estado de error para Cédula Jurídica
  const [editandoId, setEditandoId] = useState(null); // Estado para almacenar el ID de la organización en edición

  // Ejemplo de lista de países
  const listaPaises = [
    { id: 1, nombre: 'País 1' },
    { id: 2, nombre: 'País 2' },
    { id: 3, nombre: 'País 3' },
  ];

  // Simular carga de países (normalmente se cargarían desde una API o base de datos)
  useEffect(() => {
    setPaises(listaPaises);
  }, []);

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let hasError = false;

    if (nombre.trim() === '') {
      setErrorNombre('El nombre es requerido');
      hasError = true;
    } else {
      setErrorNombre('');
    }

    if (selectedPais.trim() === '') {
      setErrorPais('El país es requerido');
      hasError = true;
    } else {
      setErrorPais('');
    }

    if (cedulaJuridica.trim() === '') {
      setErrorCedula('La cédula jurídica es requerida');
      hasError = true;
    } else {
      setErrorCedula('');
    }

    if (hasError) {
      return;
    }

    // Verificar si el nombre ya existe en la lista de organizaciones
    const nombreExistente = organizaciones.some(
      (org) => org.nombre === nombre && org.id !== editandoId
    );
    if (nombreExistente) {
      setErrorNombre('El nombre ya está en uso');
      return;
    }

    // Limpiar los errores si pasa la validación
    setErrorNombre('');
    setErrorPais('');
    setErrorCedula('');

    if (editandoId !== null) {
      // Editar organización existente
      const nuevasOrganizaciones = organizaciones.map((org) =>
        org.id === editandoId
          ? { ...org, nombre, pais: selectedPais, cedulaJuridica, razonSocial, descripcion }
          : org
      );
      setOrganizaciones(nuevasOrganizaciones);
      setEditandoId(null); // Finalizar modo edición
    } else {
      // Agregar nueva organización
      setOrganizaciones([
        ...organizaciones,
        {
          id: organizaciones.length + 1,
          nombre,
          pais: selectedPais,
          cedulaJuridica,
          razonSocial,
          descripcion,
        },
      ]);
    }

    // Limpiar los campos después de guardar
    setNombre('');
    setCedulaJuridica('');
    setRazonSocial('');
    setDescripcion('');
    setSelectedPais('');
  };

  const handleDelete = (id) => {
    setOrganizaciones(organizaciones.filter((org) => org.id !== id));
  };

  const handleCopy = (nombre) => {
    setNombre(nombre);
  };

  const handleEdit = (id) => {
    const organizacionEdit = organizaciones.find((org) => org.id === id);
    if (organizacionEdit) {
      setNombre(organizacionEdit.nombre);
      setCedulaJuridica(organizacionEdit.cedulaJuridica);
      setRazonSocial(organizacionEdit.razonSocial);
      setDescripcion(organizacionEdit.descripcion);
      setSelectedPais(organizacionEdit.pais);
      setEditandoId(id);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '1em', marginLeft: 0 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Organización
      </Typography>
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
          required
        />
        <TextField
          label="Cédula Jurídica"
          variant="outlined"
          fullWidth
          value={cedulaJuridica}
          onChange={handleInputChange(setCedulaJuridica)}
          margin="normal"
          error={!!errorCedula}
          helperText={errorCedula}
          required
        />
        <TextField
          label="Razón Social"
          variant="outlined"
          fullWidth
          value={razonSocial}
          onChange={handleInputChange(setRazonSocial)}
          margin="normal"
        />
        <TextField
          label="Descripción"
          variant="outlined"
          fullWidth
          value={descripcion}
          onChange={handleInputChange(setDescripcion)}
          margin="normal"
          multiline
          rows={4}
        />
        <FormControl fullWidth margin="normal" required error={!!errorPais}>
          <InputLabel id="select-pais-label">País</InputLabel>
          <Select
            labelId="select-pais-label"
            id="select-pais"
            value={selectedPais}
            onChange={handleInputChange(setSelectedPais)}
            variant="outlined"
          >
            <MenuItem value="">Seleccione un país</MenuItem>
            {paises.map((pais) => (
              <MenuItem key={pais.id} value={pais.nombre}>
                {pais.nombre}
              </MenuItem>
            ))}
          </Select>
          {errorPais && (
            <Typography variant="caption" color="error">
              {errorPais}
            </Typography>
          )}
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          {editandoId !== null ? 'Guardar Edición' : 'Guardar'}
        </Button>
      </form>

      <TableContainer component={Paper} style={{ marginTop: '2em' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Cédula Jurídica</TableCell>
              <TableCell>Razón Social</TableCell>
              <TableCell>País</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organizaciones.map((org) => (
              <TableRow key={org.id}>
                <TableCell component="th" scope="row">{org.nombre}</TableCell>
                <TableCell>{org.cedulaJuridica}</TableCell>
                <TableCell>{org.razonSocial}</TableCell>
                <TableCell>{org.pais}</TableCell>
                <TableCell>{org.descripcion}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(org.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleCopy(org.nombre)}>
                    <FileCopy />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(org.id)}>
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

export default Organizacion;
