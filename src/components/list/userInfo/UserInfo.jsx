import React from "react";
import "./style.css";
import avatar from "../../../../public/avatar.png";
import more from "../../../../public/more.png";
import video from "../../../../public/video.png";
import edit from "../../../../public/edit.png";
const UserInfo = () => {
  return (
    <div className="userInfo">
      <div className="user">
        <img src={avatar} alt="" />
        <h2>Jon Doe</h2>
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
