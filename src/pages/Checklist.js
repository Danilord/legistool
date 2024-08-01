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
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Delete, Edit, FileCopy } from '@mui/icons-material';
import AutocompleteGrouped from '../components/AutocompleteGrouped';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import CancelIcon from '@mui/icons-material/CancelOutlined';

const Checklist = () => {
  const [requerimiento, setRequerimiento] = useState(null);
  const [sucursal, setSucursal] = useState(null);
  const [estado, setEstado] = useState('');
  const [periodo, setPeriodo] = useState(new Date().getFullYear());
  const [checklists, setChecklists] = useState([]);
  const [errorRequerimiento, setErrorRequerimiento] = useState('');
  const [errorSucursal, setErrorSucursal] = useState('');
  const [errorPeriodo, setErrorPeriodo] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState(''); // Nuevo filtro de categoría
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroPeriodo, setFiltroPeriodo] = useState('');

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
      nombre: 'Categoría 1 Tierra',
      elementos: ['Nombre del requerimiento Cat 1-1', 'Nombre del requerimiento Cat 1-2'],
    },
    {
      nombre: 'Categoría 2 Agua',
      elementos: ['Nombre del requerimiento Cat 2-1', 'Nombre del requerimiento Cat 2-2'],
    },
    {
      nombre: 'Categoría 3 Aire',
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

    if (!periodo || isNaN(periodo) || periodo < 1900 || periodo > new Date().getFullYear() + 1) {
      setErrorPeriodo('Debe ingresar un año válido');
      valid = false;
    } else {
      setErrorPeriodo('');
    }

    if (!valid) {
      return;
    }

    const nuevoChecklist = {
      id: editandoId !== null ? editandoId : checklists.length + 1,
      requerimiento: requerimiento?.elemento || '',
      sucursal: sucursal?.elemento || '',
      estado,
      periodo,
    };

    if (editandoId !== null) {
      // Editar elemento existente
      const nuevosChecklists = checklists.map((checklist) =>
        checklist.id === editandoId ? nuevoChecklist : checklist
      );
      setChecklists(nuevosChecklists);
      setEditandoId(null);
    } else {
      // Agregar nuevo elemento
      setChecklists([...checklists, nuevoChecklist]);
    }

    // Reiniciar el formulario
    setRequerimiento(null);
    setSucursal(null);
    setEstado('');
    setPeriodo(new Date().getFullYear());
    setErrorRequerimiento('');
    setErrorSucursal('');
    setErrorPeriodo('');

    // Log para depuración
    console.log("Nuevo checklist agregado:", nuevoChecklist);
    console.log("Estado actual de checklists:", checklists);
  };

  const handleDelete = (id) => {
    setChecklists(checklists.filter((checklist) => checklist.id !== id));
    console.log(`Checklist con id ${id} eliminado.`);
  };

  const handleCopy = (checklist) => {
    const organizacionEncontrada = organizaciones.find(organizacion =>
      organizacion.elementos.includes(checklist.sucursal)
    );

    const requerimientoEncontrado = requerimientos.find(requerimiento =>
      requerimiento.elementos.includes(checklist.requerimiento)
    );

    setSucursal(organizacionEncontrada
      ? { grupo: organizacionEncontrada, elemento: checklist.sucursal }
      : null);

    setRequerimiento(requerimientoEncontrado
      ? { grupo: requerimientoEncontrado, elemento: checklist.requerimiento }
      : null);

    setEstado(checklist.estado);
    setPeriodo(checklist.periodo);

    setEditandoId(null);

    console.log("Checklist copiado:", checklist);
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

      setEstado(checklistEdit.estado);
      setPeriodo(checklistEdit.periodo);
      setEditandoId(id);

      console.log("Editando checklist:", checklistEdit);
    }
  };

  const limpiarFiltros = () => {
    setSearchQuery('');
    setFiltroCategoria('');
    setFiltroEstado('');
    setFiltroPeriodo('');
  };

  return (
    <Container style={{ marginTop: '1em', marginLeft: 0 }}>
      <Typography variant="h4" component="h1" gutterBottom style={{ marginTop: '1em' }}>
        Checklist
      </Typography>

      <Accordion>
        <AccordionSummary>
          <Typography variant="h6">Formulario de Checklist</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
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
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Estado</InputLabel>
                  <Select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                  >
                    <MenuItem value="Cumple">
                      <CheckCircleIcon style={{ color: 'green' }} /> Cumple
                    </MenuItem>
                    <MenuItem value="Observacion">
                      <ErrorIcon style={{ color: 'orange' }} /> Observación
                    </MenuItem>
                    <MenuItem value="No Cumple">
                      <CancelIcon style={{ color: 'red' }} /> No Cumple
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Año"
                  type="number"
                  fullWidth
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                  error={!!errorPeriodo}
                  helperText={errorPeriodo}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '1em' }}
                  fullWidth
                >
                  {editandoId !== null ? 'Guardar Cambios' : 'Agregar'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </AccordionDetails>
      </Accordion>

      <Grid container spacing={2} alignItems="center" style={{ marginTop: '1em' }}>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth margin="dense">
            <InputLabel>Filtrar por Categoría</InputLabel>
            <Select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
            >
              <MenuItem value="">Todas</MenuItem>
              {requerimientos.map((categoria, index) => (
                <MenuItem key={index} value={categoria.nombre}>
                  {categoria.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <AutocompleteGrouped
            grupos={requerimientos}
            getGrupoLabel={(requerimiento) => requerimiento?.nombre || ''}
            getElementos={(requerimiento) => requerimiento?.elementos || []}
            getElementoLabel={(elemento) => elemento || ''}
            value={searchQuery}
            onChange={(event, newValue) => setSearchQuery(newValue)}
            label="Filtrar por Requerimiento"
            margin="dense"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth margin="dense">
            <InputLabel>Filtrar por Estado</InputLabel>
            <Select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="Cumple">Cumple</MenuItem>
              <MenuItem value="Observacion">Observación</MenuItem>
              <MenuItem value="No Cumple">No Cumple</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Filtrar por Periodo"
            type="number"
            fullWidth
            value={filtroPeriodo}
            onChange={(e) => setFiltroPeriodo(e.target.value)}
            margin="dense"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="flex-end" style={{ marginTop: '1em' }}>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            onClick={limpiarFiltros}
          >
            Limpiar Filtros
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h5" component="h2" style={{ marginTop: '1em', marginBottom: '1em' }}>
        Lista de Checklists
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Requerimiento</TableCell>
              <TableCell>Sucursal</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Periodo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requerimientos.map((categoria, index) => {
              const elementosFiltrados = checklists.filter((checklist) => {
                const filtroRequerimiento = !searchQuery || checklist.requerimiento.includes(searchQuery.elemento);
                const filtroEstadoAplicado = !filtroEstado || checklist.estado === filtroEstado;
                const filtroPeriodoAplicado = !filtroPeriodo || checklist.periodo.toString() === filtroPeriodo.toString();
                const filtroCategoriaAplicado = !filtroCategoria || categoria.nombre === filtroCategoria;

                return (
                  categoria.elementos.includes(checklist.requerimiento) &&
                  filtroRequerimiento &&
                  filtroEstadoAplicado &&
                  filtroPeriodoAplicado &&
                  filtroCategoriaAplicado
                );
              });

              if (elementosFiltrados.length === 0) {
                // Si no hay elementos filtrados en esta categoría, no mostramos la categoría
                return null;
              }

              return (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell colSpan={5} style={{ fontWeight: 'bold' }}>
                      {categoria.nombre}
                    </TableCell>
                  </TableRow>
                  {elementosFiltrados.map((checklist) => (
                    <TableRow key={checklist.id}>
                      <TableCell>{checklist.requerimiento}</TableCell>
                      <TableCell>{checklist.sucursal}</TableCell>
                      <TableCell>
                        {checklist.estado === 'Cumple' && (
                          <>
                            <CheckCircleIcon style={{ color: 'green', marginRight: '0.5em' }} />
                            Cumple
                          </>
                        )}
                        {checklist.estado === 'Observacion' && (
                          <>
                            <ErrorIcon style={{ color: 'orange', marginRight: '0.5em' }} />
                            Observación
                          </>
                        )}
                        {checklist.estado === 'No Cumple' && (
                          <>
                            <CancelIcon style={{ color: 'red', marginRight: '0.5em' }} />
                            No Cumple
                          </>
                        )}
                      </TableCell>
                      <TableCell>{checklist.periodo}</TableCell>
                      <TableCell>
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
                </React.Fragment>
              );
            })}
          </TableBody>

        </Table>
      </TableContainer>
    </Container>
  );
};

export default Checklist;
