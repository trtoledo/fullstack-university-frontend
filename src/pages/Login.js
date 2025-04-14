import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // reset error message

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.token) {
        login(data.token); 
        navigate("/admin/departments");
      } else {
        setError(data.error || "Login failed.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        name="email"
        type="email"
        className="w-full p-3 mb-4 border border-gray-300 rounded-md"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
        required
      />
      <input
        name="password"
        type="password"
        className="w-full p-3 mb-6 border border-gray-300 rounded-md"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Password"
        required
      />
      <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">Login</button>
    </form>
    </div>
  );
}

export default Login;