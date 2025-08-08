import React, { useMemo, useState } from 'react';
import { RemoveRedEyeOutlined, Search } from '@mui/icons-material';
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import AdminHeader from '../../components/admin/AdminHeader';
import OrderModal from '../../components/admin/OrderModal';

const AdminOrderList = () => {
  const orders = []
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'Order ID'
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        const formatted = date.toLocaleString('id-ID', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
        return (
          <p>{formatted}</p>
        );
      }
    },
    {
      accessorKey: 'buyerName',
      header: 'Buyer Name'
    },
    {
      accessorKey: 'items',
      header: 'Items',
      cell: (info) => (
        <div>
          {info.getValue().map((item) => (
            <p>{item.name} : {item.quantity}</p>
          ))}
        </div>
      )
    },
    {
      accessorKey: 'total',
      header: 'Total'
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
      cell: ({ row }) => {
        const date = new Date(row.original.updatedAt);
        const formatted = date.toLocaleString('id-ID', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
        return (
          <p>{formatted}</p>
        );
      }
    },
    {
      accessorKey: 'trackingNumber',
      header: 'Tracking Number',
    },
    {
      header: 'Action',
      cell: () => (
        <div className='w-full flex items-center justify-center'>
          <button className='p-1 text-[var(--black)] bg-[var(--light-grey)] active:bg-[var(--grey)] rounded cursor-pointer'>
            <RemoveRedEyeOutlined fontSize='small'/>
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
    <div className='ml-50 px-8 flex flex-col bg-white pb-8'>
      <div className='h-8 bg-white z-100 sticky top-0'></div>
      <div className='flex flex-col gap-3 bg-white pb-3'>
        <p className='text-2xl font-bold'>Orders</p>
        <AdminHeader/>
        <div className='h-8 bg-white flex items-center justify-between'>
          <div className='flex'>
            <input value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)}  className='bg-white flex-1 rounded-l-md h-8 px-2 border-y border-l border-[var(--light-grey)]' type='text' placeholder="Search Order" />
            <button className='bg-white rounded-r-md h-8 px-2 hover:bg-[var(--light-grey)] border-y border-r border-[var(--light-grey)]'><Search /></button>
          </div>
        </div>
      </div>
      <table className='min-w-full text-sm'>
        <thead className='sticky top-38'>
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
