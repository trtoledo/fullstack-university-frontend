import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/departments" style={{ marginRight: '1rem' }}>Departments</Link>
      <Link to="/faculty" style={{ marginRight: '1rem' }}>Faculty</Link>

      {isAuthenticated ? (
        <>
          <Link to="/admin/departments" style={{ marginRight: '1rem' }}>Admin Panel</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;