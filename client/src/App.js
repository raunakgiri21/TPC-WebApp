import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import PrivateRoute from "./components/routes/PrivateRoute";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import Menu from "./components/nav/menu";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ViewUser from "./pages/admin/ViewUser";
import AdminRoute from "./components/routes/AdminRoute";
import CreateDrive from "./pages/admin/CreateDrive";
import EditDrive from "./pages/admin/EditDrive";
import RegisterStudent from "./pages/admin/RegisterStudent";
import Drives from "./pages/user/Drives";
import ViewDrive from "./pages/user/ViewDrive";

// import

function App() {
  return (
    //checking 123 by sandip. once the pr is merged lemme know on whatsapp
    //oopsie one more check
    <BrowserRouter>
      <Menu />
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="" element={<Home />} />
          <Route path="drives" element={<Drives />} />
          <Route path="view-drive/:driveID" element={<ViewDrive />} />
          <Route path="user/dashboard" element={<UserDashboard />} />
        </Route>
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="create-drive" element={<CreateDrive />} />
          <Route path="edit-drive/:driveID" element={<EditDrive />} />
          <Route path="register-student" element={<RegisterStudent />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="view-user/:userID" element={<ViewUser />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
