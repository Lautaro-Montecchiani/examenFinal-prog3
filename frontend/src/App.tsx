import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SolutionsPage from './pages/SolutionsPage';
import SolutionDetailPage from './pages/SolutionDetailPage';
import NovedadesPage from './pages/NovedadesPage';
import NovedadesDetailPage from './pages/NovedadesDetailPage';
import ContactPage from './pages/ContactPage';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './components/admin/AdminLayout';
import PrivateRoute from './components/admin/PrivateRoute';
import LoginAdminPage from './pages/admin/LoginAdminPage';
import DashboardPage from './pages/admin/DashboardPage';
import NewsAdminPage from './pages/admin/NewsAdminPage';
import SolutionsAdminPage from './pages/admin/SolutionsAdminPage';
import InvoicesAdminPage from './pages/admin/InvoicesAdminPage';
import ClientPortalPage from './pages/ClientPortalPage';
import PaymentCheckoutPage from './pages/PaymentCheckoutPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/nosotros" element={<AboutPage />} />
              <Route path="/soluciones" element={<SolutionsPage />} />
              <Route path="/soluciones/:slug" element={<SolutionDetailPage />} />
              <Route path="/novedades" element={<NovedadesPage />} />
              <Route path="/novedades/:slug" element={<NovedadesDetailPage />} />
              <Route path="/contacto" element={<ContactPage />} />
              <Route path="/pagos" element={<ClientPortalPage />} />
              <Route path="/pagos/:id" element={<PaymentCheckoutPage />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<LoginAdminPage />} />

              <Route path="/admin" element={
                <PrivateRoute>
                  <AdminLayout />
                </PrivateRoute>
              }>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="novedades" element={<NewsAdminPage />} />
                <Route path="soluciones" element={<SolutionsAdminPage />} />
                <Route path="invoices" element={<InvoicesAdminPage />} />
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
