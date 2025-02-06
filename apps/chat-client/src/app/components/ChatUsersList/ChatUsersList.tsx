import styles from './ChatUsersList.module.scss';

export type ChatUsersListItem = {
  id: string;
  userName: string;
};

type ChatUsersListProps = {
  items: ChatUsersListItem[];
};

const ChatUsersList: React.FC<ChatUsersListProps> = ({ items }) => {
  return (
    <div className={styles.container}>
      <ul>
        {items.map(({ id, userName }) => (
          <li key={id} className={styles.userItem}>{userName}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatUsersList;
