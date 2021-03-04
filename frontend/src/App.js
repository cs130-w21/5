import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import CoverPage from "./pages/CoverPage";
import "./index.css";
import { NotificationTypes } from "./config.js";
import { useState, useEffect } from "react";
import { getNotifications, getContacts, getUid } from "./api";

function App() {
  const [uid, setUid] = useState("");
  const [notificationOn, setNotificationOn] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      msg: "This is a message from xxx",
      createdDate: new Date(),
      read: false,
      type: NotificationTypes.MSG,
      from: "xxx",
      to: "xxx",
    },
    {
      msg: "Invitation from xxx",
      createdDate: new Date(),
      read: false,
      type: NotificationTypes.INVITE,
      from: "xxx",
      to: "xxx",
    },
  ]);
  const [userStore, setUserStore] = useState({});
  const [contacts, setContacts] = useState([]);
  const [matchedTutors, setMatchedTutors] = useState([]);

  useEffect(() => {
    getAuthState();
  }, []);

  useEffect(() => {
    retrieveNotifications(uid);
    retrieveContacts(uid);
  }, [uid]);

  const retrieveNotifications = async (uid) => {
    const res = await getNotifications(uid);
    if (res.error) {
      window.alert(res.errMsg);
    } else {
      const data = res.data;
      setNotifications(data.notifications);
    }
  };

  const retrieveContacts = async (uid) => {
    const res = await getContacts(uid);
    if (res.error) {
      window.alert(res.errMsg);
    } else {
      const data = res.data;
      setContacts(data.contacts);
    }
  };

  const getAuthState = async () => {
    const res = await getUid();
    if (res.error) {
      window.alert(res.errMsg);
    } else {
      const data = res.data;
      setUid(data.uid);
    }
  };

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
            render={({ match }) => (
              <AuthPage uid={uid} setUid={setUid} match={match} />
            )}
          />
          <Route
            exact
            path="/profile/:id"
            render={({ match }) => (
              <ProfilePage
                uid={uid}
                userStore={userStore}
                contacts={contacts}
                notifications={notifications}
                setNotificationOn={setNotificationOn}
                notificationOn={notificationOn}
                match={match}
              />
            )}
          />
          <Route
            exact
            path="/search"
            render={({ match }) => (
              <SearchPage
                uid={uid}
                match={match}
                userStore={userStore}
                matchedTutors={matchedTutors}
                notifications={notifications}
                setNotificationOn={setNotificationOn}
                notificationOn={notificationOn}
              />
            )}
          />
          <Route
            exact
            path="/edit_profile/:id"
            render={({ match }) => <EditProfilePage uid={uid} match={match} />}
          />
          <Route
            exact
            path="/reset/:secret"
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
