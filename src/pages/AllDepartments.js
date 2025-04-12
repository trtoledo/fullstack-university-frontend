import { useEffect, useState } from "react";
import { fetchDepartments } from "../api";

function AllDepartments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartments()
      .then(data => {
        setDepartments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading departments...</p>;

  return (
    <div>
      <h1>All Departments</h1>
      <ul>
        {departments.map(dept => (
          <li key={dept.id}>
            <h2>{dept.name}</h2>
            <p>{dept.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllDepartments;