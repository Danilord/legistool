import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const GroupedSelect = ({ categorias, requerimientos, onCategoriaChange, onRequerimientoChange }) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="grouped-select">Categorías y Requerimientos</InputLabel>
      <Select
        id="grouped-select"
        label="Categorías y Requerimientos"
        onChange={onCategoriaChange}
      >
        {categorias.map((categoria) => (
          <React.Fragment key={categoria.id}>
            <ListSubheader>{categoria.nombre}</ListSubheader>
            {requerimientos
              .filter(req => req.categoriaId === categoria.id)
              .map((req) => (
                <MenuItem key={req.id} value={req.id}>
                  {req.nombre}
                </MenuItem>
              ))}
          </React.Fragment>
        ))}
      </Select>
    </FormControl>
  );
};

export default GroupedSelect;
