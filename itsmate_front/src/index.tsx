import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './views/Login/Login';
import Home from './views/Home/Home';
import CreateTask from './views/CreateTask/CreateTask';
import Task from './views/Task/Task';
import TasksManager from './views/TasksManager/TasksManager';
import UsersManager from './views/UsersManager/UsersManager';
import GroupTasks from './views/GroupTasks/GroupTasks';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <div>404</div>,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <div>404</div>,
  }
  ,
  {
    path: '/CreateTask',
    element: <CreateTask />,
    errorElement: <div>404</div>,
  }
  ,
  {
    path: '/Task',
    element: <Task />,
    errorElement: <div>404</div>,
  }
  ,
  {
    path: '/TasksManager',
    element: <TasksManager />,
    errorElement: <div>404</div>,
  }
  ,
  {
    path: '/UsersManager',
    element: <UsersManager />,
    errorElement: <div>404</div>,
  }
  ,
  {
    path: '/GroupTasks',
    element: <GroupTasks />,
    errorElement: <div>404</div>,
  }

]);

let root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);