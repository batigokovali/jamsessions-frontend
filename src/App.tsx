import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginRegister } from "./Components/LoginRegister";
import { Layout } from "./Components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginRegister />} path="/" />
        <Route element={<LoginRegister isLogin={false} />} path="/register" />
        <Route element={<Layout />} path="/home" />
        <Route
          path="*"
          element={
            <h1 className="text-center text-white mt-5 topnav-fix">
              Page Not Found :( Yet...
            </h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
