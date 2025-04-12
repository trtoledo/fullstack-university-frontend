import { useEffect, useState } from "react";
import { fetchFaculty } from "../api";
import { Link } from "react-router-dom";

function AllFaculty() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaculty()
      .then(data => {
        setFaculty(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching faculty:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading faculty...</p>;

  return (
    <div>
      <h1>All Faculty</h1>
      <ul>
        {faculty.map(prof => (
          <li key={prof.id}>
            <Link to={`/faculty/${prof.id}`}>
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