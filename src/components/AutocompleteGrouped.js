import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutocompleteGrouped({ grupos, getGrupoLabel, getElementos, getElementoLabel, value, onChange, label }) {
  const opciones = grupos.flatMap(grupo => 
    getElementos(grupo).map(elemento => ({
      grupo: getGrupoLabel(grupo),
      elemento: getElementoLabel(elemento),
    }))
  );

  return (
    <Autocomplete
      id="grouped-demo"
      options={opciones}
      groupBy={(option) => option.grupo}
      getOptionLabel={(option) => option.elemento}
      renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
      value={value}
      onChange={onChange}
    />
  );
}