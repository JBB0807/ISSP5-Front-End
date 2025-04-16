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
import PageNotFound from "../pages/PageNotFound";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
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
