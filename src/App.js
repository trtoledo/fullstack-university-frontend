import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import AllDepartments from "./pages/AllDepartments";
import SingleDepartment from "./pages/SingleDepartment";
import AllFaculty from "./pages/AllFaculty";
import SingleFaculty from "./pages/SingleFaculty";
import ManageDepartments from "./pages/admin/ManageDepartments";
import ManageProfessors from "./pages/admin/ManageProfessors";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import './index.css';


function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/departments" element={<AllDepartments />} />
        <Route path="/departments/:id" element={<SingleDepartment />} />
        <Route path="/professors" element={<AllFaculty />} />
        <Route path="/professors/:id" element={<SingleFaculty />} />

        <Route path="/admin/departments" element={<PrivateRoute><ManageDepartments /></PrivateRoute>} />
        <Route path="/admin/professors" element={<PrivateRoute><ManageProfessors /></PrivateRoute>} />

        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        <Route
          path="/admin/departments"
          element={
            <PrivateRoute>
              <ManageDepartments />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/professors"
          element={
            <PrivateRoute>
              <ManageProfessors />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;