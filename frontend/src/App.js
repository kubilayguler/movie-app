import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routers/AppRoutes';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { Layout } from 'antd';
import Navbar from './components/Navbar/Navbar.jsx';
import './styles/App.css';
import { Footer } from 'antd/es/layout/layout.js';
import PaginationComponent from './components/PaginationComponent.jsx';

const { Header, Content } = Layout;

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout style={{ minHeight: '100vh', backgroundColor: '#0F171E' }}>
          <Header style={{ backgroundColor: '#1A242F', padding: '0' }}>
            <Navbar style={{ maxWidth: '1400px' }} />
          </Header>
          <Content
            style={{
              minHeight: '100vh',
              paddingTop: '10px',
              maxWidth: '1400px',
              margin: '0 auto',
            }}
          >
            <AppRoutes />
          </Content>
          <Footer>
            <PaginationComponent />
          </Footer>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
