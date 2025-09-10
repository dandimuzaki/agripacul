import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import { CartProvider } from './context/CartProvider';
import { ProductProvider } from './context/ProductProvider';
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
import { Toaster } from 'sonner';
import { ImageProvider } from './context/ImageProvider';
import SignUpPage from './pages/customer/SignUpPage/SignUpPage';
import LogInPage from './pages/customer/LogInPage/LogInPage';
import { AuthProvider } from './context/AuthProvider';
import { AddressProvider } from './context/AddressProvider';
import { ShippingProvider } from './context/ShippingProvider';
import { PaymentProvider } from './context/PaymentProvider';
import { OrderProvider } from './context/OrderProvider';
import ScrollToTop from './components/common/ScrollToTop';
import { UserProvider } from './context/UserProvider';
import UserList from './pages/admin/UserList';
import SearchResult from './pages/customer/SearchResult';
import AfterPurchase from './pages/customer/AfterPurchase';

function App() {

  return (
    <>
      <AuthProvider>
        <UserProvider>
          <AddressProvider>
            <ShippingProvider>
              <PaymentProvider>
                <Toaster/>
                <ImageProvider>
                  <ProductProvider>
                    <CartProvider>
                      <CheckoutProvider>
                        <OrderProvider>

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
                                <Route path='/product/:productId' element={<ProductPage />} />
                                <Route path='/products' element={<SearchResult/>} />
                                <Route path='/cart' element={<CartPage />} />
                                <Route path='/checkout' element={<CheckoutPage />} />
                                <Route path='/about' element={<About/>}/>
                                <Route path='/signup' element={<SignUpPage/>}/>
                                <Route path='/login' element={<LogInPage/>}/>
                                <Route path='/checkout/success/:orderId' element={<AfterPurchase/>} />
                                <Route path='/settings' element={<AfterPurchase/>}/>
                              </Route>
                            </Route>
                            <Route path='/admin' element={<AdminLayout/>}>
                              <Route path='products' element={<AdminProduct/>} />
                              <Route path='orders' element={<AdminOrderList/>} />
                              <Route path='summary' element={<AdminOrderSummary/>} />
                              <Route path='users' element={<UserList/>}/>

                            </Route>
                          </Routes>
                        </OrderProvider>

                      </CheckoutProvider>
                    </CartProvider>
                  </ProductProvider>
                </ImageProvider>
              </PaymentProvider>
            </ShippingProvider>

          </AddressProvider>
        </UserProvider>
      </AuthProvider>

    </>
  );
}

export default App;
