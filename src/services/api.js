import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/endpoint';

// Utility function to handle errors
const handleError = (error, message) => {
  console.error(message, error.response?.data || error.message || error);
  throw new Error(
    error.response?.data?.message || 'An unexpected error occurred'
  );
};

// Utility to set Authorization headers
const getAuthHeaders = token => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

/* =====================
   Product APIs
===================== */

// Fetch all products with optional filters (e.g., search, category, price range, pagination)
export const fetchProducts = async (params = {}) => {
  try {
    const res = await axios.get(`${API_URL}/products`, { params });
    return res.data; // Returns { products, total, page, pages }
  } catch (error) {
    handleError(error, 'Error fetching products:');
  }
};

// Fetch a single product by ID
export const fetchProductDetails = async id => {
  try {
    const res = await axios.get(`${API_URL}/products/${id}`);
    return res.data; // Returns the product object
  } catch (error) {
    handleError(error, `Error fetching product details for ID ${id}:`);
  }
};

// Fetch products by category (case-insensitive matching)
export const fetchProductsByCategory = async category => {
  try {
    const res = await axios.get(`${API_URL}/products`, {
      params: {
        category: { $regex: category, $options: 'i' }, // Case-insensitive
      },
    });
    return res.data;
  } catch (error) {
    handleError(error, `Error fetching products for category "${category}":`);
  }
};

// Fetch related products by category
export const fetchRelatedProducts = async (category, excludeId) => {
  try {
    const res = await axios.get(`${API_URL}/products/related`, {
      params: { category, exclude: excludeId },
    });
    return res.data; // Returns array of related products
  } catch (error) {
    handleError(error, 'Error fetching related products:');
  }
};

// Create a new product (Admin only)
export const createProduct = async (productData, token) => {
  try {
    const res = await axios.post(`${API_URL}/products`, productData, {
      ...getAuthHeaders(token),
    });
    return res.data;
  } catch (error) {
    handleError(error, 'Error creating product:');
  }
};

// Update a product by ID (Admin only)
export const updateProduct = async (id, productData, token) => {
  try {
    const res = await axios.put(`${API_URL}/products/${id}`, productData, {
      ...getAuthHeaders(token),
    });
    return res.data;
  } catch (error) {
    handleError(error, `Error updating product with ID ${id}:`);
  }
};

// Delete a product by ID (Admin only)
export const deleteProduct = async (id, token) => {
  try {
    const res = await axios.delete(`${API_URL}/products/${id}`, {
      ...getAuthHeaders(token),
    });
    return res.data;
  } catch (error) {
    handleError(error, `Error deleting product with ID ${id}:`);
  }
};

/* =====================
   Category APIs
===================== */

// Fetch all categories
export const fetchCategories = async () => {
  try {
    const res = await axios.get(`${API_URL}/categories`);
    return res.data; // Returns an array of categories
  } catch (error) {
    handleError(error, 'Error fetching categories:');
  }
};

/* =====================
   User & Auth APIs
===================== */

// Register a new user
export const registerUser = async userData => {
  try {
    const res = await axios.post(`${API_URL}/users/register`, userData);
    return res.data; // Returns user details and token
  } catch (error) {
    handleError(error, 'Error registering user:');
  }
};

// Login a user
export const loginUser = async credentials => {
  try {
    const res = await axios.post(`${API_URL}/users/login`, credentials);
    return res.data; // Returns user details and token
  } catch (error) {
    handleError(error, 'Error logging in:');
  }
};

// Fetch user profile
export const fetchUserProfile = async token => {
  try {
    const res = await axios.get(`${API_URL}/users/profile`, {
      ...getAuthHeaders(token),
    });
    return res.data; // Returns user profile data
  } catch (error) {
    handleError(error, 'Error fetching user profile:');
  }
};

/* =====================
   Cart & Wishlist APIs (LocalStorage-Based)
===================== */

// Add a product to the cart
export const addToCart = productId => {
  try {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cartItems.includes(productId)) {
      cartItems.push(productId);
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    return { success: true, cart: cartItems };
  } catch (error) {
    handleError(error, 'Error adding product to cart:');
  }
};

// Remove a product from the cart
export const removeFromCart = productId => {
  try {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cartItems.filter(id => id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return { success: true, cart: updatedCart };
  } catch (error) {
    handleError(error, 'Error removing product from cart:');
  }
};

// Add a product to the wishlist
export const addToWishlist = productId => {
  try {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlistItems.includes(productId)) {
      wishlistItems.push(productId);
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }
    return { success: true, wishlist: wishlistItems };
  } catch (error) {
    handleError(error, 'Error adding product to wishlist:');
  }
};

// Remove a product from the wishlist
export const removeFromWishlist = productId => {
  try {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    const updatedWishlist = wishlistItems.filter(id => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    return { success: true, wishlist: updatedWishlist };
  } catch (error) {
    handleError(error, 'Error removing product from wishlist:');
  }
};
