import api from './api';

const productService = {
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  
  create: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },
  
  update: async (code, productData) => {
    const response = await api.put(`/products/${code}`, productData);
    return response.data;
  },
  
  delete: async (code) => {
    await api.delete(`/products/${code}`);
    return code;
  }
};

export default productService;