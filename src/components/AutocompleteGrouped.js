import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const AutocompleteGrouped = ({
  grupos,
  getGrupoLabel,
  getElementos,
  getElementoLabel,
  value,
  onChange,
  label,
  error,
  helperText,
  margin,
}) => {
  // Preparar las opciones combinadas para el Autocomplete
  const opciones = grupos.flatMap((grupo) =>
    getElementos(grupo).map((elemento) => ({
      grupo,
      elemento,
    }))
  );

  return (
    <Autocomplete
      options={opciones}
      groupBy={(option) => getGrupoLabel(option.grupo)}
      getOptionLabel={(option) =>
        `${getElementoLabel(option.elemento)} - ${getGrupoLabel(option.grupo)}`
      }
      value={value}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={error}
          helperText={helperText}
          margin={margin}
          variant="outlined"
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          {/* {`${getElementoLabel(option.elemento)} (${getGrupoLabel(option.grupo)})`} */}
          {`${getElementoLabel(option.elemento)}`}
        </li>
      )}
    />
  );
};

export default AutocompleteGrouped;
