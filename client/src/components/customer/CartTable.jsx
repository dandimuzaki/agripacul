import { useCart } from '@/context/CartContext';
import { useCheckout } from '@/context/CheckoutContext';
import { formatCurrency } from '@/utils/format';
import React, { useCallback, useMemo } from 'react';
import { Skeleton } from '../ui/skeleton';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Add, CheckBox, Delete, Remove } from '@mui/icons-material';

const CartTable = () => {
  const { cart, decreaseQuantity, increaseQuantity, deleteItem, loading } = useCart();
  const { checkedItems, checkAll, isAllChecked, handleCheckout } = useCheckout();
  const cartItems = (cart || []).sort((a, b) => b.product?.stock - a.product?.stock);
  const isChecked = useCallback(((item) => checkedItems.includes(item)), [checkedItems]);
  const isEmpty = (stock) => stock === 0;
  const overStock = (stock, quantity) => stock < quantity && stock > 0;

  const columns = useMemo(() => [
    {
      id: 'select',
      header: (
        <div role="checkbox" onClick={checkAll} type='checkbox' className={`${isAllChecked?'border-0':'border'} border border-gray-500 h-7 w-7 rounded-md relative cursor-pointer`} >
          <CheckBox fontSize='large' className={`${isAllChecked?'':'sr-only'} text-[var(--orange)] absolute top-[-4px] left-[-4px]`} />
        </div>
      ),
      cell: ({ row }) => loading ? (<Skeleton className='h-7 w-7'/>) : !isEmpty(row.original.product?.stock) && (
        <div role="checkbox" onClick={() => handleCheckout(row.original)} type='checkbox' className={`${isChecked(row.original)?'border-0':'border'} border border-gray-500 h-7 w-7 rounded-md relative self-center cursor-pointer`} >
          <CheckBox fontSize='large' className={`${isChecked(row.original)?'':'sr-only'} text-[var(--orange)] absolute top-[-4px] left-[-4px]`} />
        </div>
      )
    },
    {
      header: 'Select All',
      cell: ({ row }) => (
        <div className='flex items-center gap-2'>
          <div className='w-16 h-16 flex'>
            {loading ? <Skeleton className='flex-1 h-16 w-16'/> :
              <img className='object-cover w-full h-full rounded-md' src={row.original.product.image} alt={row.original.product.title} />
            }
          </div>
          <div className='grid'>
            {loading ? <Skeleton className='h-8 min-w-24 mb-1'/> : <p className=''>{row.original.product.title}</p>}
            {loading ? <Skeleton className='h-8 min-w-24'/> : <p className='font-medium'>{formatCurrency(row.original.product.price)}</p>}
          </div>
        </div>
      ),
      meta: {
        className: 'text-left'
      }
    },
    {
      header: 'Quantity',
      cell: ({ row }) => loading ? <Skeleton className='h-8 min-w-24'/> : (
        <div className='grid gap-4 text-center justify-center'>
          {
            isEmpty(row.original.product?.stock) && <p className='text-red-500 text-sm w-40'>This product is out of stock. We’ll notify you when restock is ready</p>
          }
          {
            overStock(row.original.product?.stock, row.original.quantity) && <p className='text-orange-500 text-sm w-40'>Only {row.original.product?.stock} left in stock. Please reduce your quantity.</p>
          }
          {
            <div className='flex gap-2 items-center justify-center'>
              <button disabled={isEmpty} onClick={() => decreaseQuantity(row.original.product?._id)} className='w-6 h-6 border border-[var(--orange)] text-[var(--orange)] rounded-md cursor-pointer'><Remove fontSize='small' /></button>
              <div className='w-8 h-6 flex items-center justify-center'>{row.original.quantity}</div>
              <button disabled={overStock} onClick={() => increaseQuantity(row.original.product?._id)} className='w-6 h-6 border border-[var(--orange)] text-[var(--orange)] rounded-md cursor-pointer'><Add fontSize='small' /></button>
            </div>
          }
        </div>
      )
    },
    {
      header: 'Subtotal',
      cell: ({ row }) =>
        loading ? <Skeleton className='h-8 min-w-24'/> :
          (<p className='text-lg '>{formatCurrency(row.original.product.price*row.original.quantity)}</p>)
    },
    {
      header: 'Action',
      cell: ({ row }) => loading ? <Skeleton className='h-8 min-w-8'/> : (
        <div className='w-8 h-6 text-[var(--orange)] justify-self-center' onClick={() => deleteItem(row.original.product?._id)}>
          <Delete/>
        </div>
      )
    },
  ], [checkAll, isAllChecked, handleCheckout, isChecked, decreaseQuantity, increaseQuantity, deleteItem, loading]);

  const table = useReactTable({
    data: cartItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className='min-w-full hidden md:table'>
      <thead className=''>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (

              <th key={header.id} className={`${header.id == 'Select All' ? 'text-left' : ''} p-2 bg-[var(--light-grey)]`}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            )
            )}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className={`px-2 py-4 border-y border-[var(--grey)] text-center ${
                cell.column.columnDef.meta?.className || ''
              }`}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CartTable;
