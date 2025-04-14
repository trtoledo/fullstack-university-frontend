import { useParams, Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProfessorById } from "../api";

function SingleFaculty() {
  const { id } = useParams();
  const [professor, setProfessor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfessorById(id)
      .then(data => {
        setProfessor(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching professor:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading Faculty...</p>;
  if (!professor) return <p>Faculty not found.</p>;

  return (
    <div>
      <h1>{professor.name}</h1>
      <img src={professor.profileImage} alt={professor.name} width="200" />
      <p>Email: {professor.email}</p>
      <p>Bio: {professor.bio}</p>
      {professor.department && (
        <p>
          Department:{" "}
          <Link to={`/departments/${professor.department.id}`}>
            {professor.department.name}
          </Link>
        </p>
      )}
    </div>
  );
}

export default SingleFaculty;