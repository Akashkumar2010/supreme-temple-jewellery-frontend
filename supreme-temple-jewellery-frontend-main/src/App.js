import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

// Pages
import HomePage from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import CategoriesPage from './pages/CategoriesPage'; // For all categories
import ErrorPage from './pages/ErrorPage'; // 404 Error Page

// Blogs
import Blog1 from './blogs/blog1';
import Blog2 from './blogs/blog2';
import Blog3 from './blogs/blog3';
import Blog4 from './blogs/blog4';
import Blog5 from './blogs/blog5';
import Blog6 from './blogs/blog6';
import Blog7 from './blogs/blog7';
import Blog8 from './blogs/blog8';
import Blog9 from './blogs/blog9';
import Blog10 from './blogs/blog10';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          {/* Navbar */}
          <Navbar />

          {/* Main Routes */}
          <Routes>
            {/* Home and General Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />

            {/* Products and Product Details */}
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            {/* Wishlist and Cart */}
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />

            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin Route - Protected */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={['admin']}>
                  <Admin />
                </ProtectedRoute>
              }
            />

            {/* Dynamic Category Routes */}
            <Route path="/categories/:category" element={<CategoriesPage />} />

            {/* Blogs */}
            <Route path="/blogs/blog1" element={<Blog1 />} />
            <Route path="/blogs/blog2" element={<Blog2 />} />
            <Route path="/blogs/blog3" element={<Blog3 />} />
            <Route path="/blogs/blog4" element={<Blog4 />} />
            <Route path="/blogs/blog5" element={<Blog5 />} />
            <Route path="/blogs/blog6" element={<Blog6 />} />
            <Route path="/blogs/blog7" element={<Blog7 />} />
            <Route path="/blogs/blog8" element={<Blog8 />} />
            <Route path="/blogs/blog9" element={<Blog9 />} />
            <Route path="/blogs/blog10" element={<Blog10 />} />

            {/* Catch-All Route for Undefined Pages */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>

          {/* Footer */}
          <Footer />
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}

export default App;
