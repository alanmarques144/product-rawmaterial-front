import api from './api';

const rawMaterialService = {
  getAll: async () => {
    const response = await api.get('/raw-materials');
    return response.data;
  },
  
  create: async (rawMaterialData) => {
    const response = await api.post('/raw-materials', rawMaterialData);
    return response.data;
  },
  
  update: async (code, rawMaterialData) => {
    const response = await api.put(`/raw-materials/${code}`, rawMaterialData);
    return response.data;
  },
  
  delete: async (code) => {
    await api.delete(`/raw-materials/${code}`);
    return code;
  }
};

export default rawMaterialService;