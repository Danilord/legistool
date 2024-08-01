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
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Regulation = () => {
  const [nombreArchivo, setNombreArchivo] = useState('');
  const [url, setUrl] = useState('');
  const [numeroRegulacion, setNumeroRegulacion] = useState('');
  const [fechaPublicacion, setFechaPublicacion] = useState('');
  const [fechaEfectiva, setFechaEfectiva] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [descripcion, setDescripcion] = useState('');
  const [paisSeleccionado, setPaisSeleccionado] = useState('');
  const [tipoDocumentoSeleccionado, setTipoDocumentoSeleccionado] = useState('');
  const [error, setError] = useState('');
  const [regulaciones, setRegulaciones] = useState([]);
  const [archivo, setArchivo] = useState(null);
  const [editandoRegulacionId, setEditandoRegulacionId] = useState(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [regulacionAEliminar, setRegulacionAEliminar] = useState(null);

  // Lista de países
  const paises = [
    { id: 1, nombre: 'País 1' },
    { id: 2, nombre: 'País 2' },
    // Agrega más países según sea necesario
  ];

  // Lista de tipos de documentos
  const tiposDocumentos = [
    { id: 1, nombre: 'Tipo Documento 1' },
    { id: 2, nombre: 'Tipo Documento 2' },
    // Agrega más tipos de documentos según sea necesario
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
      setUrl(`https://mi-servidor.com/${file.name}`);
    }
  };

  const handleNombreArchivoChange = (event) => {
    const newName = event.target.value;
    setNombreArchivo(newName);

    // Actualizar la URL si ya se ha seleccionado un archivo
    if (archivo || editandoRegulacionId) {
      const extension = archivo ? archivo.name.split('.').pop() : '';
      setUrl(`https://mi-servidor.com/${newName}${extension ? '.' + extension : ''}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !nombreArchivo ||
      !numeroRegulacion ||
      !fechaPublicacion ||
      !fechaEfectiva ||
      !descripcion ||
      !paisSeleccionado ||
      !tipoDocumentoSeleccionado
    ) {
      setError('Todos los campos son requeridos');
      return;
    }

    setError('');

    const nuevaRegulacion = {
      id: editandoRegulacionId ? editandoRegulacionId : regulaciones.length + 1,
      nombreArchivo,
      url,
      numeroRegulacion,
      fechaPublicacion,
      fechaEfectiva,
      enabled,
      descripcion,
      pais: paisSeleccionado,
      tipoDocumento: tipoDocumentoSeleccionado,
    };

    if (editandoRegulacionId) {
      // Editar la regulación existente
      setRegulaciones(
        regulaciones.map((reg) =>
          reg.id === editandoRegulacionId ? nuevaRegulacion : reg
        )
      );
    } else {
      // Añadir la nueva regulación a la lista
      setRegulaciones([...regulaciones, nuevaRegulacion]);
    }

    // Limpiar los campos del formulario y resetear el modo de edición
    resetFormulario();
  };

  const resetFormulario = () => {
    setNombreArchivo('');
    setUrl('');
    setNumeroRegulacion('');
    setFechaPublicacion('');
    setFechaEfectiva('');
    setEnabled(false);
    setDescripcion('');
    setPaisSeleccionado('');
    setTipoDocumentoSeleccionado('');
    setArchivo(null);
    setEditandoRegulacionId(null);
  };

  const handleEdit = (id) => {
    const regulacion = regulaciones.find((reg) => reg.id === id);
    if (regulacion) {
      setNombreArchivo(regulacion.nombreArchivo);
      setUrl(regulacion.url);
      setNumeroRegulacion(regulacion.numeroRegulacion);
      setFechaPublicacion(regulacion.fechaPublicacion);
      setFechaEfectiva(regulacion.fechaEfectiva);
      setEnabled(regulacion.enabled);
      setDescripcion(regulacion.descripcion);
      setPaisSeleccionado(regulacion.pais);
      setTipoDocumentoSeleccionado(regulacion.tipoDocumento);
      setEditandoRegulacionId(id);
    }
  };

  const handleDelete = (id) => {
    setRegulacionAEliminar(id);
    setOpenConfirmDelete(true);
  };

  const confirmDelete = () => {
    setRegulaciones(regulaciones.filter((reg) => reg.id !== regulacionAEliminar));
    setOpenConfirmDelete(false);
  };

  const cancelDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleDownload = (url, nombreArchivo) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    { field: 'nombreArchivo', headerName: 'Nombre', flex: 1 },
    { field: 'numeroRegulacion', headerName: 'Número de Regulación', flex: 1.5 },
    { field: 'fechaPublicacion', headerName: 'Fecha de Publicación', flex: 1 },
    { field: 'fechaEfectiva', headerName: 'Fecha Efectiva', flex: 1 },
    {
      field: 'enabled',
      headerName: 'Activo',
      flex: 0.5,
      renderCell: (params) => (
        <Switch checked={params.value} disabled color="primary" />
      ),
    },
    { field: 'descripcion', headerName: 'Descripción', flex: 1.5 },
    { field: 'pais', headerName: 'País', flex: 1 },
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
          <IconButton
            color="primary"
            onClick={() => handleDownload(params.row.url, params.row.nombreArchivo)}
          >
            <DownloadIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Container style={{ marginTop: '1em', marginLeft: 0 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Regulaciones
      </Typography>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Formulario de Regulación</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                  >
                    Cargar Documento
                    <input type="file" hidden onChange={handleFileChange} />
                  </Button>
                </FormControl>

                <TextField
                  label="Nombre del Documento"
                  variant="outlined"
                  fullWidth
                  value={nombreArchivo}
                  onChange={handleNombreArchivoChange}
                  margin="normal"
                />

                <TextField
                  label="Número de Regulación"
                  variant="outlined"
                  fullWidth
                  value={numeroRegulacion}
                  onChange={(e) => handleInputChange(e, setNumeroRegulacion)}
                  margin="normal"
                />

                <TextField
                  label="Fecha de Publicación"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={fechaPublicacion}
                  onChange={(e) => handleInputChange(e, setFechaPublicacion)}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  label="Fecha de entrada en vigencia"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={fechaEfectiva}
                  onChange={(e) => handleInputChange(e, setFechaEfectiva)}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={enabled}
                      onChange={(e) => setEnabled(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Activo"
                  style={{ marginTop: '1em' }}
                />

                <TextField
                  label="Descripción"
                  variant="outlined"
                  fullWidth
                  value={descripcion}
                  onChange={(e) => handleInputChange(e, setDescripcion)}
                  margin="normal"
                  multiline
                  rows={5}
                />

                <FormControl fullWidth margin="normal">
                  <InputLabel>País</InputLabel>
                  <Select
                    value={paisSeleccionado}
                    onChange={(e) => handleInputChange(e, setPaisSeleccionado)}
                    label="País"
                  >
                    {paises.map((pais) => (
                      <MenuItem key={pais.id} value={pais.nombre}>
                        {pais.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <InputLabel>Tipo de Documento</InputLabel>
                  <Select
                    value={tipoDocumentoSeleccionado}
                    onChange={(e) =>
                      handleInputChange(e, setTipoDocumentoSeleccionado)
                    }
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
            </Grid>

            {error && (
              <Typography color="error" variant="body1" gutterBottom>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '1em' }}
            >
              {editandoRegulacionId ? 'Actualizar Regulación' : 'Agregar Regulación'}
            </Button>
          </form>
        </AccordionDetails>
      </Accordion>

      <div style={{ height: 400, width: '100%', marginTop: '1em' }}>
        <DataGrid
          rows={regulaciones}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>

      <Dialog
        open={openConfirmDelete}
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Confirmar Eliminación'}</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar esta regulación?
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

export default Regulation;
