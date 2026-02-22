import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import SolutionsPage from './pages/SolutionsPage';
import SolutionDetailPage from './pages/SolutionDetailPage';

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
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
