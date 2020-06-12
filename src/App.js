import React from 'react';

import { ToastContainer } from 'react-toastify';
import { Router } from 'react-router-dom';

import history from './services/history';
import Routes from './routes';

import GlobalStyle from './styles/global';

function App() {
  return (
    <Router history={history}>
      <GlobalStyle />
      <ToastContainer autoClose={3000} />
      <Routes />
    </Router>
  );
}

export default App;
