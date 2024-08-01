import React, { useState, useEffect } from 'react';
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
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import CancelIcon from '@mui/icons-material/CancelOutlined';
import Papa from 'papaparse';

const VistaChecklist = ({ isAdmin = true }) => {
  const [sucursal, setSucursal] = useState(isAdmin ? '' : 'Sucursal 1-1');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroRequerimiento, setFiltroRequerimiento] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [checklists, setChecklists] = useState([]);
  const [organizacion, setOrganizacion] = useState(isAdmin ? '' : 'Organización 1');

  const organizaciones = [
    { nombre: 'Organización 1', elementos: ['Sucursal 1-1', 'Sucursal 1-2'] },
    { nombre: 'Organización 2', elementos: ['Sucursal 2-1', 'Sucursal 2-2'] },
    { nombre: 'Organización 3', elementos: ['Sucursal 3-1', 'Sucursal 3-2'] },
  ];

  const requerimientos = [
    {
      nombre: 'Categoría 1 Tierra',
      elementos: [
        'Nombre del requerimiento Cat 1-1',
        'Nombre del requerimiento Cat 1-2',
        'Nombre del requerimiento Cat 1-3',
      ],
    },
    {
      nombre: 'Categoría 2 Agua',
      elementos: [
        'Nombre del requerimiento Cat 2-1',
        'Nombre del requerimiento Cat 2-2',
        'Nombre del requerimiento Cat 2-3',
      ],
    },
    {
      nombre: 'Categoría 3 Aire',
      elementos: [
        'Nombre del requerimiento Cat 3-1',
        'Nombre del requerimiento Cat 3-2',
        'Nombre del requerimiento Cat 3-3',
      ],
    },
    {
      nombre: 'Categoría 4 Fuego',
      elementos: [
        'Nombre del requerimiento Cat 4-1',
        'Nombre del requerimiento Cat 4-2',
        'Nombre del requerimiento Cat 4-3',
      ],
    },
  ];

  useEffect(() => {
    setChecklists([
      {
        id: 1,
        requerimiento: 'Nombre del requerimiento Cat 1-1',
        sucursal: 'Sucursal 1-1',
        estado: 'Cumple',
        periodo: 2024,
      },
      {
        id: 2,
        requerimiento: 'Nombre del requerimiento Cat 1-2',
        sucursal: 'Sucursal 1-1',
        estado: 'Observacion',
        periodo: 2024,
      },
      {
        id: 3,
        requerimiento: 'Nombre del requerimiento Cat 1-3',
        sucursal: 'Sucursal 1-2',
        estado: 'No Cumple',
        periodo: 2024,
      },
      {
        id: 4,
        requerimiento: 'Nombre del requerimiento Cat 2-1',
        sucursal: 'Sucursal 2-1',
        estado: 'Cumple',
        periodo: 2024,
      },
      {
        id: 5,
        requerimiento: 'Nombre del requerimiento Cat 2-2',
        sucursal: 'Sucursal 2-1',
        estado: 'Observacion',
        periodo: 2024,
      },
      {
        id: 6,
        requerimiento: 'Nombre del requerimiento Cat 2-3',
        sucursal: 'Sucursal 2-2',
        estado: 'No Cumple',
        periodo: 2024,
      },
      {
        id: 7,
        requerimiento: 'Nombre del requerimiento Cat 3-1',
        sucursal: 'Sucursal 3-1',
        estado: 'Cumple',
        periodo: 2024,
      },
      {
        id: 8,
        requerimiento: 'Nombre del requerimiento Cat 3-2',
        sucursal: 'Sucursal 3-1',
        estado: 'Observacion',
        periodo: 2024,
      },
      {
        id: 9,
        requerimiento: 'Nombre del requerimiento Cat 3-3',
        sucursal: 'Sucursal 3-2',
        estado: 'No Cumple',
        periodo: 2024,
      },
      {
        id: 10,
        requerimiento: 'Nombre del requerimiento Cat 4-1',
        sucursal: 'Sucursal 3-2',
        estado: 'Cumple',
        periodo: 2024,
      },
      {
        id: 11,
        requerimiento: 'Nombre del requerimiento Cat 4-2',
        sucursal: 'Sucursal 3-1',
        estado: 'Observacion',
        periodo: 2024,
      },
      {
        id: 12,
        requerimiento: 'Nombre del requerimiento Cat 4-3',
        sucursal: 'Sucursal 2-2',
        estado: 'No Cumple',
        periodo: 2024,
      },
    ]);
  }, []);

  const limpiarFiltros = () => {
    setFiltroCategoria('');
    setFiltroRequerimiento('');
    setFiltroEstado('');
    if (isAdmin) {
      setSucursal('');
      setOrganizacion('');
    }
  };

  const checklistsFiltrados = checklists.filter((checklist) => {
    const filtroRequerimientoAplicado =
      !filtroRequerimiento ||
      checklist.requerimiento.includes(filtroRequerimiento);
    const filtroEstadoAplicado = !filtroEstado || checklist.estado === filtroEstado;
    const filtroCategoriaAplicado =
      !filtroCategoria ||
      requerimientos
        .find((c) => c.nombre === filtroCategoria)
        ?.elementos.includes(checklist.requerimiento);
    const filtroSucursalAplicado =
      !isAdmin || !sucursal || checklist.sucursal === sucursal;
    const filtroOrganizacionAplicado =
      !isAdmin ||
      !organizacion ||
      organizaciones
        .find((o) => o.nombre === organizacion)
        ?.elementos.includes(checklist.sucursal);

    return (
      filtroRequerimientoAplicado &&
      filtroEstadoAplicado &&
      filtroCategoriaAplicado &&
      filtroSucursalAplicado &&
      filtroOrganizacionAplicado
    );
  });

  // Función para exportar a CSV usando PapaParse
  const exportarCSV = () => {
    const datosCSV = checklistsFiltrados.map((checklist) => {
      const categoria = requerimientos.find((categoria) =>
        categoria.elementos.includes(checklist.requerimiento)
      )?.nombre;
      return {
        Categoria: categoria,
        Requerimiento: checklist.requerimiento,
        Estado: checklist.estado,
        Periodo: checklist.periodo,
      };
    });
  
    const csv = Papa.unparse(datosCSV, {
      header: true,
      encoding: "utf-8",
    });
  
    // Añadir BOM al CSV para mejorar la compatibilidad con Excel
    const bom = "\uFEFF"; // Byte Order Mark
    const csvWithBom = bom + csv;
  
    const blob = new Blob([csvWithBom], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'checklist.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container style={{ marginTop: '1em' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Checklist del periodo 2024
      </Typography>

      {isAdmin && (
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel>Organización</InputLabel>
              <Select
                value={organizacion}
                onChange={(e) => {
                  const selectedOrganizacion = e.target.value;
                  setOrganizacion(selectedOrganizacion);
                  // Set the sucursal to an empty value when changing organization
                  setSucursal('');
                }}
              >
                <MenuItem value="">Seleccione una organización</MenuItem>
                {organizaciones.map((org, index) => (
                  <MenuItem key={index} value={org.nombre}>
                    {org.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel>Sucursal</InputLabel>
              <Select
                value={sucursal}
                onChange={(e) => setSucursal(e.target.value)}
              >
                <MenuItem value="">Seleccione una sucursal</MenuItem>
                {organizacion &&
                  organizaciones
                    .find((org) => org.nombre === organizacion)
                    ?.elementos.map((suc, index) => (
                      <MenuItem key={index} value={suc}>
                        {suc}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      )}

      <Grid container spacing={2} alignItems="center" style={{ marginTop: '1em' }}>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth margin="dense">
            <InputLabel>Categoría</InputLabel>
            <Select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
            >
              <MenuItem value="">Seleccione una categoría</MenuItem>
              {requerimientos.map((categoria, index) => (
                <MenuItem key={index} value={categoria.nombre}>
                  {categoria.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth margin="dense">
            <TextField
              label="Requerimiento"
              value={filtroRequerimiento}
              onChange={(e) => setFiltroRequerimiento(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth margin="dense">
            <InputLabel>Estado</InputLabel>
            <Select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <MenuItem value="">Seleccione un estado</MenuItem>
              <MenuItem value="Cumple">Cumple</MenuItem>
              <MenuItem value="Observacion">Observación</MenuItem>
              <MenuItem value="No Cumple">No Cumple</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            variant="outlined"
            color="primary"
            onClick={limpiarFiltros}
            fullWidth
            style={{ height: '100%' }}
          >
            Limpiar Filtros
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h6" component="h2" style={{ marginTop: '1em' }}>
        Resultados de Checklist
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={exportarCSV}
        style={{ marginBottom: '1em' }}
      >
        Exportar a .csv
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Requerimiento</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Periodo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requerimientos.map((categoria) => {
              const checklistsPorCategoria = checklistsFiltrados.filter(
                (checklist) =>
                  categoria.elementos.includes(checklist.requerimiento)
              );

              return (
                <React.Fragment key={categoria.nombre}>
                  {checklistsPorCategoria.length > 0 && (
                    <TableRow>
                      <TableCell colSpan={3} style={{ fontWeight: 'bold' }}>
                        {categoria.nombre}
                      </TableCell>
                    </TableRow>
                  )}
                  {checklistsPorCategoria.map((checklist) => (
                    <TableRow key={checklist.id}>
                      <TableCell>{checklist.requerimiento}</TableCell>
                      <TableCell>
                        {checklist.estado === 'Cumple' && (
                          <CheckCircleIcon style={{ color: 'green' }} />
                        )}
                        {checklist.estado === 'Observacion' && (
                          <ErrorIcon style={{ color: 'orange' }} />
                        )}
                        {checklist.estado === 'No Cumple' && (
                          <CancelIcon style={{ color: 'red' }} />
                        )}
                        {` ${checklist.estado}`}
                      </TableCell>
                      <TableCell>{checklist.periodo}</TableCell>
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

export default VistaChecklist;
