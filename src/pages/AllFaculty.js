import { useEffect, useState } from "react";
import { fetchProfessors } from "../api";
import { Link } from "react-router-dom";

function AllFaculty() {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfessors()
      .then(data => {
        setProfessors(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching professors:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading faculty...</p>;

  return (
    <div>
      <h1>All Faculty</h1>
      <ul>
        {professors.map(prof => (
          <li key={prof.id}>
            <Link to={`/professors/${prof.id}`}>
              <h2>{prof.name}</h2>
            </Link>
            <p>Email: {prof.email}</p>
            <p>Department: {prof.department?.name || "Unassigned"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllFaculty;