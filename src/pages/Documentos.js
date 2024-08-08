import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';

const Documentos = () => {
  const [nombreArchivo, setNombreArchivo] = useState('');
  const [nuevoNombreArchivo, setNuevoNombreArchivo] = useState('');
  const [urlGuardado, setUrlGuardado] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
  const [organizacionSeleccionada, setOrganizacionSeleccionada] = useState('');
  const [tipoDocumentoSeleccionado, setTipoDocumentoSeleccionado] = useState('');
  const [error, setError] = useState('');
  const [documentos, setDocumentos] = useState([]);
  const [archivo, setArchivo] = useState(null);
  const [editandoDocumentoId, setEditandoDocumentoId] = useState(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [documentoAEliminar, setDocumentoAEliminar] = useState(null);

  // Estados para los filtros
  const [filtroOrganizacion, setFiltroOrganizacion] = useState('');
  const [filtroSucursal, setFiltroSucursal] = useState('');
  const [filtroNombre, setFiltroNombre] = useState('');
  const [documentosFiltrados, setDocumentosFiltrados] = useState([]);

  const organizaciones = [
    { id: 1, nombre: 'Organización 1' },
    { id: 2, nombre: 'Organización 2' },
  ];

  const sucursales = [
    { id: 1, nombre: 'Sucursal 1' },
    { id: 2, nombre: 'Sucursal 2' },
  ];

  const tiposDocumentos = [
    { id: 1, nombre: 'Tipo Documento 1' },
    { id: 2, nombre: 'Tipo Documento 2' },
  ];

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
    setError('');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setArchivo(file);
      setNombreArchivo(file.name);
      // Actualiza la URL cada vez que se carga un archivo
      const url = generarUrlGuardado(nuevoNombreArchivo, organizacionSeleccionada, sucursalSeleccionada);
      setUrlGuardado(url);
    }
  };

  const handleNuevoNombreArchivoChange = (event) => {
    setNuevoNombreArchivo(event.target.value);
  };

  const generarUrlGuardado = (nombre, organizacion, sucursal) => {
    if (!organizacion || !sucursal || !nombre) {
      return '';
    }
    // Siempre se guarda como .pdf
    return `https://dominio.com/documentos/${organizacion}/${sucursal}/${nombre}.pdf`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !nombreArchivo ||
      !descripcion ||
      !sucursalSeleccionada ||
      !organizacionSeleccionada ||
      !tipoDocumentoSeleccionado ||
      !nuevoNombreArchivo
    ) {
      setError('Todos los campos son requeridos');
      return;
    }

    if (!urlGuardado) {
      setError('Faltan campos para generar la URL del guardado');
      return;
    }

    setError('');

    const nuevoDocumento = {
      id: editandoDocumentoId ? editandoDocumentoId : documentos.length + 1,
      nombre: nuevoNombreArchivo,
      url: urlGuardado,
      descripcion,
      organizacion: organizacionSeleccionada,
      sucursal: sucursalSeleccionada,
      tipoDocumento: tipoDocumentoSeleccionado,
    };

    if (editandoDocumentoId) {
      // Editar el documento existente
      setDocumentos(
        documentos.map((doc) =>
          doc.id === editandoDocumentoId ? nuevoDocumento : doc
        )
      );
    } else {
      // Añadir el nuevo documento a la lista
      setDocumentos([...documentos, nuevoDocumento]);
    }

    // Limpiar los campos del formulario y resetear el modo de edición
    resetFormulario();
  };

  const resetFormulario = () => {
    setNombreArchivo('');
    setNuevoNombreArchivo('');
    setUrlGuardado('');
    setDescripcion('');
    setOrganizacionSeleccionada('');
    setSucursalSeleccionada('');
    setTipoDocumentoSeleccionado('');
    setArchivo(null);
    setEditandoDocumentoId(null);
  };

  const handleEdit = (id) => {
    const documento = documentos.find((doc) => doc.id === id);
    if (documento) {
      setNombreArchivo(documento.nombre);
      setNuevoNombreArchivo(documento.nombre);
      setUrlGuardado(documento.url);
      setDescripcion(documento.descripcion);
      setOrganizacionSeleccionada(documento.organizacion);
      setSucursalSeleccionada(documento.sucursal);
      setTipoDocumentoSeleccionado(documento.tipoDocumento);
      setEditandoDocumentoId(id);
    }
  };

  const handleDelete = (id) => {
    setDocumentoAEliminar(id);
    setOpenConfirmDelete(true);
  };

  const confirmDelete = () => {
    setDocumentos(documentos.filter((doc) => doc.id !== documentoAEliminar));
    setOpenConfirmDelete(false);
  };

  const cancelDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleDownload = (url, nombre) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = nombre;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Función para aplicar los filtros
  const aplicarFiltros = () => {
    const filtered = documentos.filter((doc) => {
      return (
        (filtroOrganizacion === '' || doc.organizacion.toLowerCase().includes(filtroOrganizacion.toLowerCase())) &&
        (filtroSucursal === '' || doc.sucursal.toLowerCase().includes(filtroSucursal.toLowerCase())) &&
        (filtroNombre === '' || doc.nombre.toLowerCase().includes(filtroNombre.toLowerCase()))
      );
    });
  
    setDocumentosFiltrados(filtered);
  };
  

  // Aplicar los filtros al cambiar cualquiera de ellos
  React.useEffect(() => {
    aplicarFiltros();
  }, [filtroOrganizacion, filtroSucursal, filtroNombre, documentos]);
  

  const columns = [
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'descripcion', headerName: 'Descripción', flex: 1 },
    { field: 'organizacion', headerName: 'Organización', flex: 1 },
    { field: 'sucursal', headerName: 'Sucursal', flex: 1 },
    { field: 'tipoDocumento', headerName: 'Tipo de Documento', flex: 1.5 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      flex: 2,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => handleDownload(params.row.url, params.row.nombre)}>
            <DownloadIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Container style={{ marginTop: '1em', marginLeft: 0 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Documentos
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Agregar/Editar Documento</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                >
                  Seleccionar Archivo
                  <input
                    type="file"
                    hidden
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                </Button>
                <TextField
                  fullWidth
                  label="Nombre del Archivo"
                  value={nombreArchivo}
                  onChange={(e) => handleInputChange(e, setNombreArchivo)}
                  variant="outlined"
                  margin="normal"
                  disabled
                />
                <TextField
                  fullWidth
                  label="Nuevo Nombre del Archivo"
                  value={nuevoNombreArchivo}
                  onChange={handleNuevoNombreArchivoChange}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Descripción"
                  value={descripcion}
                  onChange={(e) => handleInputChange(e, setDescripcion)}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                
                <FormControl fullWidth margin="normal" sx={{ marginTop:"53px"}}>
                  <InputLabel>Organización</InputLabel>
                  <Select
                    value={organizacionSeleccionada}
                    onChange={(e) => handleInputChange(e, setOrganizacionSeleccionada)}
                    label="Organización"
                  >
                    {organizaciones.map((org) => (
                      <MenuItem key={org.id} value={org.nombre}>
                        {org.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Sucursal</InputLabel>
                  <Select
                    value={sucursalSeleccionada}
                    onChange={(e) => handleInputChange(e, setSucursalSeleccionada)}
                    label="Sucursal"
                  >
                    {sucursales.map((suc) => (
                      <MenuItem key={suc.id} value={suc.nombre}>
                        {suc.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Tipo de Documento</InputLabel>
                  <Select
                    value={tipoDocumentoSeleccionado}
                    onChange={(e) => handleInputChange(e, setTipoDocumentoSeleccionado)}
                    label="Tipo de Documento"
                  >
                    {tiposDocumentos.map((tipo) => (
                      <MenuItem key={tipo.id} value={tipo.nombre}>
                        {tipo.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {error && (
                  <Typography color="error">
                    {error}
                  </Typography>
                )}
                <Button variant="contained" type="submit">
                  {editandoDocumentoId ? 'Actualizar Documento' : 'Guardar Documento'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </AccordionDetails>
      </Accordion>
      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2">
            Filtrar Documentos
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Organización"
                value={filtroOrganizacion}
                onChange={(e) => setFiltroOrganizacion(e.target.value)}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Sucursal"
                value={filtroSucursal}
                onChange={(e) => setFiltroSucursal(e.target.value)}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Nombre"
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} marginTop={2}>
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={documentosFiltrados}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </div>
        </Grid>
      </Grid>
      <Dialog
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar este documento?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancelar</Button>
          <Button onClick={confirmDelete} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Documentos;
