// AppRouter

// Development Components
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";
// Pages
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PageCodeEditor from "../pages/CodeEditor";
import PageNotFound from "../pages/PageNotFound";
import AssignmentPage from "../pages/AssignmentPage";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Services from "../components/Services";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage/>
            }
          />
            <Route
              path="assignment"
              element={
                // <ProtectedRoute role="instructor">
                  <AssignmentPage />
                // </ProtectedRoute>
              }
            />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="/editor"
            element={
//              <ProtectedRoute>
                <PageCodeEditor />
  //            </ProtectedRoute>
            }
          />
          
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
