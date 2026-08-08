# Agripacul - A Fullstack E-commerce to Deliver From Farm to Table

A fullstack e-commerce platform inspired by our university entrepreneurship program, where we sold fresh vegetables directly to customers. This project simulates a production-ready online store with customer and admin workflows, covering product management, inventory, checkout, and order processing.

## Overview

The application is built using a modern fullstack architecture:

- **Frontend:** Next.js
- **Backend:** Golang (REST API)
- **Database:** PostgreSQL
- **Cache:** Redis
- **State Management:** Zustand
- **Data Fetching:** TanStack Query
- **Shipping API:** RajaOngkir
- **Location Data:** wilayah.id

The goal of this project is not only to build an online store, but also to understand how a real e-commerce system handles inventory, transactions, shipping, and order management.

---

# Features

## 1. Landing Page

The landing page tells the story behind Agripacul and the entrepreneurship program that inspired this project.

### Features

- Responsive layout for desktop and mobile
- Hero section with product image slider
- Product search
- Featured categories
- Featured products
- Value proposition section
- Customer testimonials
- Contact form with email integration

---

## 2. Authentication

Supports authentication for both customers and administrators.

### Features

- Customer registration
- Customer login
- Admin login
- JWT authentication
- Role-based routing
- User session stored using Zustand
- API error messages displayed directly to users

---

## 3. Browse Products

Users can easily discover products using multiple filtering options.

### Features

- Keyword search
- Category filter
- Category dropdown
- Price range filter
- Rating filter
- Product sorting
- Infinite loading ("Load More")
- Skeleton loading state
- Empty state when no products match
- Product detail navigation

---

## 4. Product Details

Displays complete product information before purchasing.

### Features

- Product image gallery
- Variant selection
- Add to cart
- Automatic cart creation for first purchase

---

## 5. Shopping Cart

A backend-driven cart system that keeps calculations consistent.

### Features

- Select items for checkout
- Quantity update
- Delete item
- Clear cart
- Server-side calculation of selected total price

### Implementation Notes

Instead of creating separate endpoints for increasing and decreasing quantity, both actions use the same update endpoint by sending the desired quantity.

---

## 6. Checkout

The checkout flow is the most complex part of the application.

### a. Checkout Steps

- Shipping address
- Shipping option
- Order items
- Payment method
- Order summary

### b. Address Management

Users can

- Create address
- Edit address
- Delete address
- Set default address
- Select shipping address

Location selection is hierarchical:

Province → Regency → District → Subdistrict

The frontend only requests dependent data when necessary using TanStack Query's `enabled` option to avoid unnecessary API calls.

---

### c. Shipping Calculation

Shipping costs are calculated using RajaOngkir.

Because RajaOngkir has request limitations, mock shipping options are used as a fallback for demonstration purposes.

To support shipping calculations, the application combines:

- wilayah.id location data
- RajaOngkir location IDs

---

### d. Backend Order Processing

Order creation is executed inside a database transaction.

The backend performs several validations:

- Retrieve authenticated customer
- Validate selected cart items
- Validate SKU stock
- Lock SKU rows to prevent concurrent stock updates
- Create order
- Create order items
- Create shipping record
- Create payment record
- Update product sold count

One important design decision is storing ordered products as **snapshots** instead of referencing current product records.

This ensures historical orders remain unchanged even if administrators later modify product names, prices, or variants.

---

## 7. Order History

Customers can view all previous purchases.

### Features

- Filter by order status
- Sorting
- Pagination
- Status badges
- Cancel availability
- Review availability

Business rules determine whether an order can be cancelled or reviewed.

---

## 8. Order Details

Displays complete information for a specific order.

### Features

- Order summary
- Shipping information
- Payment information
- Timeline of order status updates

---

## 9. Product Reviews

Customers can submit reviews after receiving their orders.

### Features

- Star rating
- Product comments
- Batch review submission

Reviews are validated using the relationship between:

Order + Order Item

This prevents users from creating fake reviews for products they never purchased.

---

## 10. User Profile

Users can manage personal information.

### Features

- Update profile picture
- Manage addresses

Address management is separated from the checkout page to avoid unnecessary checkout recalculations.

---

# Admin Panel

The admin dashboard provides complete product management.

---

## 1. Category Management

- Create category
- Update category
- Delete category

---

## 2. Product Management

Products are created through several stages.

### a. General Information

- Product information
- Categories
- Basic details

### b. Product Editing

- Add variants
- Update variants
- Upload main image
- Upload gallery

### c. SKU Management

Each combination of variants generates Stock Keeping Units (SKU).

Administrators configure:

- SKU code
- Price
- Minimum stock

Products can then be:

- Published
- Unpublished
- Deleted

---

## 3. Inventory Management

Inventory is managed at SKU level.

### Features

- Initial stock creation
- Stock adjustment
- Restock
- Inventory filtering
- Inventory history

Inventory logs record every stock update for auditing purposes.

---

## 4. Order Management (Admin)

Administrators manage incoming customer orders.

### Features

- View order details
- Confirm order
- Cancel order
- Chat customer
- Filter
- Sort

---

# Technical Highlights

## Backend

- RESTful API using Golang
- PostgreSQL transaction handling
- Redis integration
- JWT authentication
- Role-based authorization

---

## Frontend

- Next.js
- TanStack Query
- Zustand
- Responsive UI
- Skeleton loading
- Infinite loading

---

## External Services

- RajaOngkir Shipping API
- wilayah.id Location API
- Email integration

---

# Engineering Decisions

Some implementation decisions made during development:

- Unified API endpoint for cart quantity updates.
- Backend computes cart totals to ensure consistency.
- Snapshot-based order items preserve historical purchase data.
- Conditional queries reduce unnecessary API requests.
- Database row locking prevents stock race conditions during checkout.
- Mock shipping options provide graceful fallback when external API limits are exceeded.

---

# Known Limitations

- Default product variant is not automatically selected.
- Checkout performs multiple API requests as users progress through each step.
- Inventory updates are performed one SKU at a time instead of batch operations.
- Dashboard and analytics are intentionally excluded and planned for a separate data visualization project.

---

# What I Learned

This project helped me gain practical experience with:

- Designing RESTful APIs
- Building fullstack applications
- Database transactions
- Inventory management
- E-commerce workflows
- Authentication & authorization
- External API integration
- State management
- Optimizing frontend data fetching
- Designing systems with data consistency in mind
