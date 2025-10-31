import React, { useEffect, useState } from 'react';
import './OrderPage.css';
import { useCart } from '../../../context/CartContext';
import PageNav from '../../../components/customer/PageNav/PageNav';
import SearchBar from '../../../components/common/SearchBar/SearchBar';
import CartButton from '../../../components/common/CartButton/CartButton';
import OrderCard from '../../../components/customer/OrderCard/OrderCard';
import { useOrder } from '@/context/OrderContext';
import SectionTitle from '@/components/customer/SectionTitle';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { capitalize } from '@/utils/format';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getOrdersByUser } from '@/services/orderService';
import { useAuth } from '@/context/AuthContext';
import DateRange from '@/components/common/DateRange';
import DateDropdown from '@/components/common/DateDropdown';
import OrderModal from '@/components/admin/OrderModal';


const OrderPage = () => {
  const { loadingAuth, accessToken } = useAuth();
  const statusOptions = ['pending', 'processing', 'shipped', 'delivered'];
  const [selectedStatus, setSelectedStatus] = useState('');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lastUpdated, setLastUpdated } = useOrder();

  const status = searchParams.get('status');

  useEffect(() => {
    if (loadingAuth) return;
    if (!accessToken) return;

    setSelectedStatus(status || '');
    const query = new URLSearchParams();

    if (status) query.append('status', status);

    const loadOrders = async (query) => {
      setLoading(true);
      try {
        const result = await getOrdersByUser(query);
        if (result) {
          setOrders(result.data);
        }
      } catch (err) {
        console.error('Error load orders', err);
      } finally {
        setLoading(false);
      }
    };

    if (!loadingAuth && accessToken) {
      loadOrders(query);
    }
  }, [status, loadingAuth, accessToken, lastUpdated]);

  const selectOrderStatus = (value) => {
    setSelectedStatus(value);
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('status', value);
    } else {
      newParams.delete('status');
    }
    setLastUpdated(Date.now());
    navigate(`/orders?${newParams.toString()}`);
  };

  return (
    <div className='mt-15 md:px-12 p-4 md:py-6'>
      <div className='grid md:grid-cols-[1fr_3fr] items-start gap-4 md:gap-6'>
        <section className='md:sticky top-21 grid gap-4 bg-white p-6 rounded-lg'>
          <h2 className='font-semibold text-lg text-gray-800 border-b pb-2'>Filters</h2>
          <div className='grid gap-2'>
            <h3 className='text-sm font-medium text-gray-600'>Status</h3>
            <RadioGroup
              value={selectedStatus}
              onValueChange={(value) => selectOrderStatus(value)}
            >
              <label className='flex gap-2 cursor-pointer'>
                <RadioGroupItem value=''/>
              All
              </label>
              {statusOptions.map((status, index) => (
                <label key={index} className='flex gap-2 cursor-pointer'>
                  <RadioGroupItem value={status}/>
                  {capitalize(status)}
                </label>
              ))}

            </RadioGroup>
          </div>

          <div className='grid gap-2'>
            <h3 className='text-sm font-medium text-gray-600'>Range</h3>
            {/*<DateRange/>
            <DateDropdown/>*/}
          </div>
        </section>
        <section className='md:gap-5 grid gap-4'>
          <SectionTitle title='My Orders'/>
          {orders?.length > 0 ? orders?.map((order) => (
            <OrderCard key={order._id} order={order}/>
          )) : (
            <p>You have not made any order</p>
          )}
        </section>
      </div>
      <OrderModal/>
    </div>
  );
};

export default OrderPage;
