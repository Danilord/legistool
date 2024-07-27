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
  Switch,
  FormControlLabel,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { Delete, Edit, FileCopy, ExpandMore } from '@mui/icons-material';
import AutocompleteGrouped from '../components/AutocompleteGrouped';

const Contactos = () => {
  const [primerNombre, setPrimerNombre] = useState('');
  const [segundoNombre, setSegundoNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [enabled, setEnabled] = useState(false); // Estado para el switch de activo/inactivo
  const [sucursal, setSucursal] = useState(null); // Asegúrate de inicializar como null para el Autocomplete
  const [contactos, setContactos] = useState([]);
  const [errorPrimerNombre, setErrorPrimerNombre] = useState('');
  const [errorCorreo, setErrorCorreo] = useState('');
  const [errorTelefono, setErrorTelefono] = useState('');
  const [errorSucursal, setErrorSucursal] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda

  const organizaciones = [
    {
      nombre: 'Organización 1',
      elementos: ['Sucursal 1-1', 'Sucursal 1-2'],
    },
    {
      nombre: 'Organización 2',
      elementos: ['Sucursal 2-1', 'Sucursal 2-2'],
    },
    {
      nombre: 'Organización 3',
      elementos: ['Sucursal 3-1', 'Sucursal 3-2'],
    },
  ];
  

  const handleInputChange = (event, setter, setError) => {
    const { value, name } = event.target;
    setter(value);
    if (setError) {
      if (value.trim() === '') {
        setError(`El campo ${name} es requerido`);
      } else {
        setError('');
      }
    }
  };

  const handleCorreoChange = (event) => {
    const value = event.target.value;
    setCorreo(value);
    if (value.trim() !== '' && !validateEmail(value)) {
      setErrorCorreo('Formato de correo inválido');
    } else {
      setErrorCorreo('');
    }
  };

  const validateEmail = (email) => {
    // Expresión regular para validar formato de correo electrónico
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar campos requeridos
    let valid = true;

    if (primerNombre.trim() === '') {
      setErrorPrimerNombre('El primer nombre es requerido');
      valid = false;
    }

    if (correo.trim() === '' || !validateEmail(correo)) {
      setErrorCorreo('El correo es requerido y debe tener un formato válido');
      valid = false;
    }

    if (telefono.trim() === '') {
      setErrorTelefono('El teléfono es requerido');
      valid = false;
    } else {
      setErrorTelefono('');
    }

    if (!sucursal) {
      setErrorSucursal('Debe seleccionar una sucursal');
      valid = false;
    } else {
      setErrorSucursal('');
    }

    if (!valid) {
      return;
    }

    const nuevoContacto = {
      id: editandoId !== null ? editandoId : contactos.length + 1,
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      correo,
      telefono,
      enabled,
      sucursal: sucursal?.elemento || '', // Utiliza el nombre de la sucursal seleccionado
    };

    if (editandoId !== null) {
      const nuevosContactos = contactos.map((contacto) =>
        contacto.id === editandoId ? nuevoContacto : contacto
      );
      setContactos(nuevosContactos);
      setEditandoId(null);
    } else {
      setContactos([...contactos, nuevoContacto]);
    }

    // Limpiar los campos y errores
    setPrimerNombre('');
    setSegundoNombre('');
    setPrimerApellido('');
    setSegundoApellido('');
    setCorreo('');
    setTelefono('');
    setEnabled(false);
    setSucursal(null);
    setErrorPrimerNombre('');
    setErrorCorreo('');
    setErrorTelefono('');
    setErrorSucursal('');
  };

  const handleDelete = (id) => {
    setContactos(contactos.filter((contacto) => contacto.id !== id));
  };

//   const handleCopy = (contacto) => {
//     setPrimerNombre(contacto.primerNombre);
//     setSegundoNombre(contacto.segundoNombre);
//     setPrimerApellido(contacto.primerApellido);
//     setSegundoApellido(contacto.segundoApellido);
//     setCorreo(contacto.correo);
//     setTelefono(contacto.telefono);
//     setEnabled(contacto.enabled);
    
//     // Encontrar la organización y sucursal correctas
//     const organizacionEncontrada = organizaciones.find(organizacion =>
//       organizacion.sucursales.includes(contacto.sucursal)
//     );
  
//     setSucursal(organizacionEncontrada
//       ? { grupo: organizacionEncontrada, elemento: contacto.sucursal }
//       : null);
//   };
  const handleCopy = (contacto) => {
    setPrimerNombre(contacto.primerNombre);
    setSegundoNombre(contacto.segundoNombre);
    setPrimerApellido(contacto.primerApellido);
    setSegundoApellido(contacto.segundoApellido);
    setCorreo(contacto.correo);
    setTelefono(contacto.telefono);
    setEnabled(contacto.enabled);
    
    // Encontrar la organización y sucursal correctas
    const organizacionEncontrada = organizaciones.find(organizacion =>
      organizacion.elementos.includes(contacto.sucursal)
    );
  
    setSucursal(organizacionEncontrada
      ? { grupo: organizacionEncontrada, elemento: contacto.sucursal }
      : null);
  };

//   const handleEdit = (id) => {
//     const contactoEdit = contactos.find((contacto) => contacto.id === id);
//     if (contactoEdit) {
//       setPrimerNombre(contactoEdit.primerNombre);
//       setSegundoNombre(contactoEdit.segundoNombre);
//       setPrimerApellido(contactoEdit.primerApellido);
//       setSegundoApellido(contactoEdit.segundoApellido);
//       setCorreo(contactoEdit.correo);
//       setTelefono(contactoEdit.telefono);
//       setEnabled(contactoEdit.enabled);
  
//       // Encontrar la organización y sucursal correctas
//       const organizacionEncontrada = organizaciones.find(organizacion =>
//         organizacion.sucursales.includes(contactoEdit.sucursal)
//       );
  
//       setSucursal(organizacionEncontrada
//         ? { grupo: organizacionEncontrada, elemento: contactoEdit.sucursal }
//         : null);
//       setEditandoId(id);
//     }
//   };

    const handleEdit = (id) => {
        const contactoEdit = contactos.find((contacto) => contacto.id === id);
        if (contactoEdit) {
            setPrimerNombre(contactoEdit.primerNombre);
            setSegundoNombre(contactoEdit.segundoNombre);
            setPrimerApellido(contactoEdit.primerApellido);
            setSegundoApellido(contactoEdit.segundoApellido);
            setCorreo(contactoEdit.correo);
            setTelefono(contactoEdit.telefono);
            setEnabled(contactoEdit.enabled);

            // Encontrar la organización y sucursal correctas
            const organizacionEncontrada = organizaciones.find(organizacion =>
            organizacion.elementos.includes(contactoEdit.sucursal)
            );

            setSucursal(organizacionEncontrada
            ? { grupo: organizacionEncontrada, elemento: contactoEdit.sucursal }
            : null);
            setEditandoId(id);
        }
    };

  return (
    <Container style={{ marginTop: '1em', marginLeft: 0 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Contactos
      </Typography>

      {/* Accordion para el formulario */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Formulario de Contacto</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Primer Nombre"
                  variant="outlined"
                  fullWidth
                  value={primerNombre}
                  onChange={(e) =>
                    handleInputChange(e, setPrimerNombre, setErrorPrimerNombre)
                  }
                  margin="dense"
                  error={!!errorPrimerNombre}
                  helperText={errorPrimerNombre}
                  required
                  name="Primer Nombre"
                />
                <TextField
                  label="Segundo Nombre"
                  variant="outlined"
                  fullWidth
                  value={segundoNombre}
                  onChange={(e) =>
                    handleInputChange(e, setSegundoNombre, () => {})
                  }
                  margin="dense"
                />
                <TextField
                  label="Teléfono"
                  variant="outlined"
                  fullWidth
                  value={telefono}
                  onChange={(e) =>
                    handleInputChange(e, setTelefono, setErrorTelefono)
                  }
                  margin="dense"
                  error={!!errorTelefono}
                  helperText={errorTelefono}
                  required
                  name="Teléfono"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={enabled}
                      onChange={(e) => setEnabled(e.target.checked)}
                    />
                  }
                  label="Activo"
                  style={{ marginTop: '1em', marginLeft: '1em' }}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Primer Apellido"
                  variant="outlined"
                  fullWidth
                  value={primerApellido}
                  onChange={(e) =>
                    handleInputChange(e, setPrimerApellido, () => {})
                  }
                  margin="dense"
                  name="Primer Apellido"
                />
                <TextField
                  label="Segundo Apellido"
                  variant="outlined"
                  fullWidth
                  value={segundoApellido}
                  onChange={(e) =>
                    handleInputChange(e, setSegundoApellido, () => {})
                  }
                  margin="dense"
                />
                <TextField
                  label="Correo"
                  variant="outlined"
                  fullWidth
                  value={correo}
                  onChange={handleCorreoChange}
                  margin="dense"
                  error={!!errorCorreo}
                  helperText={errorCorreo}
                  required
                  name="Correo"
                />
                <AutocompleteGrouped
                  grupos={organizaciones}
                  getGrupoLabel={(organizacion) => organizacion.nombre}
                  getElementos={(organizacion) => organizacion.elementos}
                  getElementoLabel={(sucursal) => sucursal}
                  value={sucursal}
                  onChange={(event, newValue) => setSucursal(newValue)}
                  label="Sucursal"
                  error={!!errorSucursal}
                  helperText={errorSucursal}
                  margin="dense"
                />
              </Grid>
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '1em' }}
              >
                {editandoId !== null ? 'Guardar cambios' : 'Agregar'}
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>

      {/* Tabla de contactos */}
      <Grid container spacing={2} style={{ marginTop: '1em' }}>
        <Grid item xs={12}>
          <TextField
            label="Buscar"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            margin="dense"
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Primer Nombre</TableCell>
                  <TableCell>Segundo Nombre</TableCell>
                  <TableCell>Primer Apellido</TableCell>
                  <TableCell>Segundo Apellido</TableCell>
                  <TableCell>Correo</TableCell>
                  <TableCell>Teléfono</TableCell>
                  <TableCell>Activo</TableCell>
                  <TableCell>Sucursal</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contactos
                  .filter((contacto) =>
                    contacto.primerNombre
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    contacto.segundoNombre
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    contacto.primerApellido
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    contacto.segundoApellido
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    contacto.correo
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    contacto.telefono
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    contacto.sucursal
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((contacto) => (
                    <TableRow key={contacto.id}>
                      <TableCell component="th" scope="row">
                        {contacto.primerNombre}
                      </TableCell>
                      <TableCell>{contacto.segundoNombre}</TableCell>
                      <TableCell>{contacto.primerApellido}</TableCell>
                      <TableCell>{contacto.segundoApellido}</TableCell>
                      <TableCell>{contacto.correo}</TableCell>
                      <TableCell>{contacto.telefono}</TableCell>
                      <TableCell>{contacto.enabled ? 'Sí' : 'No'}</TableCell>
                      <TableCell>{contacto.sucursal}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleEdit(contacto.id)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleCopy(contacto)}>
                          <FileCopy />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(contacto.id)}>
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

export default Contactos;
