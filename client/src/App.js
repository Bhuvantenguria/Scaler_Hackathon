import { Route, Routes } from 'react-router-dom';
import "./App.css"
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound'

import Policy from './pages/Policy'
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login'
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './componenets/routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './componenets/routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCataegory from './pages/Admin/CreateCataegory';
import CreateProduct from './pages/Admin/CreateProduct';
import UpdateProduct from './pages/Admin/UpdateProduct';

import Product from './pages/Admin/Product';
import Profile from './pages/user/Profile';
import Order from './pages/user/Order';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import Purchase from './pages/Purchase';
import AdminOrders from './pages/Admin/AdminOrder';
import ProductCard from './componenets/ProductCard';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/c" element={<ProductCard />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/search" element={<Search />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/contact' element={<Contact />} />

        <Route path='/dashboard' element={<PrivateRoute />}>

          <Route path='user' element={<Dashboard />} />

          <Route path='user/profile' element={<Profile />} />
          <Route path='user/orders' element={<Order />} />
        </Route>
        <Route path='purchase/:slug' element={<Purchase />} />


        <Route path='/dashboard' element={<AdminRoute />}>

          <Route path='admin' element={<AdminDashboard />} />

          <Route path='admin/create-category' element={<CreateCataegory />} />

          <Route path='admin/create-product' element={<CreateProduct />} />
          <Route path='admin/orders' element={<AdminOrders />} />
          <Route path='admin/product/:slug' element={<UpdateProduct />} />
          <Route path='admin/products' element={<Product />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/register' element={<Register />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
