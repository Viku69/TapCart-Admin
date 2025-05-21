import { useState, useEffect } from 'react';
import { fetchHolidays, addHoliday } from '../utils/api';

export default function Holidays() {
  const [holidays, setHolidays] = useState([]);
  const [holidayName, setHolidayName] = useState('');
  const [holidayDate, setHolidayDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHolidays(setHolidays);
  }, []);

  const handleAddHoliday = async () => {
    if (!holidayName || !holidayDate) return;

    setLoading(true);
    await addHoliday(
      holidayName,
      holidayDate,
      setHolidays,
      setHolidayName,
      setHolidayDate
    );
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white shadow rounded border border-purple-200 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Holidays</h2>

      {/* Add Holiday Form */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded w-full sm:w-1/3"
          placeholder="Holiday name"
          value={holidayName}
          onChange={(e) => setHolidayName(e.target.value)}
        />
        <input
          type="date"
          className="border border-gray-300 p-2 rounded w-full sm:w-1/3"
          value={holidayDate}
          onChange={(e) => setHolidayDate(e.target.value)}
        />
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full sm:w-auto"
          onClick={handleAddHoliday}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Holiday'}
        </button>
      </div>

      {/* Holidays List as Cards */}
      {holidays.length === 0 ? (
        <p className="text-gray-500">No holidays found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {holidays.map((holiday) => (
            <div
              key={`${holiday.date}-${holiday.name}`}
              className="border border-purple-200 rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-purple-700">{holiday.name}</h3>
              <p className="text-gray-600">{holiday.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}