import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import avatar from "../../../../public/avatar.png";
import phone from "../../../../public/phone.png";
import video from "../../../../public/video.png";
import info from "../../../../public/info.png";
import emoji from "../../../../public/emoji.png";
import camera from "../../../../public/camera.png";
import img from "../../../../public/img.png";
import mic from "../../../../public/mic.png";
import EmojiPicker from "emoji-picker-react";

const Chat = () => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [type, setType] = useState("");

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  const handleEmoji = (e) => {
    setType((prev) => prev + e.emoji);
    setOpenEmoji(false);
  };
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={avatar} alt="" />
          <div className="texts">
            <span>Jhon Doe</span>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="icons">
          <img src={phone} alt="phone" />
          <img src={video} alt="video" />
          <img src={info} alt="info" />
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src={avatar} alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error qui
              ipsa modi repellat aperiam impedit placeat nostrum eum tempore,
              amet veritatis, culpa, provident doloribus ut id. Repellendus
              officia in nobis!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error qui
              ipsa modi repellat aperiam impedit placeat nostrum eum tempore,
              amet veritatis, culpa, provident doloribus ut id. Repellendus
              officia in nobis!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src={avatar} alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error qui
              ipsa modi repellat aperiam impedit placeat nostrum eum tempore,
              amet veritatis, culpa, provident doloribus ut id. Repellendus
              officia in nobis!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error qui
              ipsa modi repellat aperiam impedit placeat nostrum eum tempore,
              amet veritatis, culpa, provident doloribus ut id. Repellendus
              officia in nobis!
            </p>
            <span>1 min ago</span>
          </div>
        </div>{" "}
        <div className="message">
          <img src={avatar} alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error qui
              ipsa modi repellat aperiam impedit placeat nostrum eum tempore,
              amet veritatis, culpa, provident doloribus ut id. Repellendus
              officia in nobis!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error qui
              ipsa modi repellat aperiam impedit placeat nostrum eum tempore,
              amet veritatis, culpa, provident doloribus ut id. Repellendus
              officia in nobis!
            </p>
            <span>1 min ago</span>
          </div>
        </div>{" "}
        <div className="message">
          <img src={avatar} alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error qui
              ipsa modi repellat aperiam impedit placeat nostrum eum tempore,
              amet veritatis, culpa, provident doloribus ut id. Repellendus
              officia in nobis!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img
              src="data:image/jpeg;base64,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"
              alt=""
            />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error qui
              ipsa modi repellat aperiam impedit placeat nostrum eum tempore,
              amet veritatis, culpa, provident doloribus ut id. Repellendus
              officia in nobis!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
      </div>
      <div ref={endRef}></div>
      <div className="bottom">
        <div className="icons">
          <img src={camera} alt="camera" />
          <img src={img} alt="img" />
          <img src={mic} alt="mic" />
        </div>
        <input
          type="text"
          placeholder="Type a message... "
          onChange={(e) => setType(e.target.value)}
          value={type}
        />
        <div className="emoji">
          <img src={emoji} alt="" onClick={() => setOpenEmoji(!openEmoji)} />
          <div className="picker">
            <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendBtn">Send</button>
      </div>
    </div>
  );
};

export default Chat;
