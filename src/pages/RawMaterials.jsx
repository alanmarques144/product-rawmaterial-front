import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, Button, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, Dialog, 
  DialogTitle, DialogContent, DialogActions, TextField, CircularProgress
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';


import { 
  fetchRawMaterials, createRawMaterial, 
  updateRawMaterial, deleteRawMaterial 
} from '../store/slices/rawMaterialSlice';

export default function RawMaterials() {
  const dispatch = useDispatch();
  

  const { items, status, error } = useSelector((state) => state.rawMaterials);


  const [open, setOpen] = useState(false);
  const [editingCode, setEditingCode] = useState(null);
  const [formData, setFormData] = useState({ name: '', stockQuantity: 0 });


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRawMaterials());
    }
  }, [status, dispatch]);


  const handleOpen = (material = null) => {
    if (material) {
      setEditingCode(material.code);
      setFormData({ name: material.name, stockQuantity: material.stockQuantity });
    } else {
      setEditingCode(null);
      setFormData({ name: '', stockQuantity: 0 });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCode(null);
    setFormData({ name: '', stockQuantity: 0 });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'stockQuantity' ? Number(value) : value
    });
  };


  const handleSubmit = () => {
    if (editingCode) {
      dispatch(updateRawMaterial({ code: editingCode, data: formData }));
    } else {
      dispatch(createRawMaterial(formData));
    }
    handleClose();
  };


  const handleDelete = (code) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteRawMaterial(code));
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Catalog Raw Materials
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          sx={{ color: '#fff', fontWeight: 'bold' }} 
        >
          New Raw Material
        </Button>
      </Box>


      {status === 'loading' && <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />}
      {status === 'failed' && <Typography color="error">Error loading: {error}</Typography>}

 
      {status === 'succeeded' && (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead sx={{ backgroundColor: 'primary.main' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Raw Material Name</TableCell>
                <TableCell align="right" sx={{ color: '#fff', fontWeight: 'bold' }}>Stock Quantity (g)</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">No raw materials listed..</TableCell>
                </TableRow>
              ) : (
                items.map((row) => (
                  <TableRow key={row.code} hover>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">{row.stockQuantity}</TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => handleOpen(row)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(row.code)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}


      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editingCode ? 'Editar Matéria-Prima' : 'Nova Matéria-Prima'}</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            label="Raw Material Name"
            name="name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Stock Quantity (g)"
            name="stockQuantity"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.stockQuantity}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit">Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}