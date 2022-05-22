import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Homepage from "./Pages/Homepage";
import PrivateRoute from "./Component/PrivateRoute";
import { useEffect, useState } from "react";
function App() {
  const data = JSON.parse(localStorage.getItem("authantication"));
  const [isValid, setisValid] = useState(false)
  const handlelogout = () => {
    
    localStorage.removeItem("authantication");
    setisValid(!isValid)
  };
  
  
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <div className="navbar-brand">Navbar</div>

          {data?.name ? (
            <>
              <div>{data.name}</div>
              <button
                className="btn btn-outline-success"
                onClick={handlelogout}
              >
                Logout
              </button>
            </>
          ) : (
            <button className="btn btn-outline-success">Login</button>
          )}
        </div>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
