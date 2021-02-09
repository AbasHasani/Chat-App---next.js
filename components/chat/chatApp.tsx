import { useRouter } from "next/router";
import { FC, useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Message from "../message/Message";
//@ts-ignore
import styles from "./chat.module.scss";
import type { MessageType } from "../message/Message";
import { useStateValue } from "../../context/Context";
import Head from "next/head";
export interface UserType {
  id: number | string;
  username: string;
  room: string;
  image: string;
}
interface Props {
  params: {
    name: string;
    room: string;
  };
}

let socket;
const ChatApp: FC<Props> = ({ params }) => {
  //@ts-ignore
  const [{ imageURL }, dispatch] = useStateValue();
  const [myRoom, setMyRoom] = useState<any>("");
  const [chatMessages, setChatMessags] = useState<MessageType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [messageInputValue, setMessageInputValue] = useState<string>("");
  const imageRef = useRef<HTMLImageElement>();
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const ENDPOINT = "https://next-chat-application.herokuapp.com/";
  useEffect(() => {
    if (!imageURL) {
      dispatch({
        type: "ADD_AVATART",
        payload: JSON.parse(localStorage.getItem("imageURL")),
      });
    }
    const { name, room } = params;
    //@ts-ignore
    socket = io(ENDPOINT);
    socket.emit("new user", { name, room, imageURL });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, params]);
  useEffect(() => {
    socket.on("get users", ({ room, users }) => {
      console.log(users);
      
      let roomUsers = [];
      setMyRoom(room.replace("_", " "));
      users.map((user) => {
        roomUsers.push(user);
      });
      setUsers(roomUsers);
    });
  }, [users]);
  useEffect(() => {
    socket.on("message", (data) => {
      setChatMessags([...chatMessages, data]);
    });
    socket.on("messageSend", (data) => {
      setChatMessags([...chatMessages, data]);
    });
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [chatMessages]);
  const handleMessageSend = (e) => {
    e.preventDefault();
    socket.emit("messageSend", messageInputValue);
    setMessageInputValue("");
  };
  const router = useRouter();
  const handleLeave = () => {
    socket.disconnect();
    router.replace("/");
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Chat App</title>
        </Head>
        <div className={`${styles.users} ${isOpen ? styles.users__open : ""}`}>
          <div className={styles.users__info}>
            {imageURL ? (
              <img ref={imageRef} src={imageURL} alt="" />
            ) : (
              <div className={styles.users__info__imagePlaceHolder}></div>
            )}
            <h1>{myRoom}</h1>
          </div>
          <div className={styles.users__list}>
            <h2>Users</h2>
            {users.map((user, i) => (
              <p key={i}>{user.username.replace("_", " ")}</p>
            ))}
          </div>
        </div>
        <div className={styles.messageContainer}>
          <div
            className={styles.messageContainer__message}
            ref={chatMessagesRef}
          >
            {chatMessages.map((message) => (
              <div
                key={message.message}
                className={
                  message.username === params.name
                    ? styles.messageContainer__message__me
                    : styles.messageContainer__message__others
                }
              >
                <Message message={message} />
              </div>
            ))}
          </div>
          <form onSubmit={handleMessageSend}>
            <input
              value={messageInputValue}
              onChange={(e) => setMessageInputValue(e.target.value)}
              className={styles.messageContainer__input}
              placeholder="Type your message..."
              type="text"
            />
          </form>
        </div>
      </div>
      <button className={styles.leave} onClick={handleLeave}>
        {" "}
        Leave
      </button>
      <button onClick={handleMenu} className={styles.menu}>
        Menu
      </button>
      <div className={`${styles.circle} ${styles.circle1}`}></div>
      <div className={`${styles.circle} ${styles.circle2}`}></div>
      
    </>
  );
};

export default ChatApp;
