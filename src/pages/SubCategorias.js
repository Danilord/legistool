import React, { useState, useEffect } from 'react';
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
    Grid,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import { Delete, Edit, ContentCopy } from '@mui/icons-material';
import { useAuth } from '../App';

const SubCategorias = () => {
    const { user } = useAuth(); // Asegurarse de que `useAuth` esté correctamente definido y utilizado
    const [nombre, setNombre] = useState('');
    const [subCategorias, setSubCategorias] = useState([]);
    const [categorias, setCategorias] = useState([]); // Lista de categorías
    const [selectedCategoria, setSelectedCategoria] = useState(''); // Categoría seleccionada
    const [errorNombre, setErrorNombre] = useState('');
    const [errorCategoria, setErrorCategoria] = useState('');
    const [editandoId, setEditandoId] = useState(null);

    // Ejemplo de lista de categorías
    const listaCategorias = [
        { id: 1, nombre: 'Categoría 1' },
        { id: 2, nombre: 'Categoría 2' },
        { id: 3, nombre: 'Categoría 3' },
    ];

    // Simular carga de categorías (normalmente se cargarían desde una API o base de datos)
    useEffect(() => {
        setCategorias(listaCategorias);
    }, []);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setNombre(value);
        if (value.trim() === '') {
            setErrorNombre('El nombre es requerido');
        } else {
            setErrorNombre('');
        }
    };

    const handleCategoriaChange = (event) => {
        setSelectedCategoria(event.target.value);
        setErrorCategoria('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const nombreExistente = subCategorias.some(
            (subCategoria) => subCategoria.nombre === nombre && subCategoria.id !== editandoId
        );

        if (nombre.trim() === '') {
            setErrorNombre('El nombre es requerido');
            return;
        }

        if (selectedCategoria.trim() === '') {
            setErrorCategoria('La categoría es requerida');
            return;
        }

        if (nombreExistente) {
            setErrorNombre('El nombre ya está en uso');
            return;
        }

        setErrorNombre('');
        setErrorCategoria('');

        const nuevaSubCategoria = {
            id: editandoId !== null ? editandoId : subCategorias.length + 1,
            nombre,
            categoria: selectedCategoria,
        };

        if (editandoId !== null) {
            const nuevasSubCategorias = subCategorias.map((subCategoria) =>
                subCategoria.id === editandoId ? nuevaSubCategoria : subCategoria
            );
            setSubCategorias(nuevasSubCategorias);
            setEditandoId(null);
        } else {
            setSubCategorias([...subCategorias, nuevaSubCategoria]);
        }

        setNombre('');
        setSelectedCategoria('');
    };

    const handleDelete = (id) => {
        setSubCategorias(subCategorias.filter((subCategoria) => subCategoria.id !== id));
    };

    const handleEdit = (id) => {
        const subCategoriaEdit = subCategorias.find((subCategoria) => subCategoria.id === id);
        if (subCategoriaEdit) {
            setNombre(subCategoriaEdit.nombre);
            setSelectedCategoria(subCategoriaEdit.categoria);
            setEditandoId(id);
        }
    };

    const handleCopy = (id) => {
        const subCategoriaCopy = subCategorias.find((subCategoria) => subCategoria.id === id);
        if (subCategoriaCopy) {
            const nuevaSubCategoria = {
                id: subCategorias.length + 1,
                nombre: `${subCategoriaCopy.nombre} (copia)`,
                categoria: subCategoriaCopy.categoria,
            };
            setSubCategorias([...subCategorias, nuevaSubCategoria]);
        }
    };

    return (
        <Container style={{ marginTop: '1em', marginLeft: 0 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Sub Categorías
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
                        <FormControl fullWidth margin="normal" required error={!!errorCategoria}>
                            <InputLabel id="select-categoria-label">Categoría</InputLabel>
                            <Select
                                label="Categoría"
                                labelId="select-categoria-label"
                                id="select-categoria"
                                value={selectedCategoria}
                                onChange={handleCategoriaChange}
                                variant="outlined"
                            >
                                <MenuItem value="">Seleccione una categoría</MenuItem>
                                {categorias.map((categoria) => (
                                    <MenuItem key={categoria.id} value={categoria.nombre}>
                                        {categoria.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {errorCategoria && (
                            <Typography variant="caption" color="error">
                                {errorCategoria}
                            </Typography>
                        )}
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
                                    <TableCell>Categoría</TableCell>
                                    <TableCell align="right">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {subCategorias.map((subCategoria) => (
                                    <TableRow key={subCategoria.id}>
                                        <TableCell component="th" scope="row">
                                            {subCategoria.nombre}
                                        </TableCell>
                                        <TableCell>{subCategoria.categoria}</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => handleEdit(subCategoria.id)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={() => handleCopy(subCategoria.id)}>
                                                <ContentCopy />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(subCategoria.id)}>
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

export default SubCategorias;
