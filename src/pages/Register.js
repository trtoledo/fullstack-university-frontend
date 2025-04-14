import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async e => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (res.status >= 200 && res.status < 300) {
        alert("Registration successful! You can now log in.");
      } else {
        alert(`Error: ${data.message || data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
      <input name="email" type="email" onChange={handleChange} placeholder="Email" className="w-full p-3 mb-4 border border-gray-300 rounded-md" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" className="w-full p-3 mb-6 border border-gray-300 rounded-md"/>
      <button type="submit" className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600">Register</button>
    </form>
    </div>
  );
}

export default Register;