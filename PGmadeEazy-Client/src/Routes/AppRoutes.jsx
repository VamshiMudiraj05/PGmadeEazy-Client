import { Routes, Route, Navigate } from "react-router-dom";
import FindPG from "../Pages/FindPG";          
import ListProperty from "../Pages/ListProperty"; 
import HowItWorks from "../Pages/HowItWorks";     
import Contact from "../Pages/Contact";           
import SignIn from "../Pages/SignIn";             
import GetStarted from "../Pages/GetStarted";     
import HomePage from "../Pages/HomePage";
import SeekerDashboard from '../Dashboards/SeekerDashboard';
import ProviderDashboard from '../Dashboards/ProviderDashboard';
import ProtectedRoute from "./ProtectedRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/find-pg" element={<FindPG />} />
      <Route path="/list-property" element={<ListProperty />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/get-started" element={<GetStarted />} />

      {/* Protected Routes */}
      {/* Seeker Route */}
      <Route 
        path="/seeker/*" 
        element={
          <ProtectedRoute allowedRoles={["seeker"]}>
            <SeekerDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Provider Route */}
      <Route 
        path="/provider/*" 
        element={
          <ProtectedRoute allowedRoles={["provider"]}>
            <ProviderDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Redirect unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
