import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Requerimientos = () => {
  const [descripcion, setDescripcion] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [requerimientos, setRequerimientos] = useState([]);
  const [editandoRequerimientoId, setEditandoRequerimientoId] = useState(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [requerimientoAEliminar, setRequerimientoAEliminar] = useState(null);

  const categorias = [
    { id: 1, nombre: 'Categoría 1' },
    { id: 2, nombre: 'Categoría 2' },
  ];

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!descripcion || !categoriaSeleccionada) {
      alert('Todos los campos son requeridos');
      return;
    }

    const nuevoRequerimiento = {
      id: editandoRequerimientoId ? editandoRequerimientoId : requerimientos.length + 1,
      descripcion,
      categoria: categoriaSeleccionada,
    };

    if (editandoRequerimientoId) {
      // Editar el requerimiento existente
      setRequerimientos(
        requerimientos.map((req) =>
          req.id === editandoRequerimientoId ? nuevoRequerimiento : req
        )
      );
    } else {
      // Añadir el nuevo requerimiento a la lista
      setRequerimientos([...requerimientos, nuevoRequerimiento]);
    }

    // Limpiar los campos del formulario y resetear el modo de edición
    resetFormulario();
  };

  const resetFormulario = () => {
    setDescripcion('');
    setCategoriaSeleccionada('');
    setEditandoRequerimientoId(null);
  };

  const handleEdit = (id) => {
    const requerimiento = requerimientos.find((req) => req.id === id);
    if (requerimiento) {
      setDescripcion(requerimiento.descripcion);
      setCategoriaSeleccionada(requerimiento.categoria);
      setEditandoRequerimientoId(id);
    }
  };

  const handleDelete = (id) => {
    setRequerimientoAEliminar(id);
    setOpenConfirmDelete(true);
  };

  const confirmDelete = () => {
    setRequerimientos(requerimientos.filter((req) => req.id !== requerimientoAEliminar));
    setOpenConfirmDelete(false);
  };

  const cancelDelete = () => {
    setOpenConfirmDelete(false);
  };

  const columns = [
    { field: 'descripcion', headerName: 'Descripción', flex: 1 },
    { field: 'categoria', headerName: 'Categoría', flex: 1 },
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
        </>
      ),
    },
  ];

  return (
    <Container style={{ marginTop: '1em', marginLeft: 0 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Requerimientos
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>

            <FormControl fullWidth margin="normal">
              <InputLabel id="select-categoria-label">Categoría</InputLabel>
              <Select
                label="Categoría"
                labelId="select-categoria-label"
                id="select-categoria"
                value={categoriaSeleccionada}
                onChange={(e) => handleInputChange(e, setCategoriaSeleccionada)}
                variant="outlined"
              >
                {categorias.map((cat) => (
                  <MenuItem key={cat.id} value={cat.nombre}>
                    {cat.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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

            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1em' }}>
              {editandoRequerimientoId ? 'Actualizar' : 'Guardar'}
            </Button>
          </form>
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: 600, width: '100%', marginTop: '2em' }}>
            <DataGrid
              rows={requerimientos}
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
          <Typography>¿Estás seguro de que deseas eliminar este requerimiento?</Typography>
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

export default Requerimientos;
