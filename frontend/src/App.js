import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import CoverPage from "./pages/CoverPage";
import "./index.css";
import { useState, useEffect } from "react";

function App() {
  const [uid, setUid] = useState("");
  useEffect(() => {
    // TO DO: fetch uid from the server
    setUid("test");
  }, []);

  console.log(uid);

  return (
    <Router>
      <div id="app">
        <Switch>
          <Route
            exact
            path="/"
            render={({ match }) => <CoverPage uid={uid} match={match} />}
          />
          <Route
            exact
            path="/auth"
            render={({ match }) => <AuthPage uid={uid} match={match} />}
          />
          <Route
            exact
            path="/profile/:id"
            render={({ match }) => <ProfilePage uid={uid} match={match} />}
          />
          <Route
            exact
            path="/search"
            render={({ match }) => <SearchPage uid={uid} match={match} />}
          />
          <Route
            exact
            path="/edit_profile/:id"
            render={({ match }) => <EditProfilePage uid={uid} match={match} />}
          />
          <Route
            exact
            path="/reset/:id"
            render={({ match }) => (
              <ResetPasswordPage uid={uid} match={match} />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
