import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./chat.css";
import avatar from "../../../../public/avatar.png";
import phone from "../../../../public/phone.png";
import video from "../../../../public/video.png";
import info from "../../../../public/info.png";
import emoji from "../../../../public/emoji.png";
import camera from "../../../../public/camera.png";
import iconImg from "../../../../public/img.png";
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
import upload from "../../lib/upload";

const Chat = () => {
  const [chat, setChat] = useState();
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setType] = useState("");

  const endRef = useRef(null);
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

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

  const handleEmoji = (e) => {
    setType((prev) => prev + e.emoji);
    setOpenEmoji(false);
  };
  console.log(chat, "text");
  const handleSend = async () => {
    if (text === "") return;
    setType("");

    let imgUrl = null;
    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        message: arrayUnion({
          sender: currentUser.id,
          text,
          createAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
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
          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updateAt = Data.now();
          await updateDoc(userChatRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
    setImg({
      file: null,
      url: "",
    });
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || avatar} alt="" />
          <div className="texts">
            <span>{user?.username}</span>
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
          <div
            className={
              message.sender === currentUser?.id ? "message own" : "message"
            }
            key={message?.createAt}
          >
            {message.img && <img src={message.img} alt="" />}
            <div className="texts">
              <p>{message.text}</p>
              {/* <span>1 min ago</span> */}
            </div>
          </div>
        ))}
      </div>
      {img.url && (
        <div className="message own">
          <div className="texts">
            <img src={img.url} className="sendImg" alt="sa" />
          </div>
        </div>
      )}
      <div ref={endRef}></div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src={iconImg} alt="img" />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImg}
          />
          <img src={mic} alt="mic" />
        </div>
        <input
          type="text"
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "You cannot a message"
              : "Type a message... "
          }
          onChange={(e) => setType(e.target.value)}
          value={text}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="emoji">
          <img src={emoji} alt="" onClick={() => setOpenEmoji(!openEmoji)} />
          <div className="picker">
            <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button
          className="sendBtn"
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
