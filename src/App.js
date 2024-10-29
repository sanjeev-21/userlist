import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import UserTable from './components/UserTable';
import ThemeToggle from './components/ThemeToggle';
import SearchBar from './components/SearchBar';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true); 

    // Debounce search with a timeout
    const timer = setTimeout(() => {
      const results = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(results);
      setLoading(false); // Hide loader after search
    }, 300);

    return () => clearTimeout(timer); // Clear timer on component unmount or query change
  }, [searchQuery, users]);

  return (
    <ThemeProvider>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">User List</h1>
        <ThemeToggle />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {loading ? (
          <div className="flex justify-center items-center mt-8">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        ) : filteredUsers.length > 0 ? ( // Show table if there are results
          <UserTable users={filteredUsers} />
        ) : (
          <p className="text-center text-gray-500 mt-8">No Data</p> // Show "No Data" message if no results
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
