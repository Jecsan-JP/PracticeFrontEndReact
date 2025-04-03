import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";

// ProtectedRoute.tsx
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, status } = useAppSelector((state) => state.auth);

  // console.log("ProtectedRoute - Estado actual:", { user, status });

  if (!user) {
    // console.log("Redirigiendo a /login");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
