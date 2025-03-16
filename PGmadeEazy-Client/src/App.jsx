import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import AppRoutes from "./Routes/AppRoutes";
import Footer from "./components/Footer";
import AuthProvider from "./context/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <AppRoutes />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
