import api from './api';

const productionService = {
  getSuggestions: async () => {
    const response = await api.get('/products/suggestions');
    return response.data;
  }
};

export default productionService;