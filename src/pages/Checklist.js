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
  ListSubheader,
  Switch,
  FormControlLabel
} from '@mui/material';
import GroupedSelect from '../components/GroupSelect'; // Asegúrate de que la ruta sea correcta

const Checklist = () => {
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [status, setStatus] = useState(false);

  // Datos locales para GroupedSelect
  const categorias = [
    { id: 1, nombre: 'Categoría 1' },
    { id: 2, nombre: 'Categoría 2' },
  ];

  const requerimientos = [
    { id: 1, categoriaId: 1, nombre: 'Requerimiento 1' },
    { id: 2, categoriaId: 1, nombre: 'Requerimiento 2' },
    { id: 3, categoriaId: 2, nombre: 'Requerimiento 3' },
    { id: 4, categoriaId: 2, nombre: 'Requerimiento 4' },
  ];

  const handleSucursalChange = (event) => {
    setSucursalSeleccionada(event.target.value);
  };

  const handleCategoriaChange = (event) => {
    // Aquí puedes agregar lógica para manejar el cambio en las categorías
  };

  const handleRequerimientoChange = (event) => {
    // Aquí puedes agregar lógica para manejar el cambio en los requerimientos
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Maneja el envío del formulario aquí
  };

  return (
    <Container style={{ marginTop: '1em', marginLeft: 0 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Checklist
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
                onChange={handleSucursalChange}
                variant="outlined"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="Sucursal 1">Sucursal 1</MenuItem>
                <MenuItem value="Sucursal 2">Sucursal 2</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <GroupedSelect
                categorias={categorias}
                requerimientos={requerimientos}
                onCategoriaChange={handleCategoriaChange}
                onRequerimientoChange={handleRequerimientoChange}
              />
            </FormControl>

            <TextField
              label="Descripción"
              variant="outlined"
              fullWidth
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              margin="normal"
              multiline
              rows={4}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={status}
                  onChange={handleStatusChange}
                  color="primary"
                />
              }
              label="Status"
              labelPlacement="start"
              style={{ marginTop: '1em' }}
            />

            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1em' }}>
              Guardar
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checklist;
