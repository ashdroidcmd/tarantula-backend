import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard"); // ⬅️ Navigate after login
      } else {
        alert(data.error || "Login failed.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-base-100 shadow-xl rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

      <div className="form-control mb-3">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          name="email"
          className="input input-bordered"
          onChange={handleChange}
          value={form.email}
        />
      </div>

      <div className="form-control mb-5">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          name="password"
          className="input input-bordered"
          onChange={handleChange}
          value={form.password}
        />
      </div>

      <button
        className={`btn btn-primary w-full mb-5 ${loading && "btn-disabled"}`}
        onClick={handleLogin}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <a href="/register"><button className="btn btn-primary w-full">Register</button></a>
    </div>
  );
}

export default Login;
