import { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = async () => {
    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registered successfully!");
    } else {
      alert(data.error || "Registration failed.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-base-100 shadow-xl rounded-xl">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <div className="form-control mb-2">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          name="name"
          className="input input-bordered"
          onChange={handleChange}
        />
      </div>
      <div className="form-control mb-2">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          name="email"
          className="input input-bordered"
          onChange={handleChange}
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          name="password"
          className="input input-bordered"
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-primary w-full mb-5" onClick={handleRegister}>
        Register
      </button>

      <a href="/"><button className="btn btn-primary w-full">Login</button></a>
    </div>
  );
}

export default Register;
