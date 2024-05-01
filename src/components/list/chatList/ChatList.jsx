import React, { useEffect, useState } from "react";
import "./chatList.css";
import searchImg from "../../../../public/search.png";
import plusIcon from "../../../../public/plus.png";
import minusIcon from "../../../../public/minus.png";
import avatar from "../../../../public/avatar.png";
import AddUser from "./addUser/AddUser";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useUserStore } from "../../../lib/userStore";
import { useChatStore } from "../../../lib/chatStore";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");
  const { currentUser } = useUserStore();
  const { changeChat, chatId } = useChatStore();

  console.log(chatId, "chat id");

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const item = res.data().chats;

        const promises = item.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });
        const chatrData = await Promise.all(promises);

        setChats(chatrData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );
  // console.log(chats, "chat");

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src={searchImg} alt="search" />
          <input
            type="text"
            placeholder="Search..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <img
          src={addMode ? minusIcon : plusIcon}
          alt="plus"
          className="add"
          onClick={() => setAddMode(!addMode)}
        />
      </div>
      {filteredChats.map((chat, index) => (
        <div
          className="item"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{ backgroundColor: chat?.isSeen ? "tranparent" : "#5183fe" }}
        >
          <img
            src={
              chat.user.blocked.includes(currentUser.id)
                ? avatar
                : chat.user.avatar || avatar
            }
            alt=""
          />
          <div className="texts">
            <span>
              {chat.user.blocked.includes(currentUser.id)
                ? "User"
                : chat.user.username}
            </span>
            <p>{chat.user.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser setAddMode={setAddMode} />}
    </div>
  );
};

export default ChatList;
