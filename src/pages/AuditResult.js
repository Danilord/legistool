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
  TextareaAutosize,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';

const AuditResult = () => {
  const [nombreArchivo, setNombreArchivo] = useState('');
  const [url, setUrl] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
  const [tipoDocumentoSeleccionado, setTipoDocumentoSeleccionado] = useState('');
  const [creadoEn, setCreadoEn] = useState('');
  const [creadoPor, setCreadoPor] = useState('');
  const [error, setError] = useState('');
  const [auditResults, setAuditResults] = useState([]); // Cambiado de documentos a auditResults
  const [archivo, setArchivo] = useState(null);
  const [editandoDocumentoId, setEditandoDocumentoId] = useState(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [documentoAEliminar, setDocumentoAEliminar] = useState(null);

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
      setUrl(`https://mi-servidor.com/${file.name}`);
    }
  };

  const handleNombreArchivoChange = (event) => {
    const newName = event.target.value;
    setNombreArchivo(newName);

    // Actualizar la URL si ya se ha seleccionado un archivo
    if (archivo || editandoDocumentoId) {
      const extension = archivo ? archivo.name.split('.').pop() : '';
      setUrl(`https://mi-servidor.com/${newName}${extension ? '.' + extension : ''}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !nombreArchivo ||
      !descripcion ||
      !sucursalSeleccionada ||
      !tipoDocumentoSeleccionado ||
      !creadoEn ||
      !creadoPor
    ) {
      setError('Todos los campos son requeridos');
      return;
    }

    setError('');

    const nuevoAuditResult = {
      id: editandoDocumentoId ? editandoDocumentoId : auditResults.length + 1,
      nombre: nombreArchivo,
      url,
      descripcion,
      sucursal: sucursalSeleccionada,
      tipoDocumento: tipoDocumentoSeleccionado,
      creadoEn,
      creadoPor,
    };

    if (editandoDocumentoId) {
      // Editar el resultado de auditoría existente
      setAuditResults(
        auditResults.map((doc) =>
          doc.id === editandoDocumentoId ? nuevoAuditResult : doc
        )
      );
    } else {
      // Añadir el nuevo resultado de auditoría a la lista
      setAuditResults([...auditResults, nuevoAuditResult]);
    }

    // Limpiar los campos del formulario y resetear el modo de edición
    resetFormulario();
  };

  const resetFormulario = () => {
    setNombreArchivo('');
    setUrl('');
    setDescripcion('');
    setSucursalSeleccionada('');
    setTipoDocumentoSeleccionado('');
    setCreadoEn('');
    setCreadoPor('');
    setArchivo(null);
    setEditandoDocumentoId(null);
  };

  const handleEdit = (id) => {
    const documento = auditResults.find((doc) => doc.id === id);
    if (documento) {
      setNombreArchivo(documento.nombre);
      setUrl(documento.url);
      setDescripcion(documento.descripcion);
      setSucursalSeleccionada(documento.sucursal);
      setTipoDocumentoSeleccionado(documento.tipoDocumento);
      setCreadoEn(documento.creadoEn);
      setCreadoPor(documento.creadoPor);
      setEditandoDocumentoId(id);
    }
  };

  const handleDelete = (id) => {
    setDocumentoAEliminar(id);
    setOpenConfirmDelete(true);
  };

  const confirmDelete = () => {
    setAuditResults(auditResults.filter((doc) => doc.id !== documentoAEliminar));
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
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    // { field: 'url', headerName: 'URL', flex: 1 },
    { field: 'descripcion', headerName: 'Descripción', flex: 1 },
    { field: 'sucursal', headerName: 'Sucursal', flex: 1 },
    { field: 'tipoDocumento', headerName: 'Tipo de Documento', flex: 1.5 },
    { field: 'creadoEn', headerName: 'Creado en', width: 100 },
    { field: 'creadoPor', headerName: 'Creado por', width: 100 },
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
        Resultados de Auditoría
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                Cargar Documento
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                />
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
              label="URL"
              variant="outlined"
              fullWidth
              value={url}
              margin="normal"
              disabled
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="select-sucursal-label">Sucursal</InputLabel>
              <Select
                label="Sucursal"
                labelId="select-sucursal-label"
                id="select-sucursal"
                value={sucursalSeleccionada}
                onChange={(e) => handleInputChange(e, setSucursalSeleccionada)}
                variant="outlined"
              >
                {sucursales.map((suc) => (
                  <MenuItem key={suc.id} value={suc.nombre}>
                    {suc.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="select-tipo-doc-label">Tipo de Documento</InputLabel>
              <Select
                label="Tipo de Documento"
                labelId="select-tipo-doc-label"
                id="select-tipo-doc"
                value={tipoDocumentoSeleccionado}
                onChange={(e) => handleInputChange(e, setTipoDocumentoSeleccionado)}
                variant="outlined"
              >
                {tiposDocumentos.map((tipo) => (
                  <MenuItem key={tipo.id} value={tipo.nombre}>
                    {tipo.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
              label="Creado por"
              variant="outlined"
              fullWidth
              value={creadoPor}
              onChange={(e) => handleInputChange(e, setCreadoPor)}
              margin="normal"
            />
            
            <TextField
              label="Descripción"
              variant="outlined"
              fullWidth
              value={descripcion}
              onChange={(e) => handleInputChange(e, setDescripcion)}
              margin="normal"
              multiline
              rows={4}
            />

            {error && (
              <Typography variant="caption" color="error">
                {error}
              </Typography>
            )}

            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1em' }}>
              {editandoDocumentoId ? 'Actualizar' : 'Guardar'}
            </Button>
          </form>
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: 600, width: '100%', marginTop: '2em' }}> {/* Ajusta el alto aquí */}
            <DataGrid
              rows={auditResults} // Cambiado de documentos a auditResults
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </Grid>
      </Grid>

      <Dialog open={openConfirmDelete} onClose={cancelDelete}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas eliminar este resultado de auditoría?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AuditResult;
