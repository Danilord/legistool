import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const RegulacionesSucursal = () => {
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(null);
  const [regulacionSeleccionada, setRegulacionSeleccionada] = useState(null);
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState(null);
  const [articulos, setArticulos] = useState('');
  const [responsable, setResponsable] = useState('');
  const [requerimientos, setRequerimientos] = useState('');
  const [referencia, setReferencia] = useState('');
  const [creadoEn, setCreadoEn] = useState('');
  const [error, setError] = useState('');
  const [regulacionesList, setRegulacionesList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); // Índice del elemento que se está editando

  const sucursales = [
    { id: 1, nombre: 'Sucursal 1' },
    { id: 2, nombre: 'Sucursal 2' },
  ];

  const regulaciones = [
    { id: 1, nombre: 'Regulación 1' },
    { id: 2, nombre: 'Regulación 2' },
  ];

  const subcategorias = [
    { id: 1, nombre: 'Subcategoría 1' },
    { id: 2, nombre: 'Subcategoría 2' },
  ];

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !sucursalSeleccionada ||
      !regulacionSeleccionada ||
      !subcategoriaSeleccionada ||
      !articulos ||
      !responsable ||
      !requerimientos ||
      !referencia ||
      !creadoEn
    ) {
      setError('Todos los campos son requeridos');
      return;
    }

    setError('');

    const newRegulacion = {
      sucursal: sucursalSeleccionada,
      regulacion: regulacionSeleccionada,
      subcategoria: subcategoriaSeleccionada,
      articulos: articulos,
      responsable: responsable,
      requerimientos: requerimientos,
      referencia: referencia,
      creadoEn: creadoEn,
    };

    if (editIndex !== -1) {
      // Si hay un índice de edición, actualiza el elemento en lugar de agregar uno nuevo
      setRegulacionesList((prevList) =>
        prevList.map((item, index) =>
          index === editIndex ? newRegulacion : item
        )
      );
      setEditIndex(-1); // Restablecer el índice de edición
    } else {
      // Agregar los datos del formulario a la lista de regulaciones
      setRegulacionesList((prevRegulacionesList) => [
        ...prevRegulacionesList,
        newRegulacion,
      ]);
    }

    // Limpiar los campos del formulario
    setSucursalSeleccionada(null);
    setRegulacionSeleccionada(null);
    setSubcategoriaSeleccionada(null);
    setArticulos('');
    setResponsable('');
    setRequerimientos('');
    setReferencia('');
    setCreadoEn('');
  };

  const handleEdit = (index) => {
    const regulacion = regulacionesList[index];
    setSucursalSeleccionada(regulacion.sucursal);
    setRegulacionSeleccionada(regulacion.regulacion);
    setSubcategoriaSeleccionada(regulacion.subcategoria);
    setArticulos(regulacion.articulos);
    setResponsable(regulacion.responsable);
    setRequerimientos(regulacion.requerimientos);
    setReferencia(regulacion.referencia);
    setCreadoEn(regulacion.creadoEn);
    setEditIndex(index); // Establecer el índice de edición
  };

  const handleCopy = (index) => {
    const regulacion = regulacionesList[index];
    const nuevaRegulacion = { ...regulacion }; // Crear una copia de la regulación
    setRegulacionesList((prevList) => [...prevList, nuevaRegulacion]); // Agregar la copia a la lista
  };

  const handleDelete = (index) => {
    setRegulacionesList((prevList) =>
      prevList.filter((_, i) => i !== index)
    );
  };

  return (
    <Container style={{ marginTop: '1em', marginLeft: 0 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Regulaciones Sucursal
      </Typography>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Formulario de Regulaciones</Typography>
        </AccordionSummary>
        <AccordionDetails>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      options={sucursales}
                      getOptionLabel={(option) => option.nombre}
                      value={sucursalSeleccionada}
                      onChange={(event, newValue) => {
                        setSucursalSeleccionada(newValue);
                        setError('');
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Sucursal"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                        />
                      )}
                    />

                    <Autocomplete
                      options={regulaciones}
                      getOptionLabel={(option) => option.nombre}
                      value={regulacionSeleccionada}
                      onChange={(event, newValue) => {
                        setRegulacionSeleccionada(newValue);
                        setError('');
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Regulación"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                        />
                      )}
                    />

                    <Autocomplete
                      options={subcategorias}
                      getOptionLabel={(option) => option.nombre}
                      value={subcategoriaSeleccionada}
                      onChange={(event, newValue) => {
                        setSubcategoriaSeleccionada(newValue);
                        setError('');
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Subcategoría"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                        />
                      )}
                    />

                    <TextField
                      label="Artículos"
                      variant="outlined"
                      fullWidth
                      value={articulos}
                      onChange={(e) => handleInputChange(e, setArticulos)}
                      margin="normal"
                    />

                    
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Requerimientos"
                      variant="outlined"
                      fullWidth
                      value={requerimientos}
                      onChange={(e) => handleInputChange(e, setRequerimientos)}
                      margin="normal"
                    />

                    <TextField
                      label="Referencia"
                      variant="outlined"
                      fullWidth
                      value={referencia}
                      onChange={(e) => handleInputChange(e, setReferencia)}
                      margin="normal"
                    />

                    <TextField
                      label="Creado en"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      fullWidth
                      value={creadoEn}
                      onChange={(e) => handleInputChange(e, setCreadoEn)}
                      margin="normal"
                    />

                    <TextField
                      label="Responsable"
                      variant="outlined"
                      fullWidth
                      value={responsable}
                      onChange={(e) => handleInputChange(e, setResponsable)}
                      margin="normal"
                    />

                    {error && (
                      <Typography variant="caption" color="error">
                        {error}
                      </Typography>
                    )}

                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
                      {editIndex !== -1 ? 'Actualizar' : 'Guardar'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
        </AccordionDetails>
      </Accordion>

      <Grid item xs={12}>
        <TableContainer component={Paper} style={{ marginTop: '2em' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sucursal</TableCell>
                <TableCell>Regulación</TableCell>
                <TableCell>Subcategoría</TableCell>
                <TableCell>Artículos</TableCell>
                <TableCell>Responsable</TableCell>
                <TableCell>Requerimientos</TableCell>
                <TableCell>Referencia</TableCell>
                <TableCell>Creado en</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {regulacionesList.map((regulacion, index) => (
                <TableRow key={index}>
                  <TableCell>{regulacion.sucursal?.nombre}</TableCell>
                  <TableCell>{regulacion.regulacion?.nombre}</TableCell>
                  <TableCell>{regulacion.subcategoria?.nombre}</TableCell>
                  <TableCell>{regulacion.articulos}</TableCell>
                  <TableCell>{regulacion.responsable}</TableCell>
                  <TableCell>{regulacion.requerimientos}</TableCell>
                  <TableCell>{regulacion.referencia}</TableCell>
                  <TableCell>{regulacion.creadoEn}</TableCell>
                  <TableCell>
                    <Tooltip title="Editar">
                      <IconButton
                        aria-label="editar"
                        color="primary"
                        onClick={() => handleEdit(index)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Copiar">
                      <IconButton
                        aria-label="copiar"
                        color="secondary"
                        onClick={() => handleCopy(index)}
                      >
                        <FileCopyIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton
                        aria-label="eliminar"
                        color="error"
                        onClick={() => handleDelete(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Container>
  );
};

export default RegulacionesSucursal;
