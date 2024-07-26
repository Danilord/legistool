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
import DownloadIcon from '@mui/icons-material/Download';

const PermisosSucursal = () => {
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
  const [permisoSeleccionado, setPermisoSeleccionado] = useState('');
  const [tipoDocumentoSeleccionado, setTipoDocumentoSeleccionado] = useState('');
  const [grantDate, setGrantDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [permisosList, setPermisosList] = useState([]);
  const [editandoPermisoId, setEditandoPermisoId] = useState(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [permisoAEliminar, setPermisoAEliminar] = useState(null);

  const sucursales = [
    { id: 1, nombre: 'Sucursal 1' },
    { id: 2, nombre: 'Sucursal 2' },
  ];

  const permisos = [
    { id: 1, nombre: 'Permiso 1' },
    { id: 2, nombre: 'Permiso 2' },
  ];

  const tiposDocumentos = [
    { id: 1, nombre: 'Tipo Documento 1' },
    { id: 2, nombre: 'Tipo Documento 2' },
  ];

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !sucursalSeleccionada ||
      !permisoSeleccionado ||
      !tipoDocumentoSeleccionado ||
      !grantDate ||
      !expirationDate ||
      !url
    ) {
      setError('Todos los campos son requeridos');
      return;
    }

    setError('');

    const nuevoPermiso = {
      id: editandoPermisoId ? editandoPermisoId : permisosList.length + 1,
      sucursal: sucursalSeleccionada,
      permiso: permisoSeleccionado,
      tipoDocumento: tipoDocumentoSeleccionado,
      fechaConcesion: grantDate,
      fechaExpiracion: expirationDate,
      descripcion: descripcion,
      url: url,
    };

    if (editandoPermisoId) {
      setPermisosList(
        permisosList.map((perm) =>
          perm.id === editandoPermisoId ? nuevoPermiso : perm
        )
      );
    } else {
      setPermisosList([...permisosList, nuevoPermiso]);
    }

    resetFormulario();
  };

  const resetFormulario = () => {
    setSucursalSeleccionada('');
    setPermisoSeleccionado('');
    setTipoDocumentoSeleccionado('');
    setGrantDate('');
    setExpirationDate('');
    setDescripcion('');
    setUrl('');
    setEditandoPermisoId(null);
  };

  const handleEdit = (id) => {
    const permiso = permisosList.find((perm) => perm.id === id);
    if (permiso) {
      setSucursalSeleccionada(permiso.sucursal);
      setPermisoSeleccionado(permiso.permiso);
      setTipoDocumentoSeleccionado(permiso.tipoDocumento);
      setGrantDate(permiso.fechaConcesion);
      setExpirationDate(permiso.fechaExpiracion);
      setDescripcion(permiso.descripcion);
      setUrl(permiso.url);
      setEditandoPermisoId(id);
    }
  };

  const handleDelete = (id) => {
    setPermisoAEliminar(id);
    setOpenConfirmDelete(true);
  };

  const confirmDelete = () => {
    setPermisosList(permisosList.filter((perm) => perm.id !== permisoAEliminar));
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
    { field: 'sucursal', headerName: 'Sucursal', flex: 1 },
    { field: 'permiso', headerName: 'Permiso', flex: 1 },
    { field: 'tipoDocumento', headerName: 'Tipo de Documento', flex: 1.5 },
    { field: 'fechaConcesion', headerName: 'Fecha de Concesión', width: 180 },
    { field: 'fechaExpiracion', headerName: 'Fecha de Expiración', width: 180 },
    { field: 'descripcion', headerName: 'Descripción', flex: 1 },
    { field: 'url', headerName: 'URL', flex: 1 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => handleDownload(params.row.url, params.row.sucursal)}>
            <DownloadIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Container style={{ marginTop: '1em', marginLeft: 0 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Permisos Sucursal
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
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
              <InputLabel id="select-permiso-label">Permiso</InputLabel>
              <Select
                label="Permiso"
                labelId="select-permiso-label"
                id="select-permiso"
                value={permisoSeleccionado}
                onChange={(e) => handleInputChange(e, setPermisoSeleccionado)}
                variant="outlined"
              >
                {permisos.map((perm) => (
                  <MenuItem key={perm.id} value={perm.nombre}>
                    {perm.nombre}
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
              label="Fecha de Otorgamiento"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              fullWidth
              value={grantDate}
              onChange={(e) => handleInputChange(e, setGrantDate)}
              margin="normal"
            />

            <TextField
              label="Fecha de Expiración"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              fullWidth
              value={expirationDate}
              onChange={(e) => handleInputChange(e, setExpirationDate)}
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

            <TextField
              label="URL"
              variant="outlined"
              fullWidth
              value={url}
              onChange={(e) => handleInputChange(e, setUrl)}
              margin="normal"
            />

            {error && <Typography color="error">{error}</Typography>}

            <Button type="submit" variant="contained" color="primary">
              {editandoPermisoId ? 'Actualizar Permiso' : 'Agregar Permiso'}
            </Button>
          </form>
        </Grid>

        <Grid item xs={12}>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={permisosList}
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
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas eliminar este permiso?</Typography>
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

export default PermisosSucursal;

