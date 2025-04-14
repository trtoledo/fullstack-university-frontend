import { useState, useEffect } from "react";

function ManageProfessors() {
  const [professors, setProfessors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    email: "",
    profileImage: "",
    departmentId: ""
  });

  useEffect(() => {
    fetch("http://localhost:3000/professors")
      .then(res => res.json())
      .then(data => setProfessors(data));
    fetch("http://localhost:3000/departments")
      .then(res => res.json())
      .then(data => setDepartments(data));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3000/professors", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
      "Authorization": `Bearer ${token}` 
    },
      body: JSON.stringify(formData)
    });
    const newProf = await res.json();
    setProfessors([...professors, newProf]);
    setFormData({ name: "", bio: "", email: "", profileImage: "", departmentId: "" });
  };

  const handleDelete = async id => {
    await fetch(`http://localhost:3000/professors/${id}`, { method: "DELETE" });
    setProfessors(professors.filter(p => p.id !== id));
  };

  return (
    <div>
      <h1>Manage Professors</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="profileImage" placeholder="Profile Image URL" value={formData.profileImage} onChange={handleChange} />
        <select name="departmentId" value={formData.departmentId} onChange={handleChange}>
          <option value="">Select Department</option>
          {departments.map(dept => (
            <option key={dept.id} value={dept.id}>{dept.name}</option>
          ))}
        </select>
        <button type="submit">Add Professor</button>
      </form>

      <h2>Existing Professors</h2>
      <ul>
        {professors.map(p => (
          <li key={p.id}>
            {p.name} ({p.department?.name}) <button onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageProfessors;