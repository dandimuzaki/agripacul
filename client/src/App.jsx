import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import { CartProvider } from './context/CartProvider';
import { ProductsProvider } from './context/ProductsProvider';
import { CheckoutProvider } from './context/CheckoutProvider';
import HomePage from './pages/customer/HomePage/HomePage';
import OrderPage from './pages/customer/OrderPage/OrderPage';
import NavbarLayout from './layouts/NavbarLayout';
import PlainLayout from './layouts/PlainLayout';
import TransactionDetail from './components/customer/TransactionDetail/TransactionDetail';
import ProductPage from './pages/customer/ProductPage/ProductPage';
import CartPage from './pages/customer/CartPage/CartPage';
import CheckoutPage from './pages/customer/CheckoutPage/CheckoutPage';
import About from './pages/customer/About/About';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import AdminProduct from './pages/admin/ProductAdmin/AdminProduct';
import AdminOrderList from './pages/admin/AdminOrderList';
import AdminOrderSummary from './pages/admin/AdminOrderSummary';

function App() {

  return (
    <>
      <ProductsProvider>
        <CartProvider>
          <CheckoutProvider>
            <Routes>
              <Route path='/' element={<MainLayout/>}>
                <Route element={<NavbarLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path='/ideas' element={<OrderPage />} />
                  <Route path='/orders' element={<OrderPage/>} />
                  <Route path='/profile' />
                  <Route path='/:category' element={<HomePage />} />
                  <Route path='/orders/1' element={<TransactionDetail/>}/>
                </Route>

                <Route element={<PlainLayout />}>
                  <Route path='/product/1' element={<ProductPage />} />
                  <Route path='/cart' element={<CartPage />} />
                  <Route path='/checkout' element={<CheckoutPage />} />
                  <Route path='/about' element={<About/>}/>
                </Route>
              </Route>
              <Route path='/admin' element={<AdminLayout/>}>
                <Route path='products' element={<AdminProduct/>} />
                <Route path='orders' element={<AdminOrderList/>} />
                <Route path='summary' element={<AdminOrderSummary/>} />

              </Route>
            </Routes>
          </CheckoutProvider>
        </CartProvider>
      </ProductsProvider>
    </>
  );
}

export default App;
