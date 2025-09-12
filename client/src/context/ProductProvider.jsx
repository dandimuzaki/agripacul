import { useEffect, useState } from 'react';
import { ProductContext } from './ProductContext.jsx';
import { toast } from 'sonner';
import { createProduct, deleteProduct, getProducts, getProductById, updateProduct } from '../services/productService.js';
import { useImage } from './ImageContext.jsx';
import { useDebounce } from 'react-use';
import { useNavigate } from 'react-router-dom';


export const ProductProvider = ({ children }) => {
  const { handleUploadImage, setSelectedImage, setPreview } = useImage();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [debounceKeyword, setDebounceKeyword] = useState('');
  const [lastUpdated, setLastUpdated] = useState(Date.now())

  useDebounce(() => setDebounceKeyword(keyword), 500, [keyword]);

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

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

  const fetchSingleProduct = async (productId) => {
    setIsLoading(true);
    try {
      const fresh = await getProductById(productId);
      setProduct(fresh);
    } catch (err) {
      console.error('Failed to fetch product', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    if (selectedProduct?._id) {
      fetchSingleProduct(selectedProduct?._id);
    }
  }, [selectedProduct?._id, lastUpdated]);

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

  const navigate = useNavigate();
  const searchProduct = (search) => {
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search)}`);
    }
  };

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const openModal = (productData = null) => {
    setSelectedProduct(productData);
    setIsModalOpen(true);
    console.log(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setSelectedImage(null);
    setPreview(null);
    setIsModalOpen(false);
    setProduct(null);
    console.log(product);
  };

  const handleSave = async (data) => {
    setIsLoading(true);
    const uploadedImageUrl = await handleUploadImage();

    try {
      if (product) {
        const updatedProduct = await updateProduct(product._id, {
          ...data,
          image: uploadedImageUrl,
        });
        setProducts((prev) =>
          prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
        );
        setLastUpdated(Date.now())
        toast(`${updatedProduct.title} has been updated at`, {
          description: `${formatted}`,
        });
      } else {
        const newProduct = await createProduct({ ...data, image: uploadedImageUrl });
        setProducts((prev) => [...prev, newProduct]);
        setLastUpdated(Date.now())
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
    <ProductContext.Provider value={{
      products, setProducts,
      selectedProduct, setSelectedProduct,
      product, setProduct,
      isModalOpen, setIsModalOpen,
      isVisible, setIsVisible,
      isConfirmOpen, setIsConfirmOpen,
      triggerConfirm, closeConfirm,
      openModal, closeModal, handleSave, handleDelete,
      formProduct, setFormProduct,
      isLoading, setIsLoading,
      keyword, setKeyword, debounceKeyword, searchProduct,
      lastUpdated, setLastUpdated
    }}>
      {children}
    </ProductContext.Provider>
  );
};