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
    Grid
} from '@mui/material';
import { Delete, Edit, ContentCopy } from '@mui/icons-material';
import { useAuth } from '../App';

const Categorias = () => {
    const { user } = useAuth();
    const [nombre, setNombre] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [errorNombre, setErrorNombre] = useState('');
    const [editandoId, setEditandoId] = useState(null);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setNombre(value);
        if (value.trim() === '') {
            setErrorNombre('El nombre es requerido');
        } else {
            setErrorNombre('');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const nombreExistente = categorias.some(
            (categoria) => categoria.nombre === nombre && categoria.id !== editandoId
        );

        if (nombre.trim() === '') {
            setErrorNombre('El nombre es requerido');
            return;
        } else if (nombreExistente) {
            setErrorNombre('El nombre ya está en uso');
            return;
        }

        setErrorNombre('');

        const nuevaCategoria = {
            id: editandoId !== null ? editandoId : categorias.length + 1,
            nombre,
        };

        if (editandoId !== null) {
            const nuevasCategorias = categorias.map((categoria) =>
                categoria.id === editandoId ? nuevaCategoria : categoria
            );
            setCategorias(nuevasCategorias);
            setEditandoId(null);
        } else {
            setCategorias([...categorias, nuevaCategoria]);
        }

        setNombre('');
    };

    const handleDelete = (id) => {
        setCategorias(categorias.filter((categoria) => categoria.id !== id));
    };

    const handleEdit = (id) => {
        const categoriaEdit = categorias.find((categoria) => categoria.id === id);
        if (categoriaEdit) {
            setNombre(categoriaEdit.nombre);
            setEditandoId(id);
        }
    };

    const handleCopy = (id) => {
        const categoriaCopy = categorias.find((categoria) => categoria.id === id);
        if (categoriaCopy) {
            const nuevaCategoria = {
                id: categorias.length + 1,
                nombre: `${categoriaCopy.nombre} (copia)`,
            };
            setCategorias([...categorias, nuevaCategoria]);
        }
    };

    return (
        <Container style={{ marginTop: '1em', marginLeft: 0 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Categorías
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Nombre"
                            variant="outlined"
                            fullWidth
                            value={nombre}
                            onChange={handleInputChange}
                            margin="normal"
                            error={!!errorNombre}
                            helperText={errorNombre}
                            required
                            name="Nombre"
                        />
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
                                    <TableCell>Nombre</TableCell>
                                    <TableCell align="right">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categorias.map((categoria) => (
                                    <TableRow key={categoria.id}>
                                        <TableCell component="th" scope="row">
                                            {categoria.nombre}
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => handleEdit(categoria.id)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={() => handleCopy(categoria.id)}>
                                                <ContentCopy />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(categoria.id)}>
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

export default Categorias;
