import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { MainLayout } from '@/layouts';
import LoadingPage from '@/pages/LoadingPage';

const SignupPage = lazy(() => import('@/pages/SignupPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const ServiceCatalogPage = lazy(() => import('@/pages/ServiceCatalogPage'));
const TechSelectionPage = lazy(() => import('@/pages/TechSelectionPage'));
const ScheduleServicePage = lazy(() => import('@/pages/ScheduleServicePage'));
const CartPaymentPage = lazy(() => import('@/pages/CartPaymentPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

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
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/service-catalog'>
              <Route index element={<ServiceCatalogPage />} />
              <Route path='book-technician' element={<TechSelectionPage />} />
              <Route path='booking-tech'>
                <Route path=':id' element={<ScheduleServicePage />} />
                <Route path=':id/payment' element={<CartPaymentPage />} />
              </Route>
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
