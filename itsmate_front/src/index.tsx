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
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute';

import { isLoggedIn } from './auth';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RestrictedRoute
      condition={isLoggedIn}
      component={<Home />}
      invalidComponent={<Login />}
    />,
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
    element: <RestrictedRoute
      condition={isLoggedIn}
      component={<CreateTask />}
      invalidComponent={<Login />}
    />,
    errorElement: <div>404</div>,
  }
  ,
  {
    path: '/Task',
    element: <RestrictedRoute
      condition={isLoggedIn}
      component={<Task />}
      invalidComponent={<Login />}
    />,
    errorElement: <div>404</div>,
  }
  ,
  {
    path: '/TasksManager',
    element: <RestrictedRoute
      condition={isLoggedIn}
      component={<TasksManager />}
      invalidComponent={<Login />}
    />,
    errorElement: <div>404</div>,
  }
  ,
  {
    path: '/UsersManager',
    element: <RestrictedRoute
      condition={isLoggedIn}
      component={<UsersManager />}
      invalidComponent={<Login />}
    />,
    errorElement: <div>404</div>,
  },

  {
    path: '/GroupTasks',
    element: <RestrictedRoute
      condition={isLoggedIn}
      component={<GroupTasks />}
      invalidComponent={<Login />}
    />,
    errorElement: <div>404</div>,
  }

]);

let root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <RouterProvider router={router} />
);