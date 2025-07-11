import { useEffect, useState } from 'react';
import { ProductsContext } from './ProductsContext.jsx';

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // Later replace with actual API
      // const res = await axios.get('/api/products');
      // setProducts(res.data);

      // Temporary dummy data
      setProducts([
        {
          'id': 1,
          'title': 'Selada Keriting',
          'description': '',
          'price': 10000,
          'weight': '300g',
          'category': 'vegetables',
          'rating': 4,
          'stock': 25,
          'image': '',
          'sold': 200,
        },
        {
          'id': 2,
          'title': 'Tomat',
          'description': '',
          'price': 10000,
          'weight': '300g',
          'category': 'vegetables',
          'rating': 4,
          'stock': 25,
          'image': '',
          'sold': 200,
        },
        {
          'id': 3,
          'title': 'Veggie Salad Japanese Style',
          'description': '',
          'price': 10000,
          'weight': '300g',
          'category': 'salad',
          'rating': 4,
          'stock': 25,
          'image': '',
          'sold': 200,
        },
        {
          'id': 4,
          'title': 'Veggie Salad Western Style',
          'description': '',
          'price': 10000,
          'weight': '300g',
          'category': 'salad',
          'rating': 4,
          'stock': 25,
          'image': '',
          'sold': 200,
        },
        {
          'id': 5,
          'title': 'Sekop',
          'description': '',
          'price': 10000,
          'weight': '300g',
          'category': 'tools',
          'rating': 4,
          'stock': 25,
          'image': '',
          'sold': 200,
        },
        {
          'id': 6,
          'title': 'Bunga Matahari',
          'description': '',
          'price': 10000,
          'weight': '300g',
          'category': 'flowers',
          'rating': 4,
          'stock': 25,
          'image': '',
          'sold': 200,
        }
      ]);
    };
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};