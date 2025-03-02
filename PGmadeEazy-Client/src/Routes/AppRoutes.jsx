import { Routes, Route } from "react-router-dom";
import FindPG from "../Pages/FindPG";          
import ListProperty from "../Pages/ListProperty"; 
import HowItWorks from "../Pages/HowItWorks";     
import Contact from "../Pages/Contact";           
import SignIn from "../Pages/SignIn";             
import GetStarted from "../Pages/GetStarted";     
import HomePage from "../Pages/HomePage";
import Profile from "../Pages/Profile";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/find-pg" element={<FindPG />} />
        <Route path="/list-property" element={<ListProperty />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}
