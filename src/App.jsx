import './App.css';
import { Routes, Route } from 'react-router-dom';
import AdminHome from './components/AdminHome';
import DashboardMenu from './components/DashboardMenu';
import HomeMainSection from './components/HomeMainSection';
import UsersMainSection from './components/UsersMainSection';
import CategoriesMainSection from './components/CategoriesMainSection';
import ProductsMainSection from './components/ProductsMainSection';
import OrdersMainSection from './components/OrdersMainSection';
import StaffMainSection from './components/StaffMainSection';
import AdminLogin from './components/AdminLogin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoMatch from './components/NoMatch';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={<AdminHome />}>
          <Route path="/" element={<HomeMainSection />} />
          <Route path="/users" element={<UsersMainSection />} />
          <Route path="/categories" element={<CategoriesMainSection />} />
          <Route path="/products" element={<ProductsMainSection />} />
          <Route path="/orders" element={<OrdersMainSection />} />
          <Route path="/staff" element={<StaffMainSection />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
