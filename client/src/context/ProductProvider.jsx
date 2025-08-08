import { useEffect, useState } from 'react';
import { ProductsContext } from './ProductsContext.jsx';
import lettuce from '../assets/lettuce.jpg';
import tomato from '../assets/tomato.jpg';
import cherry_tomato from '../assets/cherry_tomato.png';
import bokchoy from '../assets/bokchoy.jpg';
import product_chamomile from '../assets/product_chamomile.jpg';
import product_sunflower from '../assets/product_sunflower.jpg';
import shovel from '../assets/shovel.png';
import salad_japanese from '../assets/salad_japanese.png';
import salad_western from '../assets/salad_western.png';
import corn from '../assets/corn.jpg';
import { toast } from 'sonner';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../services/productService.js';
import { useImage } from './ImageContext.jsx';


export const ProductProvider = ({ children }) => {
  const { handleUploadImage, setSelectedImage, setPreview } = useImage();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 200); // match animation duration
      return () => clearTimeout(timeout);
    }
  }, [isModalOpen]);

  const img = [lettuce, tomato, bokchoy, cherry_tomato, corn, salad_western, salad_japanese, shovel, product_chamomile, product_sunflower];

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

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [formProduct, setFormProduct] = useState({
    'title': '',
    'description': '',
    'price': 0,
    'weight': '',
    'category': '',
    'rating': 0,
    'stock': 0,
    'image': '',
    'sold': 0,
    'status': ''
  });

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const openModal = (product = null) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setPreview(null);
    setIsModalOpen(false);
  };

  const handleSave = async (data) => {
    setIsLoading(true);
    const uploadedImageUrl = await handleUploadImage();

    try {
      if (selectedProduct) {
        const updatedProduct = await updateProduct(selectedProduct._id, {
          ...data,
          image: uploadedImageUrl,
        });
        setProducts((prev) =>
          prev.map((product) => (product._id === updatedProduct._id ? updatedProduct : product))
        );
        toast(`${updatedProduct.title} has been updated at`, {
          description: `${formatted}`,
        });
      } else {
        const newProduct = await createProduct({ ...data, image: uploadedImageUrl });
        setProducts((prev) => [...prev, newProduct]);
        toast(`${newProduct.title} has been created at`, {
          description: `${formatted}`,
        });
      }
      setIsLoading(false);
      setSelectedImage(null);
      setPreview(null);
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const triggerConfirm = (product) => {
    setSelectedProduct(product);
    setIsConfirmOpen(true);
  };

  const closeConfirm = () => {
    setIsConfirmOpen(false);
  };

  const date = new Date();
  const formatted = date.toLocaleString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteProduct(selectedProduct._id);
      setProducts((prev) => prev.filter((product) => product._id != selectedProduct._id));
      closeConfirm();
      toast(`${selectedProduct.title} has been deleted at`, {
        description: `${formatted}`,
      });
    } catch (err) {
      console.error('Delete product failed', err);
    }
    setIsLoading(false);
  };

  return (
    <ProductsContext.Provider value={{
      products, setProducts,
      selectedProduct, setSelectedProduct,
      isModalOpen, setIsModalOpen,
      isVisible, setIsVisible,
      isConfirmOpen, setIsConfirmOpen,
      triggerConfirm, closeConfirm,
      openModal, closeModal, handleSave, handleDelete,
      formProduct, setFormProduct,
      isLoading, setIsLoading
    }}>
      {children}
    </ProductsContext.Provider>
  );
};