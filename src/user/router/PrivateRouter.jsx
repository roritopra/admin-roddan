import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function PrivateRouter({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}
