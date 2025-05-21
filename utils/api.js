import axios from 'axios';

const API_BASE_URL = ' http://127.0.0.1:8000'; 

// STORES

// Fetch all stores
export const fetchStores = async (setStores, setLoading) => {
  try {
    setLoading(true);
    const res = await fetch(`${API_BASE_URL}/stores`, {
      headers: {
        Accept: 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });

    if (res.ok) {
      const data = await res.json();
      setStores(data);
    } else {
      console.error('Fetch failed with status:', res.status);
      setStores([]);
    }
  } catch (err) {
    console.error('Error fetching stores:', err);
    setStores([]);
  } finally {
    setLoading(false);
  }
};


// Add a new store
export const addStore = async (
  newStore,
  setError,
  setNewStore,
  fetchStores,
  setStores,
  setLoading
) => {
  try {
    setError('');
    const response = await axios.post(`${API_BASE_URL}/stores/add`, newStore, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json'
      }
    });

    console.log('Store added:', response.data);
    setNewStore({
      name: '',
      type: 0,
      size: 0,
      location: ''
    });
    fetchStores(setStores, setLoading);
  } catch (error) {
    console.error('Error adding store:', error);
    if (error.response) {
      setError('Failed to add store. Check the data and try again.');
    } else if (error.request) {
      setError('Network error. Please check your connection and try again.');
    } else {
      setError('An error occurred. Please try again later.');
    }
  }
};




// Departments

// ----- Fetch All Departments

export const fetchDepartments = async (setDepartments) => {
  try {
    const res = await fetch(`${API_BASE_URL}/departments`, {
      headers: {
        Accept: 'application/json',
        'ngrok-skip-browser-warning': 'true', // Required for ngrok free
      },
    });

    if (res.ok) {
      const data = await res.json(); // Proper way to parse JSON
      console.log(data);
      setDepartments(data); // Assuming you're using this state
    } else {
      console.error('Fetch failed with status:', res.status);
      setDepartments([]);
    }
  } catch (err) {
    console.error('Error during fetch operation:', err);
    setDepartments([]); // Reset departments if fetch fails
  }
};


// ----- Add a Department

export const handleAddDepartment = async (
  setLoading,
  setNewDepartment,
  newDepartment,
  fetchDepartments,
  setDepartments
) => {
  if (!newDepartment.trim()) return;

  setLoading(true);
  try {
    const res = await fetch(`${API_BASE_URL}/departments/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({ name: newDepartment }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();
    console.log('Added department:', result);

    // Reset input field
    setNewDepartment('');

    // 🔁 Refresh department list
    await fetchDepartments(setDepartments);
  } catch (error) {
    console.error('Error adding department:', error);
  } finally {
    setLoading(false);
  }
};





// Fetch products from the API
 export  const fetchProducts = async (setProducts , setLoading) => {
    try {
      setLoading(true); // Set loading to true before API call
      const response = await axios.get(`${API_BASE_URL}/products`, {
        headers: {
          Accept: 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      });
      
      if (response.data && Array.isArray(response.data)) {
        setProducts(response.data); // Set products if valid data
      } else {
        console.error('Invalid product data:', response.data);
        setProducts([]); // Reset if invalid data
      }
    } catch (error) {
      console.error('Error fetching products:', error);

      if (error.response) {
        // Response errors (e.g., 4xx, 5xx)
        console.error('Response Error:', error.response);
      } else if (error.request) {
        // Network errors (e.g., no response received)
        console.error('Request Error:', error.request);
      } else {
        // General errors
        console.error('General Error:', error.message);
      }

      setError('Error fetching products. Please try again later.');
      setProducts([]); // Reset to empty if there's an error
    } finally {
      setLoading(false); // Set loading to false after request is complete
    }
  };

  // Add new product using POST API
export const addProduct = async (
  productData,
  setError,
  setNewProduct,
  fetchProducts,
  setProducts,
  setLoading
) => {
  try {
    setError('');
    const response = await axios.post(
      `${API_BASE_URL}/products/add`,
      productData,
      {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Product added:', response.data);

    // Reset the form
    setNewProduct({
      name: '',
      price: 0,
      qr_code: '',
      department_id: '',
      stock_quantity: 0,
      reorder_threshold: 0,
    });

    // Refresh the product list
    fetchProducts(setProducts, setLoading);
  } catch (error) {
    console.error('Error adding product:', error);
    if (error.response) {
      setError('Failed to add product. Check the data and try again.');
    } else if (error.request) {
      setError('Network error. Please check your connection and try again.');
    } else {
      setError('An error occurred. Please try again later.');
    }
  }
};
  





export const fetchHolidays = async (setHolidays) => {
  try {
    const res = await fetch(`${API_BASE_URL}/holidays`, {
      headers: {
        Accept: 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    });

    if (res.ok) {
      const data = await res.json();
      setHolidays(data);
    } else {
      console.error('Failed to fetch holidays:', res.status);
      setHolidays([]);
    }
  } catch (err) {
    console.error('Error fetching holidays:', err);
    setHolidays([]);
  }
};

export const addHoliday = async (
  name,
  date,
  setHolidays,
  setHolidayName,
  setHolidayDate
) => {
  try {
    const res = await fetch(`${API_BASE_URL}/add-holiday`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({ name, date }),
    });

    if (res.ok) {
      setHolidayName('');
      setHolidayDate('');
      fetchHolidays(setHolidays); // Refresh the list
    } else {
      console.error('Failed to add holiday:', res.status);
    }
  } catch (err) {
    console.error('Error adding holiday:', err);
  }
};