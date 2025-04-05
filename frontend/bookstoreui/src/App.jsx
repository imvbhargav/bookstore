import './App.css'
import Home from "./components/Home";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Sales from "./components/Sales";
import Admin from "./components/Admin";
import Orders from "./components/Orders";
import AddBook from "./components/AddBook";
import Register from "./components/Register";
import Checkout from "./components/Checkout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from './components/middleware/AuthProvider';
import { AuthMiddleware, LoginMiddleware, RoleMiddleware } from "./components/middleware/Middleware";
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page/:page" element={<Home />} />
          <Route path="/login" element={<LoginMiddleware Component={Login} />} />
          <Route path="/register" element={<LoginMiddleware Component={Register} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<AuthMiddleware Component={Orders} />} />
          <Route path="/checkout" element={<AuthMiddleware Component={Checkout} />} />
          <Route path="/admin" element={<RoleMiddleware Component={Admin} />} />
          <Route path="/admin/sales" element={<RoleMiddleware Component={Sales} />} />
          <Route path="/admin/book/new" element={<RoleMiddleware Component={AddBook} />} />
          <Route path="/admin/book/edit/:slug" element={<RoleMiddleware Component={AddBook} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;