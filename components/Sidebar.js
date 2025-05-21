// components/Sidebar.js
"use client";

export default function Sidebar({ setPage, currentPage }) {
  return (
    <div className="w-64 h-screen bg-purple-700 text-white">
      <div className="p-6 text-2xl font-bold border-b border-purple-500">TapCart Admin Panel</div>
      <ul className="space-y-4 px-6 pt-6">
        {[
          ['store', 'Store Info'],
          ['products', 'Products'],
          ['departments', 'Departments'],
          ['holidays', 'Holidays'],
          ['weeklySales', 'Weekly Sales'],
        ].map(([key, label]) => (
          <li key={key}>
            <button
              onClick={() => setPage(key)}
              className={`w-full text-left text-lg p-2 rounded transition ${currentPage === key
                  ? 'bg-white text-purple-700 font-semibold'
                  : 'hover:bg-purple-600'
                }`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}