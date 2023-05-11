import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginRegister } from "./Components/Pages/LoginRegister";
import { NavbarMain } from "./Components/Reusables/Navbars/NavbarMain";
import { Home } from "./Components/Pages/Home";
import { SessionDetails } from "./Components/Pages/SessionDetails";
import { CreateASession } from "./Components/Pages/CreateASession";
import { MediaItem } from "./Components/Reusables/MediaItem";
import { UserProfile } from "./Components/Pages/Profile";
import { EditProfile } from "./Components/Pages/EditProfile";
import { CreateAPost } from "./Components/Pages/CreateAPost";
import { MySessions } from "./Components/Pages/MySessions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginRegister />} path="/" />
        <Route element={<LoginRegister isLogin={false} />} path="/register" />
        <Route
          element={
            <>
              <Home />
            </>
          }
          path="/home"
        />
        <Route
          element={
            <>
              <SessionDetails />
            </>
          }
          path="/session-details/:sessionID"
        />
        <Route
          element={
            <>
              <MySessions />
            </>
          }
          path="/my-sessions"
        />
        <Route
          element={
            <>
              <CreateASession />
            </>
          }
          path="/create-a-session"
        />
        <Route
          element={
            <>
              <UserProfile state={true} />
            </>
          }
          path="/profile"
        />
        <Route
          element={
            <>
              <UserProfile state={false} />
            </>
          }
          path="/profile/:userID"
        />
        <Route
          element={
            <>
              <NavbarMain /> <EditProfile />
            </>
          }
          path="/edit-profile"
        />
        <Route
          element={
            <>
              <NavbarMain />
              <CreateAPost />
            </>
          }
          path="/create-a-post"
        />
        <Route
          element={
            <h1 className="text-center text-dark mt-5 topnav-fix">
              Page Not Found :( Yet...
            </h1>
          }
          path="*"
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
