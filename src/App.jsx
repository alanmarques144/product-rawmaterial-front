import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { store } from './store';
import { appTheme } from './theme';
import Layout from './components/Layout';

import RawMaterials from './pages/RawMaterials';
import Products from './pages/Products';



const ProductionView = () => <h2>Sugestão de Produção (RF008)</h2>;

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <Router>
          <Layout>
            <Routes>
              {/* Agora aponta para o componente real */}
              <Route path="/raw-materials" element={<RawMaterials />} />
              <Route path="/products" element={<Products />} />
              <Route path="/production" element={<ProductionView />} />
              <Route path="/" element={<Navigate to="/raw-materials" replace />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;