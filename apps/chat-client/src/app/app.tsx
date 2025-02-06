import Chat from "./components/Chat/Chat";
import ChatUsersList from "./components/ChatUsersList/ChatUsersList";
import Header from "./components/Header/Header";
import Tabs from "./components/Tabs/Tabs";

//TODO: replace mock data with real ones
export const mockChatUsersListProps = {
  items: [
    { id: "1", userName: "Alice" },
    { id: "2", userName: "Bob" },
    { id: "3", userName: "Charlie" },
    { id: "4", userName: "Diana" },
  ],
};


export function App() {
  return (
    <>
      <Header headerText={"text"}
      />
      <Tabs
        tabs={[
          { label: "Participans", content: <ChatUsersList items={mockChatUsersListProps.items} /> },
          { label: "Chat", content: <Chat /> },
        ]}
      />
    </>
  );
}

export default App;
