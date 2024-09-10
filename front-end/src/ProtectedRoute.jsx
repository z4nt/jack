import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth.jsx";

export function ProtectedRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}
