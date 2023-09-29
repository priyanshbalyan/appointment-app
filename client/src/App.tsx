import 'App.css';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { ErrorPage } from 'pages/ErrorPage';
import routes from 'features/router/routes';
import { Toaster } from 'react-hot-toast';

export default function App(): React.ReactElement {
  return (
    <div className="App">
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <React.Suspense fallback={<>Loading...</>}>
                {React.createElement(route.component)}
              </React.Suspense>
            }
          />
        ))}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Toaster
        position="bottom-center" 
        containerStyle={{
          bottom: 100,
        }}
        toastOptions={{
          style: {
            borderRadius: '50px',
            background: '#f85f6a',
            color: '#fff',
            fontSize: '0.8em'
          },
        }}
      />
    </div>
  );
}