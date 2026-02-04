import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../../../pages/home';
import { Layout } from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      // {path: 'profile' },
      // {path: 'users' },
      // {path: 'roles' },
    ],
  },
]);
