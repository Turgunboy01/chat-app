import React, { useEffect, useState } from "react";
import "./chatList.css";
import searchImg from "../../../../public/search.png";
import plusIcon from "../../../../public/plus.png";
import minusIcon from "../../../../public/minus.png";
import avatar from "../../../../public/avatar.png";
import AddUser from "./addUser/AddUser";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useUserStore } from "../../../lib/userStore";
import { useChatStore } from "../../../lib/chatStore";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);

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
        // setChats(Object.values(doc.data()));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    changeChat(chat.chatId, chat.user);
  };

  console.log(chats, "chas");

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
      {chats.map((chat, index) => (
        <div
          className="item"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
        >
          <img src={chat.user.avatar || avatar} alt="" />
          <div className="texts">
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser setAddMode={setAddMode} />}
    </div>
  );
};

export default ChatList;
