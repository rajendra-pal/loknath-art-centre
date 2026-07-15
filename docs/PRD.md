# PRD - Project Requirement Document

## Project Name: Lokenath Art Center

**Last Updated:** 2026-07-15

---

## 1. Project Overview

**Project Description:** A bilingual (Bengali/English) e-commerce and educational platform for Lokenath Art Center, featuring online art store, student management, and admin dashboard with UPI payment integration.

**Type:** Next.js Full-Stack Web Application

**Core Functionality:**
- Online art supply store with cart, wishlist, checkout
- Student fee management system
- Admin dashboard for orders, students, income tracking
- UPI QR code payment integration
- Real-time database storage via Supabase

---

## 2. Target Users

### Primary Users:
1. **Customers/Students** - Art enthusiasts purchasing supplies or enrolling in courses
2. **Admin** - Lokenath Art Center staff managing orders, students, and payments

### User Demographics:
- Primary region: West Bengal, India (rural/semi-urban)
- Language preference: Bengali (primary), English (secondary)
- Payment method: UPI (primary), Cash on Delivery (secondary)

---

## 3. Core Features

### 3.1 Authentication System
- Email/password-based login and registration
- Role-based access (customer, admin, student)
- Persistent sessions via Supabase Auth

### 3.2 Art Store (Public)
- Product catalog with categories (watercolor, oil, acrylic, brushes, etc.)
- Product search and filtering
- Product detail popup with ratings/reviews
- Shopping cart with quantity management
- Wishlist functionality
- Multiple payment methods (UPI, Card, Net Banking, COD)
- Auto-generated UPI QR codes for payments

### 3.3 Checkout System
- Delivery detail collection (phone, address, city, pincode)
- Payment method selection
- Transaction ID entry for online payments
- Order confirmation and tracking

### 3.4 User Account
- Profile management (name, email, phone, address)
- Order history viewing
- Wishlist access

### 3.5 Admin Dashboard
- Dashboard overview (total students, courses, orders, income)
- Course management (add/edit courses)
- Event management
- Student list with monthly fee tracking
- Blog post creation
- Product management
- Report generation
- UPI settings (UPI ID, business name for QR codes)
- **Student Details Panel** (database-backed)
- **Income Report Panel** (database-backed)
- Order management (view, confirm, cancel, set delivery date)

### 3.6 Database Features
- Real-time order storage
- Student details CRUD
- Income report tracking
- Profile settings (UPI configuration)

---

## 4. Technology Stack

### Frontend:
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom CSS variables
- **UI Components:** Radix UI primitives + shadcn/ui patterns
- **Animations:** Framer Motion, GSAP
- **Icons:** Lucide React

### Backend/Database:
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Real-time:** Supabase Realtime

### Payment:
- **QR Generation:** qrcode library
- **UPI Integration:** Custom UPI string generation (`upi://pay`)

### Development Tools:
- **Testing:** Vitest + Testing Library
- **Linting:** ESLint
- **Type Checking:** TypeScript

---

## 5. Non-Functional Requirements

### Performance:
- Fast page loads with Next.js SSR/SSG
- Optimized images with lazy loading
- Minimal client-side JavaScript

### Accessibility:
- Keyboard navigation support
- ARIA labels on interactive elements
- Bengali language support (UTF-8)

### Responsive Design:
- Mobile-first approach
- Works on all screen sizes (320px to 1920px+)

### Security:
- Row Level Security (RLS) on Supabase tables
- Input validation on forms
- Sanitized user inputs

---

## 6. Current Status

| Feature | Status | Notes |
|---------|--------|-------|
| Landing Page | ✅ Complete | Hero, features, gallery |
| Authentication | ✅ Complete | Login/Register with roles |
| Art Store | ✅ Complete | Products, cart, checkout |
| UPI Payment | ✅ Complete | QR code generation |
| Admin Dashboard | ✅ Complete | Full CRUD operations |
| Student Details DB | ✅ Complete | Supabase-backed |
| Income Report DB | ✅ Complete | Supabase-backed |
| Order Management | ✅ Complete | With delivery dates |
| Tests | ⚠️ Partial | Basic test setup |

---

## 7. Future Considerations (Out of Scope)

- Email notifications
- Payment gateway integration (Razorpay/PayU)
- SMS notifications
- Multi-language expansion
- Mobile app
- Advanced analytics dashboard
- Email marketing integration