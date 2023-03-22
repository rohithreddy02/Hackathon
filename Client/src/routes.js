import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import BlogPage from './pages/BlogPage';
import StudentDetails from './pages/StudentDetails';
import AddDetails from './pages/AddDetails';
import AdminDashboard from './pages/AdminDashboard';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/admin" />, index: true },
        { path: 'admin', element: <AdminDashboard /> },
        { path: 'studentinfo', element: <StudentDetails /> },
        { path: 'addinfo', element: <AddDetails /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    // {
    //   path: 'login',
    //   element: <LoginPage />,
    // },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);

  return routes;
}
