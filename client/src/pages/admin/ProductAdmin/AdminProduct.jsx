import React, { useMemo, useState } from 'react';
import AdminHeader from '../../../components/admin/AdminHeader';
import { useProducts } from '../../../context/ProductsContext';
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Add, ArrowDownward, ArrowUpward, Delete, DeleteOutlined, Edit, Search, Sort } from '@mui/icons-material';
import ProductModal from '../../../components/admin/ProductModal';
import lettuce from '../../../assets/lettuce.jpg';
import Confirmation from '../../../components/admin/Confirmation';

const AdminProduct = () => {
  const { products, openModal, isConfirmOpen, triggerConfirm, closeConfirm, handleDelete } = useProducts();
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo(() => [
    {
      header: 'Title',
      accessorKey: 'title',
      meta: {
        className: 'text-left w-50'
      }
    },
    {
      header: 'Image',
      accessorKey: 'image',
      cell: ({row}) => (
        <div className='h-full w-full flex justify-center'>
          <img
            src={row.original.image}
            alt="product"
            className="h-10 aspect-square object-cover rounded-md"
          />
        </div>
      ),
      meta: {
        className: ''
      }
    },
    {
      header: 'Category',
      accessorKey: 'category',
      enableColumnFilter: true,
    },
    {
      accessorKey: 'price',
      header: ({ column }) => (
        <button onClick={() => column.toggleSorting()} className='cursor-pointer'>
          Price {column.getIsSorted() === 'asc' ? (<ArrowUpward fontSize='small'/>) : column.getIsSorted() === 'desc' ? (<ArrowDownward fontSize='small'/>) : (<Sort fontSize='small'/>)}
        </button>
      ),
    },
    {
      accessorKey: 'stock',
      header: ({ column }) => (
        <button onClick={() => column.toggleSorting()} className='cursor-pointer'>
          Stock {column.getIsSorted() === 'asc' ? (<ArrowUpward fontSize='small'/>) : column.getIsSorted() === 'desc' ? (<ArrowDownward fontSize='small'/>) : (<Sort fontSize='small'/>)}
        </button>
      )
    },
    {
      accessorKey: 'sold',
      header: ({ column }) => (
        <button onClick={() => column.toggleSorting()} className='cursor-pointer'>
          Sold {column.getIsSorted() === 'asc' ? (<ArrowUpward fontSize='small'/>) : column.getIsSorted() === 'desc' ? (<ArrowDownward fontSize='small'/>) : (<Sort fontSize='small'/>)}
        </button>
      )
    },
    {
      accessorKey: 'rating',
      header: ({ column }) => (
        <button onClick={() => column.toggleSorting()} className='cursor-pointer'>
          Rating {column.getIsSorted() === 'asc' ? (<ArrowUpward fontSize='small'/>) : column.getIsSorted() === 'desc' ? (<ArrowDownward fontSize='small'/>) : (<Sort fontSize='small'/>)}
        </button>
      )
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <div className='flex gap-2 justify-center'>
          <button onClick={() => openModal(row.original)} className='p-1 text-white bg-blue-500 active:bg-blue-700 rounded cursor-pointer'>
            <Edit fontSize='small' />
          </button>
          <button className='p-1 text-white bg-red-500 active:bg-red-700 rounded cursor-pointer'>
            <Delete fontSize='small' onClick={() => triggerConfirm(row.original)} />
          </button>
        </div>
      )
    },

  ], []);

  const table = useReactTable({
    data: products,
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
    globalFilterFn: (row, columnId, filterValue) => {
      return (row.original.title.toLowerCase().includes(filterValue.toLowerCase()));
    }
  });

  return (
    <div className='ml-50 px-8 flex flex-col bg-white pb-8'>
      <div className='h-8 bg-white z-10 sticky top-0'></div>
      <div className='flex flex-col gap-3 bg-white pb-3'>
        <p className='text-2xl font-bold'>Product</p>
        <AdminHeader/>
        <div className='h-8 bg-white flex items-center justify-between'>
          <button className='flex gap-2 font-bold cursor-pointer active:text-[var(--teal)]' onClick={() => openModal()}><Add/>Add Product</button>
          <div className='flex'>
            <input value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)}  className='bg-white flex-1 rounded-l-md h-8 px-2 border-y border-l border-[var(--light-grey)]' type='text' placeholder="Search Product" />
            <button className='bg-white rounded-r-md h-8 px-2 hover:bg-[var(--light-grey)] border-y border-r border-[var(--light-grey)]'><Search /></button>
          </div>
        </div>
      </div>
      <table className='min-w-full text-sm'>
        <thead className='sticky top-8'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                if (header.id === 'category'){
                  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
                  return (
                    <th key={header.id} className='bg-[var(--light-grey)]'>
                      <select
                        value={header.column.getFilterValue() ?? ''}
                        onChange={(e) => header.column.setFilterValue(e.target.value || undefined)}
                        className='px-1 py-2 cursor-pointer'
                      >
                        <option value="">Category</option>
                        {uniqueCategories.map((cat) => (
                          <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                        ))}
                      </select>
                    </th>
                  );
                } else {
                  return (
                    <th key={header.id} className='p-2 bg-[var(--light-grey)]'>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  );
                }
              })}
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
      <ProductModal />
      <Confirmation
        open={isConfirmOpen}
        onClose={closeConfirm}
        onConfirm={handleDelete}
        title="Delete Product Permanently"
        confirmText="Yes, delete"
        cancelText="No, cancel"
      >
        <div className='flex justify-center items-center flex-col gap-5'>
          <div className='p-5 bg-[var(--light-red)] w-fit text-[var(--red)] rounded-lg'><DeleteOutlined fontSize='large'/></div>
          <p className='text-center'>Are you sure you want to delete the product permanently?</p>
        </div>
      </Confirmation>
    </div>
  );
};

export default AdminProduct;
