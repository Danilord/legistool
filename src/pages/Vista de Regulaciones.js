import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import {
    Autocomplete,
    Box,
    Button,
    Collapse,
    Container,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import Papa from 'papaparse';

const VistaRegulaciones = ({ isAdmin = false, userSucursal = 'Sucursal 2' }) => {
  const [sucursal, setSucursal] = useState(isAdmin ? '' : userSucursal);
  const [regulacionesFiltradas, setRegulacionesFiltradas] = useState([]);
  const [filtros, setFiltros] = useState({
    permiso: '',
    tipoDocumento: '',
    fechaOtorgamiento: '',
    fechaExpiracion: '',
  });
  const [expandedRow, setExpandedRow] = useState(null);

  const regulaciones = useMemo(() => [
    {
      id: 1,
      sucursal: 'Sucursal 1',
      permiso: 'Permiso 1',
      tipoDocumento: 'Tipo Documento 1',
      fechaOtorgamiento: '2024-01-01',
      fechaExpiracion: '2025-01-01',
      descripcion: 'Descripción de la regulación 1',
      url: 'https://mi-servidor.com/documento1.pdf',
    },
    {
      id: 2,
      sucursal: 'Sucursal 1',
      permiso: 'Permiso 2',
      tipoDocumento: 'Tipo Documento 2',
      fechaOtorgamiento: '2023-05-01',
      fechaExpiracion: '2024-05-01',
      descripcion: 'Descripción de la regulación 2 Descripción de la regulación 2 \n Descripción de la regulación 2',
      url: 'https://mi-servidor.com/documento2.pdf',
    },
    {
      id: 3,
      sucursal: 'Sucursal 2',
      permiso: 'Permiso 3',
      tipoDocumento: 'Tipo Documento 3',
      fechaOtorgamiento: '2022-03-01',
      fechaExpiracion: '2023-03-01',
      descripcion: 'Descripción de la regulación 3',
      url: 'https://mi-servidor.com/documento3.pdf',
    },
  ], []);

  const sucursales = useMemo(() => [
    { id: 1, nombre: 'Sucursal 1' },
    { id: 2, nombre: 'Sucursal 2' },
    { id: 3, nombre: 'Sucursal 3' },
  ], []);

  const permisos = useMemo(() => [
    'Permiso 1',
    'Permiso 2',
    'Permiso 3',
  ], []);

  const tiposDocumentos = useMemo(() => [
    'Tipo Documento 1',
    'Tipo Documento 2',
    'Tipo Documento 3',
  ], []);

  const handleFilterChange = (event, value, name) => {
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      [name]: value || '', // Asegura que el valor sea una cadena vacía si es null o undefined
    }));
  };

  const handleRowClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleClearFilters = () => {
    setFiltros({
      permiso: '',
      tipoDocumento: '',
      fechaOtorgamiento: '',
      fechaExpiracion: '',
    });
  };

  useEffect(() => {
    const filtradas = regulaciones.filter((reg) => {
      const coincideSucursal = reg.sucursal === sucursal;
      const coincidePermiso = reg.permiso
        .toLowerCase()
        .includes((filtros.permiso || '').toLowerCase()); // Maneja valor vacío
      const coincideTipoDocumento = reg.tipoDocumento
        .toLowerCase()
        .includes((filtros.tipoDocumento || '').toLowerCase()); // Maneja valor vacío
      const coincideFechaOtorgamiento = reg.fechaOtorgamiento.includes(
        filtros.fechaOtorgamiento || '' // Maneja valor vacío
      );
      const coincideFechaExpiracion = reg.fechaExpiracion.includes(
        filtros.fechaExpiracion || '' // Maneja valor vacío
      );

      return (
        coincideSucursal &&
        coincidePermiso &&
        coincideTipoDocumento &&
        coincideFechaOtorgamiento &&
        coincideFechaExpiracion
      );
    });

    setRegulacionesFiltradas(filtradas);
  }, [sucursal, filtros, regulaciones]);

  const handleDownload = (url, nombreArchivo) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

    // const handleExportExcel = () => {
    // const exportData = regulacionesFiltradas.map((reg) => ({
    //     Permiso: reg.permiso,
    //     'Tipo de Documento': reg.tipoDocumento,
    //     'Fecha de Otorgamiento': reg.fechaOtorgamiento,
    //     'Fecha de Expiración': reg.fechaExpiracion,
    //     Descripción: reg.descripcion,
    // }));

    // // Convertir los datos a CSV
    // const csv = Papa.unparse(exportData);

    // const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    // const link = document.createElement('a');
    // link.href = URL.createObjectURL(blob);
    // link.download = `Regulaciones_${sucursal}.csv`;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // };
    const handleExportExcel = () => {
        const exportData = regulacionesFiltradas.map((reg) => ({
          Permiso: reg.permiso,
          'Tipo de Documento': reg.tipoDocumento,
          'Fecha de Otorgamiento': reg.fechaOtorgamiento,
          'Fecha de Expiración': reg.fechaExpiracion,
          Descripción: reg.descripcion,
        }));
      
        // Convertir los datos a CSV
        const csv = Papa.unparse(exportData);
      
        // Agregar BOM para UTF-8
        const bom = '\uFEFF';
        const csvWithBom = bom + csv;
      
        // Crear un Blob con la codificación UTF-8
        const blob = new Blob([csvWithBom], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Regulaciones_${sucursal}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      

  return (
    <Container style={{ marginTop: '2em' }}>
      <Typography variant="h4" gutterBottom>
        Vista de Regulaciones
      </Typography>

      {isAdmin && (
        <Autocomplete
          options={sucursales}
          getOptionLabel={(option) => option.nombre}
          value={sucursales.find((suc) => suc.nombre === sucursal) || null}
          onChange={(event, newValue) => setSucursal(newValue ? newValue.nombre : '')}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Seleccione Sucursal"
              variant="outlined"
              margin="normal"
              fullWidth
            />
          )}
        />
      )}

      <Grid container spacing={2} marginTop={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <Autocomplete
            options={permisos}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Filtro por Permiso"
                variant="outlined"
                margin="normal"
                fullWidth
              />
            )}
            value={filtros.permiso}
            onChange={(event, newValue) => handleFilterChange(event, newValue, 'permiso')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Autocomplete
            options={tiposDocumentos}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Filtro por Tipo de Documento"
                variant="outlined"
                margin="normal"
                fullWidth
              />
            )}
            value={filtros.tipoDocumento}
            onChange={(event, newValue) => handleFilterChange(event, newValue, 'tipoDocumento')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Filtro por Fecha de Otorgamiento"
            type="date"
            variant="outlined"
            fullWidth
            name="fechaOtorgamiento"
            value={filtros.fechaOtorgamiento}
            onChange={(event) => handleFilterChange(event, event.target.value, 'fechaOtorgamiento')}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Filtro por Fecha de Expiración"
            type="date"
            variant="outlined"
            fullWidth
            name="fechaExpiracion"
            value={filtros.fechaExpiracion}
            onChange={(event) => handleFilterChange(event, event.target.value, 'fechaExpiracion')}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearFilters}
            fullWidth
            size="small" // Ajusta el tamaño del botón
          >
            Limpiar Filtros
          </Button>
        </Grid>
      </Grid>

      <div style={{ marginTop: '2em' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleExportExcel}
          size="small" // Ajusta el tamaño del botón
        >
          Exportar a Excel
        </Button>
        <TableContainer component={Paper} style={{ marginTop: '1em' }}>
          <Table aria-label="collapsible table" size="small"> {/* Ajusta el tamaño de la tabla */}
            <TableHead>
              <TableRow>
                <TableCell style={{ padding: '4px 8px' }} /> {/* Reduce el padding */}
                <TableCell style={{ padding: '4px 8px' }}>Permiso</TableCell>
                <TableCell style={{ padding: '4px 8px' }}>Tipo de Documento</TableCell>
                <TableCell style={{ padding: '4px 8px' }} align="right">Fecha de Otorgamiento</TableCell>
                <TableCell style={{ padding: '4px 8px' }} align="right">Fecha de Expiración</TableCell>
                <TableCell style={{ padding: '4px 8px' }} align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {regulacionesFiltradas.map((reg) => (
                <React.Fragment key={reg.id}>
                  <TableRow>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleRowClick(reg.id)}
                      >
                        {expandedRow === reg.id ? <KeyboardArrowUp fontSize="small" /> : <KeyboardArrowDown fontSize="small" />}
                      </IconButton>
                    </TableCell>
                    <TableCell style={{ padding: '4px 8px' }}>{reg.permiso}</TableCell>
                    <TableCell style={{ padding: '4px 8px' }}>{reg.tipoDocumento}</TableCell>
                    <TableCell style={{ padding: '4px 8px' }} align="right">{reg.fechaOtorgamiento}</TableCell>
                    <TableCell style={{ padding: '4px 8px' }} align="right">{reg.fechaExpiracion}</TableCell>
                    <TableCell style={{ padding: '4px 8px' }} align="right">
                      <IconButton
                        color="primary"
                        onClick={() => handleDownload(reg.url, `Regulacion_${reg.id}.pdf`)}
                        size="small" // Ajusta el tamaño del ícono
                      >
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Collapse in={expandedRow === reg.id} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                          <Typography variant="body2" color="textSecondary">
                            {reg.descripcion}
                          </Typography>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
};

export default VistaRegulaciones;
