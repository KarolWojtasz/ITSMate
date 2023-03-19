import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '@views/Login/Login';


const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    errorElement: <div>404</div>,
  },
  {
    path: '/login',
    element: <Register />,
    errorElement: <Home />,
  }
]);

const reactRoot = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};
function createBrowserRouter(arg0: { path: string; element: JSX.Element; errorElement: JSX.Element; }[]) {
  throw new Error('Function not implemented.');
}

