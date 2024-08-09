import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete
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

  // Datos de ejemplo para las opciones de selección
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

  // Función para aplicar los filtros
  const aplicarFiltros = () => {
    const filtered = documentos.filter((doc) => {
      return (
        (filtroOrganizacion === '' ||
          doc.organizacion.toLowerCase().includes(filtroOrganizacion.toLowerCase())) &&
        (filtroSucursal === '' ||
          doc.sucursal.toLowerCase().includes(filtroSucursal.toLowerCase())) &&
        (filtroNombre === '' ||
          doc.nombre.toLowerCase().includes(filtroNombre.toLowerCase()))
      );
    });

    setDocumentosFiltrados(filtered);
  };

  // Aplicar los filtros al cambiar cualquiera de ellos
  useEffect(() => {
    aplicarFiltros();
  }, [filtroOrganizacion, filtroSucursal, filtroNombre, documentos]);

  // Simular carga inicial de documentos
  useEffect(() => {
    const documentosIniciales = [
      { id: 1, nombre: 'Documento 1', url: 'https://dominio.com/documentos/Organización 1/Sucursal 1/Documento 1.pdf', descripcion: 'Descripción del Documento 1', organizacion: 'Organización 1', sucursal: 'Sucursal 1', tipoDocumento: 'Tipo Documento 1' },
      { id: 2, nombre: 'Documento 2', url: 'https://dominio.com/documentos/Organización 2/Sucursal 2/Documento 2.pdf', descripcion: 'Descripción del Documento 2', organizacion: 'Organización 2', sucursal: 'Sucursal 2', tipoDocumento: 'Tipo Documento 2' }
    ];
    setDocumentos(documentosIniciales);
  }, []);

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
    setError('');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setArchivo(file);
      setNombreArchivo(file.name);
      setNuevoNombreArchivo(file.name);

      // Actualiza la URL cada vez que se carga un archivo
      const url = generarUrlGuardado(
        file.name,
        organizacionSeleccionada,
        sucursalSeleccionada
      );
      setUrlGuardado(url);
    }
  };

  const handleNuevoNombreArchivoChange = (event) => {
    const nuevoNombre = event.target.value;
    setNuevoNombreArchivo(nuevoNombre);
    const url = generarUrlGuardado(
      nuevoNombre,
      organizacionSeleccionada,
      sucursalSeleccionada
    );
    setUrlGuardado(url);
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
      !sucursalSeleccionada ||
      !organizacionSeleccionada ||
      !tipoDocumentoSeleccionado ||
      !nuevoNombreArchivo ||
      !archivo
    ) {
      setError('Por favor, complete todos los campos.');
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

  const columns = [
    { field: 'nombre', headerName: 'Nombre', flex: 2 },
    { field: 'descripcion', headerName: 'Descripción', flex: 2 },
    { field: 'organizacion', headerName: 'Organización', flex: 1.5 },
    { field: 'sucursal', headerName: 'Sucursal', flex: 1.5 },
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
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="default"
            onClick={() => handleDownload(params.row.url, params.row.nombre)}
          >
            <DownloadIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Gestión de Documentos
      </Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Formulario</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                label="Nombre del Archivo"
                value={nombreArchivo}
                onChange={(e) => handleInputChange(e, setNombreArchivo)}
                disabled
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                label="Nuevo Nombre del Archivo"
                value={nuevoNombreArchivo}
                onChange={handleNuevoNombreArchivoChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Autocomplete
                options={organizaciones}
                getOptionLabel={(option) => option.nombre}
                value={organizaciones.find((org) => org.nombre === organizacionSeleccionada) || null}
                onChange={(e, newValue) => setOrganizacionSeleccionada(newValue ? newValue.nombre : '')}
                renderInput={(params) => <TextField {...params} label="Organización" />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Autocomplete
                options={sucursales}
                getOptionLabel={(option) => option.nombre}
                value={sucursales.find((suc) => suc.nombre === sucursalSeleccionada) || null}
                onChange={(e, newValue) => setSucursalSeleccionada(newValue ? newValue.nombre : '')}
                renderInput={(params) => <TextField {...params} label="Sucursal" />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Autocomplete
                options={tiposDocumentos}
                getOptionLabel={(option) => option.nombre}
                value={tiposDocumentos.find((tipo) => tipo.nombre === tipoDocumentoSeleccionado) || null}
                onChange={(e, newValue) => setTipoDocumentoSeleccionado(newValue ? newValue.nombre : '')}
                renderInput={(params) => <TextField {...params} label="Tipo de Documento" />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descripción"
              multiline
              rows={4}
              value={descripcion}
              onChange={(e) => handleInputChange(e, setDescripcion)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              Seleccionar Archivo
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                accept='.pdf'
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Guardar
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </Grid>
        </Grid>
      </form>
        </AccordionDetails>
      </Accordion>
      
      <Grid container spacing={3} marginTop={3} alignContent={"center"}>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <TextField
              label="Filtrar por Organización"
              value={filtroOrganizacion}
              onChange={(e) => setFiltroOrganizacion(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <TextField
              label="Filtrar por Sucursal"
              value={filtroSucursal}
              onChange={(e) => setFiltroSucursal(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <TextField
              label="Filtrar por Nombre"
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
            />
          </FormControl>
        </Grid>
      </Grid>
      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid
          rows={documentosFiltrados}
          columns={columns}
          pageSize={5}
        />
      </div>
      <Dialog
        open={openConfirmDelete}
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Confirmar Eliminación'}
        </DialogTitle>
        <DialogContent>
          <Typography>
            ¿Está seguro de que desea eliminar este documento?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="secondary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Documentos;
