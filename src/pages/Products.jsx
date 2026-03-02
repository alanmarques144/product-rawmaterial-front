import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, Button, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, Dialog, 
  DialogTitle, DialogContent, DialogActions, TextField, CircularProgress,
  MenuItem, Select, InputLabel, FormControl, Grid
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, RemoveCircleOutline } from '@mui/icons-material';

import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../store/slices/productSlice';
import { fetchRawMaterials } from '../store/slices/rawMaterialSlice';

export default function Products() {
  const dispatch = useDispatch();
  
  const { items: products, status: prodStatus } = useSelector((state) => state.products);
  const { items: rawMaterials, status: rmStatus } = useSelector((state) => state.rawMaterials);

  const [open, setOpen] = useState(false);
  const [editingCode, setEditingCode] = useState(null);
  

  const [formData, setFormData] = useState({ 
    name: '', 
    priceValue: '', 
    requiredMaterials: [] 
  });

  useEffect(() => {
    if (prodStatus === 'idle') dispatch(fetchProducts());
    if (rmStatus === 'idle') dispatch(fetchRawMaterials());
  }, [prodStatus, rmStatus, dispatch]);

  const handleOpen = (product = null) => {
    if (product) {
      setEditingCode(product.code);
      setFormData({ 
        name: product.name, 
        priceValue: product.priceValue,
        requiredMaterials: product.requiredMaterials || []
      });
    } else {
      setEditingCode(null);
      setFormData({ name: '', priceValue: '', requiredMaterials: [] });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCode(null);
  };

  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addMaterialRow = () => {
    setFormData({
      ...formData,
      requiredMaterials: [...formData.requiredMaterials, { rawMaterialCode: '', quantityNeeded: '' }]
    });
  };

  const removeMaterialRow = (index) => {
    const updatedMaterials = formData.requiredMaterials.filter((_, i) => i !== index);
    setFormData({ ...formData, requiredMaterials: updatedMaterials });
  };

  const handleMaterialChange = (index, field, value) => {
    const updatedMaterials = [...formData.requiredMaterials];
    updatedMaterials[index] = { ...updatedMaterials[index], [field]: value };
    setFormData({ ...formData, requiredMaterials: updatedMaterials });
  };

  const handleSubmit = () => {
    const payload = {
      ...formData,
      priceValue: parseFloat(formData.priceValue),
      requiredMaterials: formData.requiredMaterials.map(rm => ({
        rawMaterialCode: rm.rawMaterialCode,
        quantityNeeded: parseInt(rm.quantityNeeded, 10)
      }))
    };

    if (editingCode) {
      dispatch(updateProduct({ code: editingCode, data: payload }));
    } else {
      dispatch(createProduct(payload));
    }
    handleClose();
  };

  const handleDelete = (code) => {
    if (window.confirm('Delete this product and its formulas?')) {
      dispatch(deleteProduct(code));
    }
  };

  // Função auxiliar para achar o nome da matéria prima pelo código (para exibir na tabela)
  const getMaterialName = (code) => {
    const material = rawMaterials.find(rm => rm.code === code);
    return material ? material.name : 'Unknown Material';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Products and Formulas
        </Typography>
        <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => handleOpen()} sx={{ color: '#fff' }}>
          New Product
        </Button>
      </Box>

      {prodStatus === 'loading' && <CircularProgress sx={{ display: 'block', margin: 'auto' }} />}

      {prodStatus === 'succeeded' && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: 'primary.main' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Product</TableCell>
                <TableCell align="right" sx={{ color: '#fff', fontWeight: 'bold' }}>Base Value ($)</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Required Raw Materials</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length === 0 ? (
                <TableRow><TableCell colSpan={4} align="center">No products registered.</TableCell></TableRow>
              ) : (
                products.map((row) => (
                  <TableRow key={row.code} hover>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">{row.priceValue.toFixed(2)}</TableCell>
                    <TableCell>
                      {row.requiredMaterials.length === 0 ? '-' : 
                        row.requiredMaterials.map(rm => (
                          <div key={rm.rawMaterialCode}>
                            {rm.quantityNeeded}g - {getMaterialName(rm.rawMaterialCode)}
                          </div>
                        ))
                      }
                    </TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => handleOpen(row)}><EditIcon /></IconButton>
                      <IconButton color="error" onClick={() => handleDelete(row.code)}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modal de Formulário */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{editingCode ? 'Update Product' : 'New Product'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={8}>
              <TextField fullWidth label="Product Name" name="name" value={formData.name} onChange={handleBasicChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Value ($)" name="priceValue" type="number" value={formData.priceValue} onChange={handleBasicChange} />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 4 }}>
            <Typography variant="h6" sx={{ color: 'primary.main' }}>Recipe / Technical Sheet</Typography>
            <Button size="small" variant="outlined" startIcon={<AddIcon />} onClick={addMaterialRow}>
              Add Raw Material
            </Button>
          </Box>

          {formData.requiredMaterials.map((rm, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 2, alignItems: 'center' }}>
              <Grid item xs={7}>
                <FormControl fullWidth size="small">
                  <InputLabel>Raw Material</InputLabel>
                  <Select
                    value={rm.rawMaterialCode}
                    label="Raw Material"
                    onChange={(e) => handleMaterialChange(index, 'rawMaterialCode', e.target.value)}
                  >
                    {rawMaterials.map(material => (
                      <MenuItem key={material.code} value={material.code}>
                        {material.name} (Stock: {material.stockQuantity}g)
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField 
                  fullWidth size="small" label="Quantity Needed (g)" type="number" 
                  value={rm.quantityNeeded} onChange={(e) => handleMaterialChange(index, 'quantityNeeded', e.target.value)} 
                />
              </Grid>
              <Grid item xs={1} sx={{ textAlign: 'center' }}>
                <IconButton color="error" onClick={() => removeMaterialRow(index)}>
                  <RemoveCircleOutline />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          {formData.requiredMaterials.length === 0 && (
            <Typography variant="body2" color="textSecondary" align="center" sx={{ py: 2, fontStyle: 'italic' }}>
              There are no raw materials associated. Click "Add Product".
            </Typography>
          )}

        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Save Product</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}