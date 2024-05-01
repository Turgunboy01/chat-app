import React, { useState } from "react";
import "./chatList.css";
import searchImg from "../../../../public/search.png";
import plusIcon from "../../../../public/plus.png";
import minusIcon from "../../../../public/minus.png";
import avatar from "../../../../public/avatar.png";
import AddUser from "./addUser/AddUser";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src={searchImg} alt="search" />
          <input type="text" placeholder="Search..." />
        </div>
        <img
          src={addMode ? minusIcon : plusIcon}
          alt="plus"
          className="add"
          onClick={() => setAddMode(!addMode)}
        />
      </div>
      <div className="item">
        <img src={avatar} alt="" />
        <div className="texts">
          <span>Jhon Doe</span>
          <p>Hello</p>
        </div>
      </div>{" "}
      <div className="item">
        <img src={avatar} alt="" />
        <div className="texts">
          <span>Jhon Doe</span>
          <p>Hello</p>
        </div>
      </div>{" "}
      <div className="item">
        <img src={avatar} alt="" />
        <div className="texts">
          <span>Jhon Doe</span>
          <p>Hello</p>
        </div>
      </div>{" "}
      <div className="item">
        <img src={avatar} alt="" />
        <div className="texts">
          <span>Jhon Doe</span>
          <p>Hello</p>
        </div>
      </div>{" "}
      <div className="item">
        <img src={avatar} alt="" />
        <div className="texts">
          <span>Jhon Doe</span>
          <p>Hello</p>
        </div>
      </div>{" "}
      <div className="item">
        <img src={avatar} alt="" />
        <div className="texts">
          <span>Jhon Doe</span>
          <p>Hello</p>
        </div>
      </div>
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
