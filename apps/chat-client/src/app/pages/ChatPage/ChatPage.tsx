import Chat from "../../components/Chat/Chat";
import ChatUsersList from "../../components/ChatUsersList/ChatUsersList";
import Header from "../../components/Header/Header";
import {Tabs} from "../../components/Tabs/Tabs";
import styles from "./ChatPage.module.scss";

//TODO: replace mock data with real ones
export const mockChatUsersListProps = {
  items: [
    { id: "1", userName: "Alice" },
    { id: "2", userName: "Bob" },
    { id: "3", userName: "Charlie" },
    { id: "4", userName: "Diana" },
    { id: "11", userName: "Alice" },
    { id: "12", userName: "Bob" },
    { id: "13", userName: "Charlie" },
    { id: "14", userName: "Diana" },
    { id: "21", userName: "Alice" },
    { id: "22", userName: "Bob" },
    { id: "23", userName: "Charlie" },
    { id: "24", userName: "Diana" },
    { id: "31", userName: "Alice" },
    { id: "32", userName: "Bob" },
    { id: "33", userName: "Charlie" },
    { id: "34", userName: "Diana" },
  ],
};

export const ChatPage = () => {
 
  return (
    <div className={styles.chatContainer}>
      <div className={styles.headerWrapper}><Header headerText={'Header'} /></div>
      <Tabs
      participantsContent={<ChatUsersList items={mockChatUsersListProps.items} />}
      chatContent={<Chat />} 
    />
    </div>
  )
};
