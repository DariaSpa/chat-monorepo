import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import styles from "./CreateRoomPage.module.scss";
import BackIcon from "../../../assets/icons/BackIcon";

export const CreateRoomPage = () => {
  const [option, setOption] = useState<'join' | 'create' | null>(null)
  const [roomId, setRoomId] = useState('');
  const [roomName, setRoomName] = useState('');
  const [userName, setUserName] = useState('');

  const isJoinDisabled = !userName.trim() || !roomId.trim();
  const isCreateDisabled = !userName.trim() || !roomName.trim();

  const navigate = useNavigate();

  const handleJoinRoom = () => {
    navigate(`/chat/${roomId}?user=${userName}`);
  };

  return (
    <div className={styles.container}>

        {option && (
        <button className={styles.backButton} onClick={() => setOption(null)}>
          <BackIcon color="#555" />
        </button>
      )}

      {!option && (
        <>
          <Header headerText={'Do you want to create or join a room?'} />
          <div className={styles.buttonGroup}>
            <Button onClick={() => setOption("join")} variant="primary" bgColor="rgb(199 225 250)">
              Join a Room
            </Button>
            <Button onClick={() => setOption("create")} variant="primary" bgColor="rgb(200 236 215)">
              Create a Room
            </Button>
          </div>
        </>
      )}

      {option === "join" && (
        <div className={styles.inputSection}>
          <Input value={roomId} placeholder="Enter Room ID" onChange={setRoomId} />
          <Input value={userName} placeholder="Enter Your Name" onChange={setUserName} />
          <Button onClick={handleJoinRoom} variant="primary" fullWidth disabled={isJoinDisabled}>
            Join Room
          </Button>
        </div>
      )}

      {option === "create" && (
        <div className={styles.inputSection}>
          <Input value={roomName} placeholder="Enter Room Name" onChange={setRoomName} />
          <Input value={userName} placeholder="Enter Your Name" onChange={setUserName} />
          <Button onClick={handleJoinRoom} variant="primary" fullWidth disabled={isCreateDisabled}>
            Create & Join Room
          </Button>
        </div>
      )}

    </div>
  )
};