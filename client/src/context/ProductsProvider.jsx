import { useEffect, useState } from 'react';
import { ProductsContext } from './ProductsContext.jsx';
import products from '../products.js'

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // Later replace with actual API
      // const res = await axios.get('/api/products');
      // setProducts(res.data);

      // Temporary dummy data
      setProducts(products);
    };
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};