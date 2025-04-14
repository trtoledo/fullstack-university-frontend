import { useState, useEffect } from "react";

function ManageDepartments() {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    bannerImage: "",
    contactInfo: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/departments")
      .then((res) => res.json())
      .then((data) => setDepartments(data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/departments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const newDepartment = await res.json();
    setDepartments([...departments, newDepartment]);
    setFormData({
      name: "",
      description: "",
      bannerImage: "",
      contactInfo: "",
    });
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/departments/${id}`, { method: "DELETE" });
    setDepartments(departments.filter((d) => d.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Departments</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Department</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md"
          />
          <input
            name="bannerImage"
            placeholder="Banner Image URL"
            value={formData.bannerImage}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md"
          />
          <input
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md col-span-1 md:col-span-2"
          />
          <input
            name="contactInfo"
            placeholder="Contact Info"
            value={formData.contactInfo}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md col-span-1 md:col-span-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Department
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Existing Departments</h2>
      <ul className="space-y-4">
        {departments.map((dept) => (
          <li
            key={dept.id}
            className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm"
          >
            <div>
              <p className="font-medium text-lg text-gray-800">{dept.name}</p>
              <p className="text-sm text-gray-500">{dept.description}</p>
            </div>
            <button
              onClick={() => handleDelete(dept.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageDepartments;