import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Index from './components/Index';
import Registration from './components/Registration';
import AdminDashboard from './components/admin/Admin_dashboard';
import Product from './components/admin/Product';
import AddProduct from './components/admin/product/Add_product';
import Order from './components/admin/order';

import CusDashboard from './components/customer/Dashboard';
import ViewProduct from './components/customer/view_product';
import Cart from './components/customer/cart';
import ChatBot from './components/customer/chatbot';
import AdminChat from './components/admin/Admin_Chat';



import 'mdb-react-ui-kit/dist/css/mdb.min.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}  />
        <Route path="/Registration" element={<Registration />}  />
        <Route path="/admin/dashboard" element={<AdminDashboard />}  />
        <Route path="/admin/product" element={<Product />}  />
        <Route path="/admin/addProduct" element={<AddProduct />}  />
        <Route path="/admin/order" element={<Order />}  />

        <Route path="/customer/dashboard" element={<CusDashboard />}  />
        <Route path="/customer/viewProduct" element={<ViewProduct />}  />
        <Route path="/customer/Cart" element={<Cart />}  />
        <Route path="/customer/ChatBot" element={<ChatBot />}  />
        <Route path="/admin/chat" element={<AdminChat />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
