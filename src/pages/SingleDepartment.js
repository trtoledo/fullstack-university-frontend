import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDepartmentById } from "../api";

function SingleDepartment() {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartmentById(id)
      .then(data => {
        setDepartment(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading department...</p>;
  if (!department) return <p>Department not found.</p>;

  return (
    <div>
      <h1>{department.name}</h1>
      <p>{department.description}</p>
      <p>Contact: {department.contactInfo}</p>

      <h3>Professors in this Department:</h3>
      <ul>
        {department.professors.map(prof => (
          <li key={prof.id}>
            {prof.name} - {prof.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SingleDepartment;