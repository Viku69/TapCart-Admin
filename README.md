
# TapCart Admin Panel

A modern admin dashboard for managing the TapCart ecosystem, built with Next.js 14, ShadCN UI, and Tailwind CSS.

## 🚀 Features

- 🏬 Manage stores: create, view, update, delete
- 📦 Manage products: list, add, edit, remove products
- 🗂️ Organize departments
- 📅 Manage store holidays
- 📈 Visualize weekly sales data
- 🔐 Secure access (future: authentication support)
- 🌐 Fully responsive and user-friendly interface

## 📁 Folder Structure

```
/tapcart-admin-panel
├── app
│   ├── layout.js
│   └── page.js
├── components
│   ├── ui (ShadCN UI components)
│   ├── shared (Header, Sidebar, etc.)
│   └── custom (Entity-specific UIs)
├── types
│   └── index.js (Type definitions)
├── public
│   └── images (icons, logos, etc.)
├── styles
│   └── globals.css
└── utils
    └── api.js
```

## 🧰 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS, ShadCN UI
- **Icons**: Lucide React
- **Charts**: Recharts
- **Language**: TypeScript

## 🔌 Backend API Integration

Connects to a FastAPI backend to perform CRUD operations on:

- Stores
- Products
- Departments
- Holidays
- Orders (for reports)

API service uses a centralized `Utils/api.js` for easy endpoint management.


## 🚧 Future Improvements

- Authentication & Authorization (JWT-based)
- Role-based Access Controls (RBAC)
- Bulk operations (CSV uploads, bulk delete)
- Export reports as PDF/Excel
- Dark mode toggle

## 🛠️ Setup Instructions

1. **Clone the repo:**
   ```bash
   git clone https://github.com/yourusername/tapcart-admin-panel.git
   cd tapcart-admin-panel
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API base URL in `lib/api.ts`**

4. **Run the app:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   ```bash
   http://localhost:3000
   ```

