import { useEffect, useState } from 'react';
import axios from 'axios';
import { addProduct, fetchDepartments, fetchProducts } from '../utils/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    qr_code: '',
    department_id: '',
    stock_quantity: '',
    reorder_threshold: '',
  });
  const [error, setError] = useState('');

  
  useEffect(() => {
    fetchProducts(setProducts, setLoading); // Fetch products when component mounts
    fetchDepartments(setDepartments);
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen p-8 bg-[#f5f3ff]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product List */}
        <div className="md:col-span-2 bg-white shadow-md rounded-2xl p-6 max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 text-purple-700">Products</h2>
          {loading ? (
            <div>Loading...</div>
          ) : products.length === 0 ? (
            <div>No products found.</div>
          ) : (
                <ul className="space-y-3">
                  {products.map((product) => (
                    <li
                      key={product.id}
                      className="border border-purple-100 rounded-lg p-4 bg-[#faf5ff]"
                    >
                      <div className="font-medium text-gray-800 text-lg">{product.name}</div>
                      <div className="text-sm text-gray-600 mb-1">Price: Rs {product.price}</div>
                      <div className="text-sm text-gray-600 mb-1">
                        Department: <span className="font-medium">{product.department_id || 'N/A'}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        Stock Quantity: <span className="font-medium">{product.stock_quantity}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Reorder Threshold: <span className="font-medium">{product.reorder_threshold}</span>
                      </div>
                    </li>
                  ))}
                </ul>
          )}
          {error && <div className="mt-4 text-red-600">{error}</div>}
        </div>

        {/* Sticky Add Product Form */}
        <div className="sticky top-4 h-fit bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-purple-700">Add New Product</h2>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="p-3 border rounded-md"
            />
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="p-3 border rounded-md"
            />
            <input
              type="text"
              name="qr_code"
              value={newProduct.qr_code}
              onChange={handleInputChange}
              placeholder="QR Code"
              className="p-3 border rounded-md"
            />
            <select
              name="department_id"
              value={newProduct.department_id}
              onChange={handleInputChange}
              className="p-3 border rounded-md"
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="stock_quantity"
              value={newProduct.stock_quantity}
              onChange={handleInputChange}
              placeholder="Stock Quantity"
              className="p-3 border rounded-md"
            />
            <input
              type="number"
              name="reorder_threshold"
              value={newProduct.reorder_threshold}
              onChange={handleInputChange}
              placeholder="Reorder Threshold"
              className="p-3 border rounded-md"
            />
            <button
              onClick={() =>
                addProduct(
                  newProduct,
                  setError,
                  setNewProduct,
                  fetchProducts,
                  setProducts,
                  setLoading
                )
              }
              className="bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
