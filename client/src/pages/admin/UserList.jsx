import { useUser } from '@/context/UserContext';
import { DeleteOutlined, Search } from '@mui/icons-material';
import { flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';

const UserList = () => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const { users, handleDeleteUser } = useUser();

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Name'
    },
    {
      accessorKey: 'email',
      header: 'Email'
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        (<div className='flex justify-center gap-2'>
          <button
            onClick={() => console.log(row.original)}
            className='bg-[var(--light-grey)] px-3 py-2 rounded-md active:bg-[var(--dark-grey)] cursor-pointer'>Set as Admin</button>
          <button
            onClick={() => handleDeleteUser(row.original._id)}
            className='flex items-center gap-1 bg-red-500 text-white px-3 py-2 rounded-md active:bg-red-700 cursor-pointer'><DeleteOutlined/> Delete User</button>

        </div>
        )
      )
    }
  ], []);

  const table = useReactTable({
    data: users,
    columns,
    sttate: {
      columnFilters,
      globalFilter
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  return (
    <div className='ml-50 px-8 grid bg-white'>
      <div className='flex justify-between sticky top-0 pt-8 pb-3 bg-white'>
        <p className='font-bold text-2xl'>User Management</p>
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
    </div>
  );
};

export default UserList;
