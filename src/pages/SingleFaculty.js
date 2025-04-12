import { useParams, Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFacultyById } from "../api";

function SingleFaculty() {
  const { id } = useParams();
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFacultyById(id)
      .then(data => {
        setFaculty(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching professor:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading Faculty...</p>;
  if (!faculty) return <p>Faculty not found.</p>;

  return (
    <div>
      <h1>{faculty.name}</h1>
      <img src={faculty.profileImage} alt={faculty.name} width="200" />
      <p>Email: {faculty.email}</p>
      <p>Bio: {faculty.bio}</p>
      {faculty.department && (
        <p>
          Department:{" "}
          <Link to={`/departments/${faculty.department.id}`}>
            {faculty.department.name}
          </Link>
        </p>
      )}
    </div>
  );
}

export default SingleFaculty;