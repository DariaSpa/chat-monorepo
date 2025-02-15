import styles from './ChatUsersList.module.scss';

type ChatUsersListProps = {
  items: Record<string, string>;
};

const ChatUsersList: React.FC<ChatUsersListProps> = ({ items }) => {
  return (
    <div className={styles.container}>
      <ul>
        {Object.entries(items).map(([id, userName]) => (
          <li key={id} className={styles.userItem}>{userName}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatUsersList;
