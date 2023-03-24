import "./App.css";
import { useState } from "react";
import { Homepage } from "./pages/home/Home.component";
import { LoginForm } from "./pages/login/Login.component";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (result) => {
    if (result.email !== undefined) {
      setIsLoggedIn(true);
      navigate("/home");
    }
    return;
  };

  return (
    <div className="App">
      <Routes>
        <Route index element={<LoginForm handleLogin={handleLogin} />} />
        <Route
          path="/home"
          element={isLoggedIn ? <Homepage /> : <Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
