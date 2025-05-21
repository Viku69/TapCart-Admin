// components/Dashboard.js
"use client";

import { useState } from 'react';
import Sidebar from './Sidebar';
import Store from './Store';
import Products from './Products';
import Departments from './Departments';
import Holidays from './Holidays';
import WeeklySales from './WeeklySales';

export default function Dashboard() {
  const [page, setPage] = useState('store'); // default page

  const renderContent = () => {
    switch (page) {
      case 'store':
        return <Store />;
      case 'products':
        return <Products />;
      case 'departments':
        return <Departments />;
      case 'holidays':
        return <Holidays />;
      case 'weeklySales':
        return <WeeklySales />;
      default:
        return <Store />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar setPage={setPage} currentPage={page} />
      <div className="flex-1 p-6 bg-white text-black overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}
