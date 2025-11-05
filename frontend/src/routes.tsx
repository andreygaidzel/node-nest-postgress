import { type FC, type ReactNode } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { ErrorBoundaryPage } from '@/pages/error-boundary-page/ErrorBoundaryPage.tsx';
import Paths from '@/utils/paths.ts';
import Sidebar from '@/components/layout/sidebar/Sidebar.tsx';
import HomePage from '@/pages/home-page/HomePage.tsx';
import ProductsPage from '@/pages/products-page/ProductsPage.tsx';
import UsersPage from '@/pages/users-page/UsersPage.tsx';
import PlaygroundPage from '@/pages/playground-page/PlaygroundPage.tsx';
import RolesPage from '@/pages/roles-page/RolesPage.tsx';
import Header from '@/components/layout/header/Header.tsx';
import LoginPage from '@/pages/login-page/LoginPage.tsx';
import RegisterPage from '@/pages/register-page/RegisterPage.tsx';
import NotFoundPage from '@/pages/not-found-page/NotFoundPage.tsx';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store.ts';
import PostsPage from '@/pages/posts-page/PostsPage.tsx';
import type { TRole } from '@/models/IUserRoles.ts';

export interface IRoute {
  path: string;
  element: ReactNode;
  onlyAuth?: boolean;
  roles?: TRole[];
}

export const publicRoutes: IRoute[] = [
  {
    path: `${Paths.HOME}`,
    element: <HomePage />,
    onlyAuth: true,
  },
  {
    path: `${Paths.PRODUCTS}`,
    element: <ProductsPage />,
    onlyAuth: true,
  },
  {
    path: `${Paths.POSTS}`,
    element: <PostsPage />,
    onlyAuth: true,
  },
  {
    path: `${Paths.USERS}`,
    element: <UsersPage />,
    onlyAuth: true,
  },
  {
    path: `${Paths.ROLES}`,
    element: <RolesPage />,
    onlyAuth: true,
  },
  {
    path: `${Paths.PLAYGROUND}`,
    element: <PlaygroundPage />,
    onlyAuth: true,
  },
  {
    path: '*',
    element: <Navigate to='/' replace />,
  },
];

const MainLayout: FC = () => (
  <>
    <div className='layout'>
      <Header/>
      <div className='layout-body'>
        <Sidebar/>
        <Outlet/>
      </div>
    </div>
  </>
);

const RouteEnableWrapper: FC<{
  children: ReactNode;
  onlyAuth?: boolean;
  onlyGuest?: boolean;
  allowRoles?: TRole[];
}> = ({ children, allowRoles, onlyAuth = false, onlyGuest = false }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (onlyAuth && !user) {
    return <Navigate to="/login" replace />;
  }

  if (onlyGuest && user) {
    return <Navigate to="/" replace />;
  }

  return (user || !onlyAuth) && !allowRoles ? ( //roles.some(role => userRoles.includes(role))
    <>{children}</>
  ) : (
    <Navigate to='/' replace />
  );
};

export const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <RouteEnableWrapper onlyAuth>
          <MainLayout />
        </RouteEnableWrapper>
      ),
      errorElement: <ErrorBoundaryPage />,
      children: publicRoutes,
    },
    {
      path: Paths.LOGIN,
      element: (
        <RouteEnableWrapper onlyGuest>
          <LoginPage />
        </RouteEnableWrapper>
      ),
    },
    {
      path: Paths.REGISTER,
      element: (
        <RouteEnableWrapper onlyGuest>
          <RegisterPage />
        </RouteEnableWrapper>
      ),
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]
);