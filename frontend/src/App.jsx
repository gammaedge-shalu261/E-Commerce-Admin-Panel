import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';

function App() {

  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='/' element={<Layout />}>
        {/* <Route index element={<DashboardPage />} /> */}
        {/* <Route path="products" element={<ProductsPage />} />
        <Route path="orders" element={<OrdersPage />} /> */}
      </Route>
    </Routes>
  )
}

export default App
