import { FC } from "react";
import styles from "./message.module.scss";
export interface MessageType {
  message: string;
  time: number | string;
  username: string;
  id: number | string;
}

interface Props {
  message: MessageType;
}

const Message: FC<Props> = ({ message: { message, time, username } }) => {
  return (
    <div className={styles.message}>
      <p className={styles.message__text}>{message}</p>
      <div className={styles.message__information}>
        <span className={styles.message__information__time}>{time}</span>
        <span className={styles.message__information__username}>
          {username}
        </span>
      </div>
    </div>
  );
};

export default Message;
