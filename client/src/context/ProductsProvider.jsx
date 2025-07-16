import { useEffect, useState } from 'react';
import { ProductsContext } from './ProductsContext.jsx';
import lettuce from '../assets/lettuce.jpg'
import tomato from '../assets/tomato.jpg'
import cherry_tomato from '../assets/cherry_tomato.png'
import bokchoy from '../assets/bokchoy.jpg'
import product_chamomile from '../assets/product_chamomile.jpg'
import product_sunflower from '../assets/product_sunflower.jpg'
import shovel from '../assets/shovel.png'
import salad_japanese from '../assets/salad_japanese.png'
import salad_western from '../assets/salad_western.png'
import corn from '../assets/corn.jpg'


export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const img = [lettuce, tomato, bokchoy, cherry_tomato, corn, salad_western, salad_japanese, shovel, product_chamomile, product_sunflower]

  useEffect(() => {
    const fetchProducts = async () => {
      const product = [
        {
          'id': 1,
          'title': 'Lettuce',
          'description': '',
          'price': 9000,
          'weight': '300g',
          'category': 'vegetables',
          'rating': 4,
          'stock': 25,
          'image': img[0],
          'sold': 200,
        },
        {
          'id': 2,
          'title': 'Tomato',
          'description': '',
          'price': 15000,
          'weight': '500g',
          'category': 'vegetables',
          'rating': 4,
          'stock': 25,
          'image': img[1],
          'sold': 200,
        },
        {
          'id': 3,
          'title': 'Bokchoy',
          'description': '',
          'price': 10000,
          'weight': '300g',
          'category': 'vegetables',
          'rating': 4,
          'stock': 25,
          'image': img[2],
          'sold': 200,
        },
        {
          'id': 4,
          'title': 'Cherry Tomato',
          'description': '',
          'price': 18000,
          'weight': '500g',
          'category': 'vegetables',
          'rating': 5,
          'stock': 25,
          'image': img[3],
          'sold': 200,
        },
        {
          'id': 5,
          'title': 'Sweet Corn',
          'description': '',
          'price': 17000,
          'weight': '1kg',
          'category': 'vegetables',
          'rating': 5,
          'stock': 25,
          'image': img[4],
          'sold': 200,
        },
        {
          'id': 7,
          'title': 'Veggie Salad Japanese Style',
          'description': '',
          'price': 10000,
          'weight': 'cup',
          'category': 'salad',
          'rating': 5,
          'stock': 25,
          'image': img[6],
          'sold': 200,
        },
        {
          'id': 6,
          'title': 'Veggie Salad Western Style',
          'description': '',
          'price': 10000,
          'weight': 'cup',
          'category': 'salad',
          'rating': 4,
          'stock': 25,
          'image': img[5],
          'sold': 200,
        },
        {
          'id': 8,
          'title': 'Hand Shovel',
          'description': '',
          'price': 30000,
          'weight': '',
          'category': 'tools',
          'rating': 3,
          'stock': 25,
          'image': img[7],
          'sold': 200,
        },
        {
          'id': 9,
          'title': 'Chamomile',
          'description': '',
          'price': 8000,
          'weight': 'pcs',
          'category': 'flowers',
          'rating': 5,
          'stock': 25,
          'image': img[8],
          'sold': 200,
        },
        {
          'id': 10,
          'title': 'Sunflower',
          'description': '',
          'price': 12000,
          'weight': 'pcs',
          'category': 'flowers',
          'rating': 4,
          'stock': 25,
          'image': img[9],
          'sold': 200,
        }
      ];
      setProducts(product);
    };
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};