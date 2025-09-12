import React, { useMemo, useState } from 'react';
import { CheckBoxOutlineBlankOutlined, CheckBoxOutlined, RemoveRedEyeOutlined, Search } from '@mui/icons-material';
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { useOrder } from '@/context/OrderContext';
import { formatCurrency, formatDate } from '@/utils/format';
import OrderModal from '@/components/admin/OrderModal';

const AdminOrderList = () => {
  const { orders, seeOrderDetail, confirmOrder } = useOrder();
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo(() => [
    {
      accessorKey: '_id',
      header: 'Order ID',
      cell: ({ row }) => (
        <div className='wrap-anywhere w-10'>
          <p>{row.original._id}</p>
        </div>
      )
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => (
        <p>{formatDate(row.original.createdAt)}</p>
      )
    },
    {
      accessorKey: 'buyerName',
      header: 'Buyer Name',
      cell: ({ row }) => (row.original.address.recipientName)
    },
    {
      accessorKey: 'itemsSnapshot',
      header: 'Items',
      cell: (info) => (
        <div>
          {info.getValue().map((item, index) => (
            <p key={index}>{item.product.title} : {item.quantity}</p>
          ))}
        </div>
      )
    },
    {
      accessorKey: 'totalPrice',
      header: 'Total Price',
    },
    {
      accessorKey: 'totalBill',
      header: 'Total Bill',
    },
    {
      accessorKey: 'paymentStatus',
      header: 'Payment Status'
    },
    {
      accessorKey: 'status',
      header: 'Status'
    },
    {
      accessorKey: 'updatedAt',
      header: 'Updated At',
      cell: ({ row }) => (
        <p>{formatDate(row.original.updatedAt)}</p>
      )
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <div className='w-full grid gap-2'>
          { row.original.status === 'pending' ?
            (<button
              onClick={() => confirmOrder(row.original._id)}
              className='flex items-center gap-1 p-1 text-[var(--black)] bg-[var(--light-grey)] active:bg-[var(--grey)] rounded cursor-pointer'>
              <CheckBoxOutlineBlankOutlined fontSize='small'/>
            Confirm
            </button>)
            :
            (<button className='flex items-center gap-1 p-1 text-[var(--black)] bg-[var(--light-grey)] active:bg-[var(--grey)] rounded cursor-pointer'>
              <CheckBoxOutlined fontSize='small'/>
            Confirmed
            </button>)
          }
          <button
            onClick={() => seeOrderDetail(row.original)}
            className='flex items-center gap-1 p-1 text-[var(--black)] bg-[var(--light-grey)] active:bg-[var(--grey)] rounded cursor-pointer'>
            <RemoveRedEyeOutlined fontSize='small'/>
            Detail
          </button>
        </div>
      )
    }
  ], []);

  const table = useReactTable({
    data: orders,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className='ml-50 px-8 grid bg-white'>
      <div className='flex justify-between sticky top-0 pt-8 pb-3 bg-white'>
        <p
          onClick={() => console.log(orders)}
          className='font-bold text-2xl'>Order Management</p>
        <div className='h-8 bg-white flex items-center gap-3'>
          <div className='flex'>
            <input value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)}  className='bg-white flex-1 rounded-l-md h-8 px-2 border-y border-l border-[var(--light-grey)]' type='text' placeholder="Search Order" />
            <button className='bg-white rounded-r-md h-8 px-2 hover:bg-[var(--light-grey)] border-y border-r border-[var(--light-grey)]'><Search /></button>
          </div>
        </div>
      </div>

      <table className='min-w-full text-sm'>
        <thead className='sticky top-19'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className='p-2 bg-[var(--light-grey)]'>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={`p-2 border-y border-[var(--grey)] text-center ${
                  cell.column.columnDef.meta?.className || ''
                }`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <OrderModal/>
    </div>
  );
};

export default AdminOrderList;
