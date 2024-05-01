import React from "react";
import "./style.css";
import avatar from "../../../../public/avatar.png";
import more from "../../../../public/more.png";
import video from "../../../../public/video.png";
import edit from "../../../../public/edit.png";
import { useUserStore } from "../../../lib/userStore";
const UserInfo = () => {
  const { currentUser } = useUserStore();
  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser.avatar || avatar} alt="" />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="icons">
        <img src={more} alt="more" />
        <img src={video} alt="video" />
        <img src={edit} alt="edit" />
      </div>
    </div>
  );
};

export default UserInfo;
