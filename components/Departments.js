'use client';

import { useEffect, useState } from 'react';
import { fetchDepartments, handleAddDepartment } from '../utils/api';

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchDepartments(setDepartments);
  }, []);



  
  

  return (
    <div className="min-h-screen p-8 bg-[#f5f3ff]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Departments List */}
        <div className="md:col-span-2 bg-white shadow-md rounded-2xl p-6 max-h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 text-purple-700">Departments</h2>

          {departments.length === 0 ? (
            <p className="text-gray-500">No departments found.</p>
          ) : (
            <ul className="space-y-3">
              {departments.map((dep, i) => (
                <li
                  key={dep.id || i}
                  className="border border-purple-100 rounded-lg p-4 bg-[#faf5ff]"
                >
                  <div className="text-sm text-gray-600">ID: {dep.id}</div>
                  <div className="font-medium text-gray-800">{dep.name}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Sticky Add Department Form */}
        <div className="sticky top-4 h-fit bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-purple-700">Add Department</h2>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              value={newDepartment}
              onChange={(e) => setNewDepartment(e.target.value)}
              placeholder="New Department Name"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={() =>
                handleAddDepartment(
                  setLoading,
                  setNewDepartment,
                  newDepartment,
                  fetchDepartments,
                  setDepartments
                )
              }
              disabled={loading}
              className="bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Department"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
