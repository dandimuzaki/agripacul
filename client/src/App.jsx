import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import ProductPage from './Pages/ProductPage/ProductPage';
import CartPage from './Pages/CartPage/CartPage';
import NavbarLayout from './Pages/NavbarLayout';
import PlainLayout from './Pages/PlainLayout';
import CheckoutPage from './Pages/CheckoutPage/CheckoutPage';
import Header from './Components/Header/Header';
import { CartProvider } from './context/CartProvider';
import { ProductsProvider } from './context/ProductsProvider';
import { CheckoutProvider } from './context/CheckoutProvider';
import About from './Pages/About/About';
import OrderPage from './Pages/OrderPage/OrderPage';

function App() {

  return (
    <>
      <ProductsProvider>
        <CartProvider>
          <CheckoutProvider>
            <Header />
            <Routes>
              <Route element={<NavbarLayout />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/ideas' element={<CheckoutPage />} />
                <Route path='/orders' element={<OrderPage/>} />
                <Route path='/profile' />
                <Route path='/:category' element={<HomePage />} />
              </Route>

              <Route element={<PlainLayout />}>
                <Route path='/product/1' element={<ProductPage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/checkout' element={<CheckoutPage />} />
                <Route path='/about' element={<About/>}/>

              </Route>
            </Routes>
          </CheckoutProvider>
        </CartProvider>
      </ProductsProvider>
    </>
  );
}

export default App;
