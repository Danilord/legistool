import React, { useState } from 'react';
import {
  Container,
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
  TextField,
} from '@mui/material';
import { Delete, Edit, FileCopy, ExpandMore } from '@mui/icons-material';
import AutocompleteGrouped from '../components/AutocompleteGrouped';

const Checklist = () => {
  const [requerimiento, setRequerimiento] = useState(null);
  const [sucursal, setSucursal] = useState(null);
  const [enabled, setEnabled] = useState(false);
  const [checklists, setChecklists] = useState([]);
  const [errorRequerimiento, setErrorRequerimiento] = useState('');
  const [errorSucursal, setErrorSucursal] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const requerimientos = [
    {
      nombre: 'Categoría 1',
      elementos: ['Nombre del requerimiento Cat 1-1', 'Nombre del requerimiento Cat 1-2'],
    },
    {
      nombre: 'Categoría 2',
      elementos: ['Nombre del requerimiento Cat 2-1', 'Nombre del requerimiento Cat 2-2'],
    },
    {
      nombre: 'Categoría 3',
      elementos: ['Nombre del requerimiento Cat 3-1', 'Nombre del requerimiento Cat 3-2'],
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    let valid = true;

    if (!requerimiento) {
      setErrorRequerimiento('Debe seleccionar un requerimiento');
      valid = false;
    } else {
      setErrorRequerimiento('');
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

    const nuevoChecklist = {
      id: editandoId !== null ? editandoId : checklists.length + 1,
      requerimiento: requerimiento?.elemento || '',
      sucursal: sucursal?.elemento || '',
      enabled,
    };

    if (editandoId !== null) {
      const nuevosChecklists = checklists.map((checklist) =>
        checklist.id === editandoId ? nuevoChecklist : checklist
      );
      setChecklists(nuevosChecklists);
      setEditandoId(null);
    } else {
      setChecklists([...checklists, nuevoChecklist]);
    }

    setRequerimiento(null);
    setSucursal(null);
    setEnabled(false);
    setErrorRequerimiento('');
    setErrorSucursal('');
  };

  const handleDelete = (id) => {
    setChecklists(checklists.filter((checklist) => checklist.id !== id));
  };

  const handleCopy = (checklist) => {
    // Encuentra la organización correcta
    const organizacionEncontrada = organizaciones.find(organizacion =>
      organizacion.elementos.includes(checklist.sucursal)
    );
  
    // Encuentra el requerimiento correcto
    const requerimientoEncontrado = requerimientos.find(requerimiento =>
      requerimiento.elementos.includes(checklist.requerimiento)
    );
  
    // Actualiza los estados con los valores encontrados
    setSucursal(organizacionEncontrada
      ? { grupo: organizacionEncontrada, elemento: checklist.sucursal }
      : null);
  
    setRequerimiento(requerimientoEncontrado
      ? { grupo: requerimientoEncontrado, elemento: checklist.requerimiento }
      : null);
  
    setEnabled(checklist.enabled);
  
    // Se establece el id de edición a null para indicar que se está creando un nuevo checklist
    setEditandoId(null);
  };
  
  

  const handleEdit = (id) => {
    const checklistEdit = checklists.find((checklist) => checklist.id === id);
    
    if (checklistEdit) {
      const requerimientoEncontrado = requerimientos.find((requerimiento) =>
        requerimiento.elementos.includes(checklistEdit.requerimiento)
      );
      
      const organizacionEncontrada = organizaciones.find((organizacion) =>
        organizacion.elementos.includes(checklistEdit.sucursal)
      );
  
      setRequerimiento(requerimientoEncontrado
        ? { grupo: requerimientoEncontrado, elemento: checklistEdit.requerimiento }
        : null);
  
      setSucursal(organizacionEncontrada
        ? { grupo: organizacionEncontrada, elemento: checklistEdit.sucursal }
        : null);
  
      setEnabled(checklistEdit.enabled);
      setEditandoId(id);
    }
  };

  return (
    <Container style={{ marginTop: '1em', marginLeft: 0 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Checklist
      </Typography>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Formulario de Checklist</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <AutocompleteGrouped
                  grupos={requerimientos}
                  getGrupoLabel={(requerimiento) => requerimiento?.nombre || ''}
                  getElementos={(requerimiento) => requerimiento?.elementos || []}
                  getElementoLabel={(elemento) => elemento || ''}
                  value={requerimiento}
                  onChange={(event, newValue) => setRequerimiento(newValue)}
                  label="Requerimiento"
                  error={!!errorRequerimiento}
                  helperText={errorRequerimiento}
                  margin="dense"
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
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <AutocompleteGrouped
                  grupos={organizaciones}
                  getGrupoLabel={(organizacion) => organizacion?.nombre || ''}
                  getElementos={(organizacion) => organizacion?.elementos || []}
                  getElementoLabel={(sucursal) => sucursal || ''}
                  value={sucursal}
                  onChange={(event, newValue) => setSucursal(newValue)}
                  label="Sucursal"
                  error={!!errorSucursal}
                  helperText={errorSucursal}
                  margin="dense"
                />
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
              </Grid>
            </Grid>
          </form>
        </AccordionDetails>
      </Accordion>

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
                  <TableCell>Requerimiento</TableCell>
                  <TableCell>Activo</TableCell>
                  <TableCell>Sucursal</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {checklists
                  .filter((checklist) =>
                    checklist.requerimiento.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    checklist.sucursal.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((checklist) => (
                    <TableRow key={checklist.id}>
                      <TableCell component="th" scope="row">
                        {checklist.requerimiento}
                      </TableCell>
                      <TableCell>{checklist.enabled ? 'Sí' : 'No'}</TableCell>
                      <TableCell>{checklist.sucursal}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleEdit(checklist.id)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleCopy(checklist)}>
                          <FileCopy />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(checklist.id)}>
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

export default Checklist;
