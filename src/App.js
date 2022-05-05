import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login/Login";
import Registration from "./components/pages/Registration/Registration";
import ProtectedRoute from "./components/validator/ProtectedRoute";
import PublicRoute from "./components/validator/PublicRoute";
import Chat from "./components/pages/Chat/Chat";
import Navbar from "./components/layout/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { authCheck } from "./store/action/auth-action";
import { sendChatData } from "./store/action/chat-action";
import { app } from "./firebase-config";
import { chatActions } from "./store/slice/chat-slice";

import { getDatabase, ref, onValue } from "firebase/database";
import store from "./store/store";

// update store with new data
let isInitial = true;

const db = getDatabase();
const starCountRef = ref(db, "/");

// get snapshot of data in database if it changes
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  store.dispatch(
    chatActions.replaceChat({
      users: data.users,
      conversations: data.conversations,
    })
  );
});

function App() {
  const dispatch = useDispatch();

  // useeffect check if user is logged in
  useEffect(() => {
    dispatch(authCheck());
    // dispatch(fetchChatData());
  }, [dispatch]);

  const isAuth = useSelector((state) => state.auth);
  const chatData = useSelector((state) => state.chat);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (chatData.changed) {
      dispatch(sendChatData(chatData));
    }
  }, [chatData, dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Navbar
                isAuthenticated={isAuth.isAuthenticated}
                userEmail={isAuth.user}
              />
            }
          >
            <Route
              element={
                <PublicRoute
                  isAuthenticated={isAuth.isAuthenticated}
                  redirectPath={"/chat"}
                />
              }
            >
              <Route path="/" element={<Login />} />
              <Route path="register" element={<Registration />} />
            </Route>
            <Route
              element={
                <ProtectedRoute
                  isAuthenticated={isAuth.isAuthenticated}
                  redirectPath={"/"}
                />
              }
            >
              <Route path="/chat" element={<Chat />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
