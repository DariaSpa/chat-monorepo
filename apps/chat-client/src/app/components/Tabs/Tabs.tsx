import { useState } from "react";
import styles from "./Tabs.module.scss";

type TabOption = "chat" | "participants";

interface TabsProps {
  chatContent: React.ReactNode;
  participantsContent: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ chatContent, participantsContent }) => {
  const [activeTab, setActiveTab] = useState<TabOption>("chat");

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.chatLayout}>
        <div className={styles.tabButtons}>
        <button
            className={activeTab === "participants" ? styles.activeTab : ""}
            onClick={() => setActiveTab("participants")}
          >
            Participants
          </button>
          <button
            className={activeTab === "chat" ? styles.activeTab : ""}
            onClick={() => setActiveTab("chat")}
          >
            Chat
          </button>
        </div>
        <div className={styles.tabContentWrapper}>
          <div className={`${styles.tabContent} ${styles.participants} ${activeTab === "participants" ? styles.active : ""}`}>
            {participantsContent}  
          </div>
          <div className={`${styles.tabContent} ${styles.chat} ${activeTab === "chat" ? styles.active : ""}`}>
            {chatContent}
          </div>
        </div>
      </div>
    </div>
  );
};
