import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import App from 'App';
import 'index.css';
import { BrowserRouter } from 'react-router-dom';
import 'assets/Lato-Regular.ttf';
import 'assets/Nunito-Regular.ttf';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
