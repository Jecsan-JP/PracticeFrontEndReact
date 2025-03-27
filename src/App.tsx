import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
import LoginPage from "./features/login/presentation/pages/LoginPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
