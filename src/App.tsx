import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
import LoginPage from "./features/login/presentation/pages/LoginPage";
import HomePage from "./features/home/presentation/pages/HomePage";
import { ProtectedRoute } from "./common/routers/ProtectedRoute";
import { useAppDispatch } from "./common/redux/store";
import { useEffect } from "react";
import { checkAuth } from "./features/login/presentation/redux/AuthLoginSlice";
import Navbar from "./common/presentation/components/Navbar";
import UsersPage from "./features/users/presentation/pages/UsersPage";
import ProtectedLayout from "./common/routers/ProtectedLayout";

function App() {
  const dispatch = useAppDispatch();

  // Verificar autenticación al cargar la app
  useEffect(() => {
    console.log("App - checkAuth dispatched"); // ✅ Debug
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rutas protegidas (anidadas bajo ProtectedLayout) */}
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UsersPage />} />
            {/* Agrega más rutas aquí sin repetir Navbar ni ProtectedRoute */}
          </Route>

          {/* Ruta comodín (opcional) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
