import React from "react";
import "./list.css";
import UserInfo from "./userInfo/UserInfo";
import ChatList from "./chatList/ChatList";
const List = ({ handleHideClick }) => {
  return (
    <div className="list">
      <UserInfo handleHideClick={handleHideClick} />
      <ChatList />
    </div>
  );
};

export default List;
