import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Components/LoginRegister/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
