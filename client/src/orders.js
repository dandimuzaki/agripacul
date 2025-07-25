const orders = [
  {
    id: 'ORD-001',
    buyerName: 'Andi Saputra',
    buyerEmail: 'andi@example.com',
    items: [
      {
        productId: 'PROD-001',
        name: 'Organic Sweet Potato',
        quantity: 3,
        price: 12000
      },
      {
        productId: 'PROD-002',
        name: 'Fresh Carrots',
        quantity: 2,
        price: 8000
      }
    ],
    total: 3 * 12000 + 2 * 8000, // 52000
    status: 'Processing', // "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"
    paymentStatus: 'Paid', // or "Unpaid"
    shippingMethod: 'MockExpress',
    trackingNumber: 'TRK-837472-ID',
    createdAt: '2025-07-15T14:22:00Z',
    updatedAt: '2025-07-16T10:00:00Z',
    adminNote: 'Packed and ready to ship.'
  },
  {
    id: 'ORD-002',
    buyerName: 'Siti Nurhaliza',
    buyerEmail: 'siti@example.com',
    items: [
      {
        productId: 'PROD-003',
        name: 'Brown Rice (5kg)',
        quantity: 1,
        price: 45000
      }
    ],
    total: 45000,
    status: 'Pending',
    paymentStatus: 'Unpaid',
    shippingMethod: 'MockExpress',
    trackingNumber: null,
    createdAt: '2025-07-16T09:00:00Z',
    updatedAt: '2025-07-16T09:00:00Z',
    adminNote: ''
  },
  {
    id: 'ORD-003',
    buyerName: 'Budi Santoso',
    buyerEmail: 'budi@example.com',
    items: [
      {
        productId: 'PROD-004',
        name: 'Red Chili Peppers (500g)',
        quantity: 5,
        price: 10000
      }
    ],
    total: 50000,
    status: 'Delivered',
    paymentStatus: 'Paid',
    shippingMethod: 'MockExpress',
    trackingNumber: 'TRK-372819-ID',
    createdAt: '2025-07-13T08:10:00Z',
    updatedAt: '2025-07-14T14:30:00Z',
    adminNote: 'Delivered successfully.'
  }
];

export default orders;