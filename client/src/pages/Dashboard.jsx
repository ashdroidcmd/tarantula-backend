import { useEffect, useState } from 'react';
import LogoutButton from '../components/LogoutButton';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ name: '', status: '', id: '', image: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState("asc");
  const [limit, setLimit] = useState('10');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Fetch all data
  const getData = () => {
    const url = `http://localhost:3000/api/fetchData?sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`;

    fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(json => {
        setData(json.data || []);
        setTotalPages(json.totalPages || 1);
      })
      .catch(err => console.error('Error fetching data:', err));
  };

  const handleSearch = () => {
    fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(searchQuery)}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error('Search error:', err));
  };

  // Submit or update
  const handleSubmit = e => {
    e.preventDefault();

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `http://localhost:3000/api/update/${form.id}`
      : 'http://localhost:3000/api/postData';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(form),
    })
      .then(res => res.text())
      .then(msg => {
        console.log(msg);
        setForm({ name: '', status: '', id: '', image: '' });
        setIsEditing(false);
        getData();
      })
      .catch(err => console.error('Error:', err));
  };

  // Load data into form for editing
  const handleEdit = item => {
    setForm({
      name: item.name,
      status: item.status,
      image: item.image,
      id: item.id,
    });
    setIsEditing(true);
  };
  
  const softDelete = id => {
    fetch(`http://localhost:3000/api/softDelete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.text())
      .then(msg => {
        console.log(msg);
      })
      .catch(err => console.error('Delete error:', err));
  };

  useEffect(() => {
    getData();
  }, [sortBy, order, limit, page]);

  return (
    <>
      <div className="mx-auto max-w-7xl p-6 ">
        <LogoutButton />
        <h1 className="mb-6 text-center text-3xl font-bold">To Do Tarantula Feeding</h1>
        <h1 className="text-2xl font-bold text-center ">Welcome, {user?.name}!</h1>
        <p className="text-center mb-4">Your email: {user?.email}</p>

        {/* 🔍 Search Bar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row justify-center items-center">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input input-bordered w-full sm:max-w-xs"
          />
          <div className="flex gap-2">
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
            <button className="btn btn-outline" onClick={getData}>
              Clear
            </button>
          </div>
          
        </div>

        {/* Sort Options */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row justify-center">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered w-full sm:max-w-xs"
          >
            <option value="id">Sort by ID</option>
            <option value="name">Sort by Name</option>
            <option value="status">Sort by Status</option>
          </select>

          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="select select-bordered w-full sm:max-w-xs"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

          <input
            type="number"
            placeholder="Limit"
            value={limit}
            onChange={e => setLimit(e.target.value)}
            className="input input-bordered w-full sm:max-w-xs"
          />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-base-200 mb-6 space-y-4 rounded-xl p-4 shadow-md"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              className="input input-bordered w-full"
            />

            <input
              type="text"
              placeholder="Image"
              value={form.image}
              onChange={e => setForm({ ...form, image: e.target.value })}
              required
              className="input input-bordered w-full"
            />

            <select
              className="select select-bordered w-full"
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
              required
            >
              <option value="" disabled>Select Status</option>
              <option value="Done">Done</option>
              <option value="Not Done">Not Done</option>
            </select>

            <input
              type="number"
              placeholder="ID"
              value={form.id}
              onChange={e => setForm({ ...form, id: e.target.value })}
              required
              disabled={isEditing}
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex flex-wrap justify-end gap-3">
            <button type="submit" className="btn btn-success">
              {isEditing ? 'Update' : 'Add'}
            </button>
            {isEditing && (
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => {
                  setForm({ name: '', status: '', image: '', id: '' });
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Pagination Controls */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            className="btn btn-sm"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            ⬅ Previous
          </button>

          <span className="self-center">Page {page} of {totalPages}</span>

          <button
            className="btn btn-sm"
            onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
            disabled={page === totalPages}
          >
            Next ➡
          </button>
        </div>

        {/* Fetched Data */}
        <h2 className="mb-4 text-xl font-semibold">Tarantulas</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <li key={item.id} className="card bg-base-100 shadow-xl border border-gray-500">
              <figure className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg">{item.name}</h2>
                <p><strong>ID:</strong> {item.id}</p>
                <p className="flex flex-row items-center space-x-2">
                  <strong>Feed:</strong>{" "}
                  <span
                    className={`badge ${item.status === "Done" ? "badge-success" : "badge-warning"}`}
                  >
                    {item.status}
                  </span>
                </p>
                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => softDelete(item.id)}
                  >
                    Delete
                </button>

                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
