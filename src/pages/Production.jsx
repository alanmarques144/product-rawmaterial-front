import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, Button, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, CircularProgress, Card, CardContent, Grid
} from '@mui/material';
import { Calculate as CalculateIcon } from '@mui/icons-material';

import { fetchSuggestions } from '../store/slices/productionSlice';

export default function Production() {
  const dispatch = useDispatch();
  const { suggestions, totalValue, status, error } = useSelector((state) => state.production);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSuggestions());
    }
  }, [status, dispatch]);

  const handleRefresh = () => {
    dispatch(fetchSuggestions());
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Production Suggestion Plan
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          startIcon={<CalculateIcon />} 
          onClick={handleRefresh}
          sx={{ color: '#fff', fontWeight: 'bold' }}
        >
          Recalculate Plan
        </Button>
      </Box>

      {status === 'loading' && <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />}
      {status === 'failed' && <Typography color="error">Error to calculate production: {error}</Typography>}

      {status === 'succeeded' && (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: 'primary.main', color: '#fff', borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
                    Estimated Gross Revenue
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 1, color: 'secondary.main' }}>
                    ${totalValue.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
                    Maximization based on current inventory
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ mb: 2, color: 'primary.dark' }}>
            Items for Manufacturing
          </Typography>
          
          <TableContainer component={Paper} elevation={2}>
            <Table>
              <TableHead sx={{ backgroundColor: 'primary.main' }}>
                <TableRow>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Suggested Product</TableCell>
                  <TableCell align="right" sx={{ color: '#fff', fontWeight: 'bold' }}>Quantity to Produce (units)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {suggestions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1" color="textSecondary">
                        Insufficient stock. There are not enough raw materials to manufacture any of the listed products.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  suggestions.map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell sx={{ fontSize: '1.05rem' }}>{row.productName}</TableCell>
                      <TableCell align="right" sx={{ fontSize: '1.05rem', fontWeight: 'bold', color: 'primary.main' }}>
                        {row.quantityToProduce}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
}