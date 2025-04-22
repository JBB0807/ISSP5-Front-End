import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // 예시 훅: 너의 프로젝트에 맞게 수정!

const ProtectedRoute = ({ children, role }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
