import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import ProductListPage from './pages/ProductListPage';

function App() {

  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='/' element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>}>
        {/* <Route index element={<DashboardPage />} /> */}
        <Route path="products" element={<ProductListPage />} />
        {/* <Route path="orders" element={<OrdersPage />} /> */}
      </Route>
    </Routes>
  )
}

export default App
