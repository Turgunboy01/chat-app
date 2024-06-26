import React, { useEffect, useState } from "react";
import List from "./components/list/List";
import Chat from "./components/caht/Chat";
import Details from "./components/details/Details";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();
  const [hideDetail, sethideDetail] = useState(false);

  const handleHideClick = () => {
    sethideDetail(!hideDetail);
  };

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log(currentUser, "sa");
  if (isLoading) return <div className="loading">Loading...</div>;
  return (
    <div className="container">
      {currentUser ? (
        <>
          <List handleHideClick={handleHideClick} />
          {chatId && <Chat handleHideClick={handleHideClick} />}
          {chatId && hideDetail && <Details />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
