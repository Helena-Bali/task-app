
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { withProviders } from './app/providers';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {withProviders({
      children: <RouterProvider router={router} />
    })}
  </React.StrictMode>,
);



