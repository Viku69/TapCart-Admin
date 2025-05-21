// components/Store.js
import { useEffect, useState } from 'react';
import { addStore, fetchStores } from '../utils/api';

const Store = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newStore, setNewStore] = useState({
    name: '',
    type: '',
    size: '',
    location: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStores(setStores, setLoading);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStore({ ...newStore, [name]: value });
  };

  const handleAddStore = async () => {
    await addStore(newStore, setError, setNewStore, fetchStores, setStores, setLoading);
  };

  return (
    <div className="min-h-screen p-8 bg-[#f5f3ff]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Store List */}
        <div className="md:col-span-2 bg-white shadow-md rounded-2xl p-6 max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 text-purple-700">Stores</h2>
          {loading ? (
            <div>Loading...</div>
          ) : stores.length === 0 ? (
            <div>No stores found.</div>
          ) : (
            <ul className="space-y-3">
              {stores.map((store) => (
                <li
                  key={store.id}
                  className="border border-purple-100 rounded-lg p-4 bg-[#faf5ff]"
                >
                  <div className="text-lg font-semibold text-gray-800">{store.name}</div>
                  <div className="text-sm text-gray-600">Type: {store.type}</div>
                  <div className="text-sm text-gray-600">Size: {store.size} sq ft</div>
                  <div className="text-sm text-gray-600">Location: {store.location}</div>
                </li>
              ))}
            </ul>
          )}
          {error && <div className="mt-4 text-red-600">{error}</div>}
        </div>

        {/* Add Store Form */}
        <div className="sticky top-4 h-fit bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-purple-700">Add New Store</h2>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              value={newStore.name}
              onChange={handleInputChange}
              placeholder="Store Name"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <select
              name="type"
              value={newStore.type}
              onChange={handleInputChange}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value={1}>1 - Large</option>
              <option value={2}>2 - Medium</option>
              <option value={3}>3 - Small</option>
            </select>
            <input
              type="number"
              name="size"
              value={newStore.size}
              onChange={handleInputChange}
              placeholder="Store Size"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="text"
              name="location"
              value={newStore.location}
              onChange={handleInputChange}
              placeholder="Store Location"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={handleAddStore}
              className="bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
            >
              Add Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;