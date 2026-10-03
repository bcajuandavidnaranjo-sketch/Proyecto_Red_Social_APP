import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSocial } from "./SocialContext";

export default function ProtectedRoute() {
  const { autenticado } = useSocial();
  const location = useLocation();

  if (!autenticado) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
