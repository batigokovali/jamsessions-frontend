import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginRegister } from "./Components/LoginRegister";
import { NavbarMain } from "./Components/NavbarMain";
import { SessionCard } from "./Components/Session";
import { NavbarSecond } from "./Components/NavbarSecond";
import { SessionDetails } from "./Components/SessionDetails";
import { NavbarSaved } from "./Components/NavbarSaved";
import { NavbarMySessions } from "./Components/NavbarMySessions";
import { SessionCreate } from "./Components/SessionCreate";
import { MediaItem } from "./Components/MediaItem";
import { ProfileInfo } from "./Components/ProfileInfo";
import { EditProfile } from "./Components/EditProfile";
import { CreateAPost } from "./Components/CreateAPost";
import { SavedSessions } from "./Components/SavedSessions";
import { SessionsUser } from "./Components/SessionsUser";
import { UserProfile } from "./Components/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginRegister />} path="/" />
        <Route element={<LoginRegister isLogin={false} />} path="/register" />
        <Route
          element={
            <>
              <NavbarMain />
              <NavbarSecond />
              <SessionCard />
            </>
          }
          path="/home"
        />
        <Route
          element={
            <>
              <NavbarMain />
              <NavbarSecond />
              <SessionDetails />
            </>
          }
          path="/session-details/:sessionID"
        />
        <Route
          element={
            <>
              <NavbarMain />
              <NavbarSaved />
              <SavedSessions />
              <NavbarMySessions />
              <SessionsUser />
            </>
          }
          path="/my-sessions"
        />
        <Route
          element={
            <>
              <NavbarMain /> <SessionCreate />
            </>
          }
          path="/create-a-session"
        />
        <Route
          element={
            <>
              <NavbarMain />
              <ProfileInfo />
              <MediaItem />
            </>
          }
          path="/profile"
        />
        <Route
          element={
            <>
              <NavbarMain />
              <UserProfile />
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
