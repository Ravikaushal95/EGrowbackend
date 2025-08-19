import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Fetch users
  const fetchUsers = () => {
    axios.get("http://localhost:7000/admin/users")
      .then(res => setUsers(res.data.data))
      .catch(err => console.error("Error fetching users:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []); // ✅ Only on component mount

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:7000/user/${id}`);
      setUsers(prev => prev.filter(user => user._id !== id)); // ✅ update UI instantly
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Filter users
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.mobile.includes(search)
  );

  // Pagination calculations
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">All Users</h2>

      {/* Search */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name, email, or mobile..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>S.N</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? currentUsers.map((u, i) => (
            <tr key={u._id}>
              <td>{indexOfFirstUser + i + 1}</td>
              <td>
                <img
                  src={`http://localhost:7000/upload/${u.profile}`}
                  alt="profile"
                  width="50"
                  height="50"
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
              </td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.mobile}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u._id)}>
                  Delete
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="6" className="text-center text-danger">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ViewUsers;
