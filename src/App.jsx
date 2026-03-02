import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { store } from './store';
import { appTheme } from './theme';
import Layout from './components/Layout';

const RawMaterialsView = () => <h2>Raw Materials Catalog (RF006)</h2>;
const ProductsView = () => <h2>Register Products and Associations (RF005 / RF007)</h2>;
const ProductionView = () => <h2>Production Suggestion (RF008)</h2>;

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route path="/raw-materials" element={<RawMaterialsView />} />
              <Route path="/products" element={<ProductsView />} />
              <Route path="/production" element={<ProductionView />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
