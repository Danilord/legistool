import React, { useState, useEffect } from 'react';
import {
    Container,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import CancelIcon from '@mui/icons-material/CancelOutlined';

const VistaChecklist = ({ isAdmin = true }) => {
    const [sucursal, setSucursal] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [filtroRequerimiento, setFiltroRequerimiento] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [checklists, setChecklists] = useState([]);

    const [organizacion, setOrganizacion] = useState('');

    const organizaciones = [
        { nombre: 'Organización 1', elementos: ['Sucursal 1-1', 'Sucursal 1-2'] },
        { nombre: 'Organización 2', elementos: ['Sucursal 2-1', 'Sucursal 2-2'] },
        { nombre: 'Organización 3', elementos: ['Sucursal 3-1', 'Sucursal 3-2'] },
    ];

    const requerimientos = [
        { nombre: 'Categoría 1 Tierra', elementos: ['Nombre del requerimiento Cat 1-1', 'Nombre del requerimiento Cat 1-2', 'Nombre del requerimiento Cat 1-3'] },
        { nombre: 'Categoría 2 Agua', elementos: ['Nombre del requerimiento Cat 2-1', 'Nombre del requerimiento Cat 2-2', 'Nombre del requerimiento Cat 2-3'] },
        { nombre: 'Categoría 3 Aire', elementos: ['Nombre del requerimiento Cat 3-1', 'Nombre del requerimiento Cat 3-2', 'Nombre del requerimiento Cat 3-3'] },
        { nombre: 'Categoría 4 Fuego', elementos: ['Nombre del requerimiento Cat 4-1', 'Nombre del requerimiento Cat 4-2', 'Nombre del requerimiento Cat 4-3'] },
    ];

    useEffect(() => {
        setChecklists([
            { id: 1, requerimiento: 'Nombre del requerimiento Cat 1-1', sucursal: 'Sucursal 1-1', estado: 'Cumple', periodo: 2024 },
            { id: 2, requerimiento: 'Nombre del requerimiento Cat 1-2', sucursal: 'Sucursal 1-1', estado: 'Observacion', periodo: 2024 },
            { id: 3, requerimiento: 'Nombre del requerimiento Cat 1-3', sucursal: 'Sucursal 1-2', estado: 'No Cumple', periodo: 2024 },
            { id: 4, requerimiento: 'Nombre del requerimiento Cat 2-1', sucursal: 'Sucursal 2-1', estado: 'Cumple', periodo: 2024 },
            { id: 5, requerimiento: 'Nombre del requerimiento Cat 2-2', sucursal: 'Sucursal 2-1', estado: 'Observacion', periodo: 2024 },
            { id: 6, requerimiento: 'Nombre del requerimiento Cat 2-3', sucursal: 'Sucursal 2-2', estado: 'No Cumple', periodo: 2024 },
            { id: 7, requerimiento: 'Nombre del requerimiento Cat 3-1', sucursal: 'Sucursal 3-1', estado: 'Cumple', periodo: 2024 },
            { id: 8, requerimiento: 'Nombre del requerimiento Cat 3-2', sucursal: 'Sucursal 3-1', estado: 'Observacion', periodo: 2024 },
            { id: 9, requerimiento: 'Nombre del requerimiento Cat 3-3', sucursal: 'Sucursal 3-2', estado: 'No Cumple', periodo: 2024 },
            { id: 10, requerimiento: 'Nombre del requerimiento Cat 4-1', sucursal: 'Sucursal 3-2', estado: 'Cumple', periodo: 2024 },
            { id: 11, requerimiento: 'Nombre del requerimiento Cat 4-2', sucursal: 'Sucursal 3-1', estado: 'Observacion', periodo: 2024 },
            { id: 12, requerimiento: 'Nombre del requerimiento Cat 4-3', sucursal: 'Sucursal 2-2', estado: 'No Cumple', periodo: 2024 },
        ]);
    }, []);

    const limpiarFiltros = () => {
        setSearchQuery('');
        setFiltroCategoria('');
        setFiltroRequerimiento('');
        setFiltroEstado('');
        setSucursal('');
        setOrganizacion('');
    };

    const checklistsFiltrados = checklists.filter((checklist) => {
        const filtroRequerimientoAplicado = !filtroRequerimiento || checklist.requerimiento.includes(filtroRequerimiento);
        const filtroEstadoAplicado = !filtroEstado || checklist.estado === filtroEstado;
        const filtroCategoriaAplicado = !filtroCategoria || requerimientos.find(c => c.nombre === filtroCategoria)?.elementos.includes(checklist.requerimiento);
        const filtroSucursalAplicado = !isAdmin || !sucursal || checklist.sucursal === sucursal;
        const filtroOrganizacionAplicado = !isAdmin || !organizacion || organizaciones.find(o => o.nombre === organizacion)?.elementos.includes(checklist.sucursal);

        return (
            filtroRequerimientoAplicado &&
            filtroEstadoAplicado &&
            filtroCategoriaAplicado &&
            filtroSucursalAplicado &&
            filtroOrganizacionAplicado
        );
    });

    return (
        <Container style={{ marginTop: '1em' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Checklist del periodo 2024
            </Typography>

            {isAdmin && (
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Organización</InputLabel>
                            <Select
                                value={organizacion}
                                onChange={(e) => {
                                    const selectedOrganizacion = e.target.value;
                                    setOrganizacion(selectedOrganizacion);
                                    // Set the sucursal to an empty value when changing organization
                                    setSucursal('');
                                }}
                            >
                                <MenuItem value="">Seleccione una organización</MenuItem>
                                {organizaciones.map((org, index) => (
                                    <MenuItem key={index} value={org.nombre}>
                                        {org.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Sucursal</InputLabel>
                            <Select
                                value={sucursal}
                                onChange={(e) => setSucursal(e.target.value)}
                            >
                                <MenuItem value="">Seleccione una sucursal</MenuItem>
                                {organizaciones.find(o => o.nombre === organizacion)?.elementos.map((suc, index) => (
                                    <MenuItem key={index} value={suc}>
                                        {suc}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            )}

            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Categoría</InputLabel>
                        <Select
                            value={filtroCategoria}
                            onChange={(e) => setFiltroCategoria(e.target.value)}
                        >
                            <MenuItem value="">Seleccione una categoría</MenuItem>
                            {requerimientos.map((categoria, index) => (
                                <MenuItem key={index} value={categoria.nombre}>
                                    {categoria.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        fullWidth
                        label="Nombre de Requerimiento"
                        variant="outlined"
                        value={filtroRequerimiento}
                        onChange={(e) => setFiltroRequerimiento(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Estado</InputLabel>
                        <Select
                            value={filtroEstado}
                            onChange={(e) => setFiltroEstado(e.target.value)}
                        >
                            <MenuItem value="">Seleccione un estado</MenuItem>
                            <MenuItem value="Cumple">Cumple</MenuItem>
                            <MenuItem value="Observacion">Observación</MenuItem>
                            <MenuItem value="No Cumple">No Cumple</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button variant="contained" color="primary" onClick={limpiarFiltros}>
                        Limpiar Filtros
                        </Button>
                </Grid>
            </Grid>

            <TableContainer component={Paper} style={{ marginTop: '1em' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Requerimiento</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Periodo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requerimientos.map((categoria, index) => {
                            // Filtrar los checklists según los filtros aplicados
                            const elementosFiltrados = checklistsFiltrados.filter((checklist) => {
                                const filtroCategoriaAplicado = !filtroCategoria || categoria.nombre === filtroCategoria;

                                return (
                                    categoria.elementos.includes(checklist.requerimiento) &&
                                    filtroCategoriaAplicado
                                );
                            });

                            if (elementosFiltrados.length === 0) {
                                // Si no hay elementos filtrados en esta categoría, no mostramos la categoría
                                return null;
                            }

                            return (
                                <React.Fragment key={index}>
                                    <TableRow>
                                        <TableCell colSpan={3} style={{ fontWeight: 'bold' }}>
                                            {categoria.nombre}
                                        </TableCell>
                                    </TableRow>
                                    {elementosFiltrados.map((checklist) => (
                                        <TableRow key={checklist.id}>
                                            <TableCell>{checklist.requerimiento}</TableCell>
                                            <TableCell>
                                                {checklist.estado === 'Cumple' && (
                                                    <>
                                                        <CheckCircleIcon style={{ color: 'green', marginRight: '0.5em' }} />
                                                        Cumple
                                                    </>
                                                )}
                                                {checklist.estado === 'Observacion' && (
                                                    <>
                                                        <ErrorIcon style={{ color: 'orange', marginRight: '0.5em' }} />
                                                        Observación
                                                    </>
                                                )}
                                                {checklist.estado === 'No Cumple' && (
                                                    <>
                                                        <CancelIcon style={{ color: 'red', marginRight: '0.5em' }} />
                                                        No Cumple
                                                    </>
                                                )}
                                            </TableCell>
                                            <TableCell>{checklist.periodo}</TableCell>
                                        </TableRow>
                                    ))}
                                </React.Fragment>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default VistaChecklist;
