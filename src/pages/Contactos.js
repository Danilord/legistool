// src/pages/Contactos.js
import React, { useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Paper,
    Switch,
    FormControlLabel,
    Grid,
    MenuItem
} from '@mui/material';
import { Crib, Delete, Edit, FileCopy } from '@mui/icons-material';
import { useAuth } from '../App';

const Contactos = () => {
    const { user } = useAuth();
    const [primerNombre, setPrimerNombre] = useState('');
    const [segundoNombre, setSegundoNombre] = useState('');
    const [primerApellido, setPrimerApellido] = useState('');
    const [segundoApellido, setSegundoApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [enabled, setEnabled] = useState(false); // Estado para el switch de activo/inactivo
    const [sucursal, setSucursal] = useState('');
    const [contactos, setContactos] = useState([]);
    const [errorPrimerNombre, setErrorPrimerNombre] = useState('');
    const [errorPrimerApellido, setErrorPrimerApellido] = useState('');
    const [errorCorreo, setErrorCorreo] = useState('');
    const [errorSucursal, setErrorSucursal] = useState('');
    const [editandoId, setEditandoId] = useState(null);

    // Datos de ejemplo de sucursales
    const sucursales = [
        { id: 1, nombre: 'Sucursal 1' },
        { id: 2, nombre: 'Sucursal 2' },
        // Agrega más sucursales según sea necesario
    ];

    const handleInputChange = (event, setter, setError) => {
        const value = event.target.value;
        setter(value);
        if (value.trim() === '') {
            setError(`El ${event.target.name} es requerido`);
        } else {
            setError('');
        }
    };

    const handleCorreoChange = (event) => {
        const value = event.target.value;
        setCorreo(value);
        if (value.trim() !== '' && !validateEmail(value)) {
            setErrorCorreo('Formato de correo inválido');
        } else {
            setErrorCorreo('');
        }
    };

    const validateEmail = (email) => {
        // Expresión regular para validar formato de correo electrónico
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Verificar si el primer nombre ya existe en los contactos existentes
        const nombreExistente = contactos.some(
            (contacto) =>
                contacto.primerNombre === primerNombre &&
                contacto.primerApellido === primerApellido &&
                contacto.id !== editandoId
        );

        if (primerNombre.trim() === '') {
            setErrorPrimerNombre('El primer nombre es requerido');
            return;
        } else if (nombreExistente) {
            setErrorPrimerNombre('El nombre ya está en uso');
            return;
        }

        setErrorPrimerNombre('');

        const nuevoContacto = {
            id: editandoId !== null ? editandoId : contactos.length + 1,
            primerNombre,
            segundoNombre,
            primerApellido,
            segundoApellido,
            correo,
            telefono,
            enabled,
            sucursal,
        };

        if (editandoId !== null) {
            const nuevosContactos = contactos.map((contacto) =>
                contacto.id === editandoId ? nuevoContacto : contacto
            );
            setContactos(nuevosContactos);
            setEditandoId(null);
        } else {
            setContactos([...contactos, nuevoContacto]);
        }

        setPrimerNombre('');
        setSegundoNombre('');
        setPrimerApellido('');
        setSegundoApellido('');
        setCorreo('');
        setTelefono('');
        setEnabled(false);
        setSucursal('');
    };

    const handleDelete = (id) => {
        setContactos(contactos.filter((contacto) => contacto.id !== id));
    };

    const handleCopy = (contacto) => {
        setPrimerNombre(contacto.primerNombre);
        setSegundoNombre(contacto.segundoNombre);
        setPrimerApellido(contacto.primerApellido);
        setSegundoApellido(contacto.segundoApellido);
        setCorreo(contacto.correo);
        setTelefono(contacto.telefono);
        setEnabled(contacto.enabled);
        setSucursal(contacto.sucursal);
    };

    const handleEdit = (id) => {
        const contactoEdit = contactos.find((contacto) => contacto.id === id);
        if (contactoEdit) {
            setPrimerNombre(contactoEdit.primerNombre);
            setSegundoNombre(contactoEdit.segundoNombre);
            setPrimerApellido(contactoEdit.primerApellido);
            setSegundoApellido(contactoEdit.segundoApellido);
            setCorreo(contactoEdit.correo);
            setTelefono(contactoEdit.telefono);
            setEnabled(contactoEdit.enabled);
            setSucursal(contactoEdit.sucursal);
            setEditandoId(id);
        }
    };

    return (
        <Container style={{ marginTop: '1em', marginLeft: 0 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Contactos
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <form onSubmit={handleSubmit}>
                    <TextField
                            label="Primer Nombre"
                            variant="outlined"
                            fullWidth
                            value={primerNombre}
                            onChange={(e) =>
                                handleInputChange(e, setPrimerNombre, setErrorPrimerNombre)
                            }
                            margin="normal"
                            error={!!errorPrimerNombre}
                            helperText={errorPrimerNombre}
                            required
                            name="Primer Nombre"
                        />
                        <TextField
                            label="Segundo Nombre"
                            variant="outlined"
                            fullWidth
                            value={segundoNombre}
                            onChange={(e) => handleInputChange(e, setSegundoNombre, () => { })}
                            margin="normal"
                        />
                        <TextField
                            label="Primer Apellido"
                            variant="outlined"
                            fullWidth
                            value={primerApellido}
                            onChange={(e) =>
                                handleInputChange(e, setPrimerApellido, setErrorPrimerApellido)
                            }
                            margin="normal"
                            name="Primer Apellido"
                        />
                        <TextField
                            label="Segundo Apellido"
                            variant="outlined"
                            fullWidth
                            value={segundoApellido}
                            onChange={(e) => handleInputChange(e, setSegundoApellido, () => { })}
                            margin="normal"
                        />
                        <TextField
                            label="Correo"
                            variant="outlined"
                            fullWidth
                            value={correo}
                            onChange={handleCorreoChange}
                            margin="normal"
                            error={!!errorCorreo}
                            helperText={errorCorreo}
                        />
                        <TextField
                            label="Teléfono"
                            variant="outlined"
                            fullWidth
                            value={telefono}
                            onChange={(e) => handleInputChange(e, setTelefono, () => { })}
                            margin="normal"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={enabled}
                                    onChange={(e) => setEnabled(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Activo"
                            labelPlacement="start"
                            style={{ marginTop: '1em' }}
                        />
                        <TextField
                            select
                            label="Sucursal"
                            variant="outlined"
                            fullWidth
                            value={sucursal}
                            onChange={(e) => handleInputChange(e, setSucursal, setErrorSucursal)}
                            margin="normal"
                            error={!!errorSucursal}
                            helperText={errorSucursal}
                            required
                            name="Sucursal"
                        >
                            {sucursales.map((suc) => (
                                <MenuItem key={suc.id} value={suc.nombre}>
                                    {suc.nombre}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button type="submit" variant="contained" color="primary">
                            {editandoId !== null ? 'Guardar Edición' : 'Guardar'}
                        </Button>
                    </form>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper} style={{ marginTop: '2em', overflowX: 'auto' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Primer Nombre</TableCell>
                                    <TableCell>Segundo Nombre</TableCell>
                                    <TableCell>Primer Apellido</TableCell>
                                    <TableCell>Segundo Apellido</TableCell>
                                    <TableCell>Correo</TableCell>
                                    <TableCell>Teléfono</TableCell>
                                    <TableCell>Activo</TableCell>
                                    <TableCell>Sucursal</TableCell>
                                    <TableCell align="right">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {contactos.map((contacto) => (
                                    <TableRow key={contacto.id}>
                                        <TableCell component="th" scope="row">
                                            {contacto.primerNombre}
                                        </TableCell>
                                        <TableCell>{contacto.segundoNombre}</TableCell>
                                        <TableCell>{contacto.primerApellido}</TableCell>
                                        <TableCell>{contacto.segundoApellido}</TableCell>
                                        <TableCell>{contacto.correo}</TableCell>
                                        <TableCell>{contacto.telefono}</TableCell>
                                        <TableCell>{contacto.enabled ? 'Sí' : 'No'}</TableCell>
                                        <TableCell>{contacto.sucursal}</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => handleEdit(contacto.id)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={() => handleCopy(contacto)}>
                                                <FileCopy />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(contacto.id)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Contactos;
