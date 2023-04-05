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
import RegisterStudent from "./pages/admin/RegisterStudent";

// import

function App() {
  return (
    //checking 123 by sandip. once the pr is merged lemme know on whatsapp
    <BrowserRouter>
      <Menu />
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="" element={<Home />} />
          <Route path="user/dashboard" element={<UserDashboard />} />
        </Route>
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="create-drive" element={<CreateDrive />} />
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
