import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SolutionsPage from './pages/SolutionsPage';
import SolutionDetailPage from './pages/SolutionDetailPage';
import NovedadesPage from './pages/NovedadesPage';
import NovedadesDetailPage from './pages/NovedadesDetailPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
