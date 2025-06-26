import { useEffect, useState } from 'react';

const DeletedItems = () => {
  const [data, setData] = useState([]);
   const token = localStorage.getItem("token");

    // Fetch Soft Deleted Data which ahs deletedAt = Null
   const fetchDeletedItems = () => {
    fetch('http://localhost:3000/api/fetchSoftDeleteData')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Fetch error:', err));
  };

    // Restore Functionality
  const handleRestore = id => {
    fetch(`http://localhost:3000/api/restore/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        if (res.ok) {
          setData((prev) => prev.filter((item) => item.id !== id));
        } else {
          console.error('Failed to restore');
        }
      })
      .catch((err) => console.error('Restore error:', err));
  };

    // Delete Permanently
  const handleDelete = id => {
    fetch(`http://localhost:3000/api/delete/${id}`, {
      method: 'DELETE',
      headers: {
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
    fetchDeletedItems();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Deleted Tarantulas</h1>
      {data.length === 0 ? (
        <p className="text-gray-500">No deleted items.</p>
      ) : (
        <div className="grid gap-4">
          {data.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg shadow">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Species:</strong> {item.species}</p>
              <p><strong>Status:</strong> {item.status}</p>
              
              <button
                onClick={() => handleRestore(item.id)}
                className="btn-success btn"
              >
                Restore
              </button>

              <button
                    className="btn btn-error ms-2"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeletedItems;
