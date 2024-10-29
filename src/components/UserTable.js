import React, { useState } from 'react';

const UserTable = ({ users }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleDetails = (userId) => {
    setExpandedRow((prevUserId) => (prevUserId === userId ? null : userId));
  };

  return (
    <table className="min-w-full border border-gray-300 mt-4">
      <thead>
        <tr className="bg-gray-200 dark:bg-gray-700">
          <th className="px-4 py-2 border">ID</th>
          <th className="px-4 py-2 border">Name</th>
          <th className="px-4 py-2 border">Email</th>
          <th className="px-4 py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <React.Fragment key={user.id}>
            <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
              <td className="px-4 py-2 border">{user.id}</td>
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => toggleDetails(user.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {expandedRow === user.id ? 'Hide Details' : 'More Details'}
                </button>
              </td>
            </tr>
            {expandedRow === user.id && (
              <tr>
                <td colSpan="4" className="px-4 py-2 border bg-gray-50 dark:bg-gray-800">
                  <div className="ml-4">
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Address:</strong> {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
