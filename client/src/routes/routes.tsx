import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { MainLayout } from '~/layouts';
import LoadingPage from '~/pages/LoadingPage';

const HomePage = lazy(() => import('~/pages/HomePage'));
const AboutPage = lazy(() => import('~/pages/AboutPage'));
const ContactPage = lazy(() => import('~/pages/ContactPage'));
const NotFoundPage = lazy(() => import('~/pages/NotFoundPage'));

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/home' element={<Navigate to='/' />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
