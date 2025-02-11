import { Routes, Route } from "react-router-dom";
import FindPG from "../Pages/FindPG";          
import ListProperty from "../Pages/ListProperty"; 
import HowItWorks from "../Pages/HowItWorks";     
import Contact from "../Pages/Contact";           
import SignIn from "../Pages/SignIn";             
import GetStarted from "../Pages/GetStarted";     
       

export default function AppRoutes() {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<FindPG />} />
        <Route path="/find-pg" element={<FindPG />} />
        <Route path="/list-property" element={<ListProperty />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/get-started" element={<GetStarted />} />
      </Routes>
    </>
  );
}
