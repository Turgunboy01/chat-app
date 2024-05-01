import React from "react";
import "./style.css";
import avatar from "../../../public/avatar.png";
import arrowUp from "../../../public/arrowUp.png";
import arrowDown from "../../../public/arrowDown.png";
import download from "../../../public/download.png";
import { auth } from "../../lib/firebase";

const Details = () => {
  return (
    <div className="details">
      <div className="user">
        <img src={avatar} alt="" />
        <h2>Jhon doe</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat settings</span>
            <img src={arrowUp} alt="upArrow" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy % help</span>
            <img src={arrowUp} alt="upArrow" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos </span>
            <img src={arrowDown} alt="upArrow" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src={download} alt="" className="icon" />
            </div>{" "}
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src={download} alt="" className="icon" />
            </div>{" "}
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src={download} alt="" className="icon" />
            </div>{" "}
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src={download} alt="" className="icon" />
            </div>{" "}
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Share files</span>
            <img src={arrowUp} alt="upArrow" />
          </div>
        </div>
        <button>Block User</button>
        <button className="logout" onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Details;
