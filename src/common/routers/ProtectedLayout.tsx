import { Outlet } from "react-router-dom";
import Navbar from "../presentation/components/Navbar";
import { ProtectedRoute } from "./ProtectedRoute";

const ProtectedLayout = () => {
  return (
    <ProtectedRoute>
      <Navbar />
      <div className="drawer-content relative m-6 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
        <Outlet /> {/* Aquí se renderizarán las rutas hijas */}
      </div>
    </ProtectedRoute>
  );
};

export default ProtectedLayout;
