import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";

const Chat = () => {
  const [chat, setChat] = useState();
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setType] = useState("");

  const endRef = useRef(null);
  const { chatId } = useChatStore();
  const { currentUser, user } = useUserStore();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);
  console.log(chat);

  const handleEmoji = (e) => {
    setType((prev) => prev + e.emoji);
    setOpenEmoji(false);
  };
  console.log(text);
  const handleSend = async () => {
    if (text === "") return;
    try {
      await updateDoc(doc(db, "chats", chatId), {
        message: arrayUnion({
          sender: currentUser.id,
          text,
          createAt: new Date(),
        }),
      });

      const userIds = [currentUser.id, user.id];

      userIds.forEach(async (id) => {
        const userChatRef = doc(db, "userChats", id);
        const userChatsSnapshot = await getDoc(userChatRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData[chatIndex].lastMessage = text;
          userChatsData[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData[chatIndex].updateAt = Data.now();
          await updateDoc(userChatRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
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
        {chat?.message?.map((message) => (
          <div className="message own" key={message?.createAt}>
            {message.img && <img src={message.img} alt="" />}
            <div className="texts">
              <p>{message.text}</p>
              {/* <span>1 min ago</span> */}
            </div>
          </div>
        ))}
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
          value={text}
        />
        <div className="emoji">
          <img src={emoji} alt="" onClick={() => setOpenEmoji(!openEmoji)} />
          <div className="picker">
            <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendBtn" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
