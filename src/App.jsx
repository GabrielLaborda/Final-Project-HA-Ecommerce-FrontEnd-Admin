import './App.css';
import { Routes, Route } from "react-router-dom";
import AdminHome from './components/AdminHome';
import DashboardMenu from './components/DashboardMenu';
import HomeMainSection from './components/HomeMainSection';
import UsersMainSection from './components/UsersMainSection';
import CategoriesMainSection from './components/CategoriesMainSection';
import ProductsMainSection from './components/ProductsMainSection';
import OrdersMainSection from './components/OrdersMainSection';
import StaffMainSection from './components/StaffMainSection';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<AdminHome/>}>
          <Route path="/dashboard" element={<HomeMainSection />} />
          <Route path="/users" element={<UsersMainSection />} />
          <Route path="/categories" element={<CategoriesMainSection />} />
          <Route path="/products" element={<ProductsMainSection />} />
          <Route path="/orders" element={<OrdersMainSection />} />
          <Route path="/staff" element={<StaffMainSection />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;