import React from 'react';
import './TransactionDetail.css';
import TransactionItem from '../TransactionItem/TransactionItem.jsx';
import PageNav from '../PageNav/PageNav.jsx';

const TransactionDetail = () => {
  return (
    <div className='md:mt-15'>
      <PageNav text="Transaction Detail" />
      <div className='p-3 md:p-5 modal overflow-hidden bg-white pb-18'>
        <div className='grid md:grid-cols-[2fr_1fr] gap-3'>
          <div className='flex flex-col gap-3'>
            <section className='flex flex-col p-3 shadow-[0_0_8px_rgba(0,0,0,0.2)] rounded-lg'>
              <p className='font-bold mb-3'>Pesanan Selesai</p>
              <div className='text-sm flex justify-between flex gap-2'>
                <p>Nomor Pesanan</p>
                <p>Nomor Pesanan</p>
              </div >
              <div className='text-sm flex justify-between flex gap-2'>
                <p>Tanggal Pembelian</p>
                <p>Nomor Pesanan</p>
              </div>
            </section>
            <section className='p-3 shadow-[0_0_8px_rgba(0,0,0,0.2)] rounded-lg'>
              <p className='font-bold mb-3'>Detail Produk</p>
              <div className='flex flex-col gap-3'>
                <TransactionItem />
                <TransactionItem />
                <TransactionItem />
              </div>
            </section>
            <section className='grid-cols-[1fr_2fr] grid gap-3 p-3 shadow-[0_0_8px_rgba(0,0,0,0.2)] rounded-lg'>
              <p className='font-bold col-span-2'>Pengiriman</p>
              <p className='flex justify-between'>Opsi<span>:</span></p>
              <p>Dandi Muhamad Zaki</p>
              <p className='flex justify-between'>Alamat<span>:</span></p>
              <p>Dandi Muhamad Zaki</p>
            </section>
          </div>
          <section className='h-fit flex flex-col gap-3 shadow-[0_0_8px_rgba(0,0,0,0.2)] rounded-lg p-3'>
            <p className='font-bold'>Rincian Pembayaran</p>
            <div className='flex justify-between text-sm'>
              <p>Metode Pembayaran</p>
              <p className='font-bold'>OVO</p>
            </div>
            <div className='flex justify-between text-sm'>
              <p>Total Harga Barang</p>
              <p className='font-bold'>OVO</p>
            </div>
            <div className='flex justify-between text-sm'>
              <p>Ongkos Kirim</p>
              <p className='font-bold'>OVO</p>
            </div>
            <div className='flex justify-between text-sm'>
              <p>Total Belanja</p>
              <p className='font-bold'>OVO</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
