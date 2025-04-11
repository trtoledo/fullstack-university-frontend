import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllDepartments from "./pages/AllDepartments";
import SingleDepartment from "./pages/SingleDepartment";
import AllFaculty from "./pages/AllFaculty";
import SingleFaculty from "./pages/SingleFaculty";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/departments" element={<AllDepartments />} />
        <Route path="/departments/:id" element={<SingleDepartment />} />
        <Route path="/faculty" element={<AllFaculty />} />
        <Route path="/faculty/:id" element={<SingleFaculty />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;