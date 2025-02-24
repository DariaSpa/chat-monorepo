import { useState } from 'react';

import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import BackIcon from '../../../assets/icons/BackIcon';
import Modal from '../../components/Modal/Modal';
import CopyIcon from '../../../assets/icons/CopyIcon';

import { useChatApi } from '../../api/useChatApi';
import { useRoomNavigation } from '../../hooks/useRoomNavigation';
import styles from './CreateRoomPage.module.scss';

export const CreateRoomPage = () => {
  const [option, setOption] = useState<'join' | 'create' | null>(null);
  const [roomName, setRoomName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [joinLink, setJoinLink] = useState('');

  const chatApi = useChatApi();
  const { roomId, setRoomId, userName, setUserName, navigateToChat } = useRoomNavigation();

  const isJoinDisabled = !userName.trim() || !roomId.trim();
  const isCreateDisabled = !userName.trim() || !roomName.trim();

  const handleCreateRoom = async () => {
    try {
      if (!roomName.trim()) {
        alert('Room name is required');
        return;
      }
      
      const { roomId } = await chatApi.createRoom(roomName);

      setRoomId(roomId);
      setJoinLink(`${window.location.origin}/?join=${roomId}`);
      setIsModalOpen(true);
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    }
  };

  const handleJoinRoom = async () => {
    navigateToChat();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigateToChat();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(joinLink);
  }

  return (
    <div className={styles.container}>
      <div className={styles.backButton}>
        {option && (
          <Button variant={'default'} onClick={() => setOption(null)}>
            <BackIcon color='#555' />
          </Button>
        )}
      </div>

      {!option && (
        <>
          <Header headerText={'Do you want to create or join a room?'} />
          <div className={styles.buttonGroup}>
            <Button onClick={() => setOption('join')} variant='primary' bgColor='rgb(199 225 250)'>
              Join a Room
            </Button>
            <Button onClick={() => setOption('create')} variant='primary' bgColor='rgb(200 236 215)'>
              Create a Room
            </Button>
          </div>
        </>
      )}

      {option === 'join' && (
        <div className={styles.inputSection}>
          <Input value={roomId} placeholder='Enter Room ID' onChange={setRoomId} />
          <Input value={userName} placeholder='Enter Your Name' onChange={setUserName} />
          <Button onClick={handleJoinRoom} variant='primary' fullWidth disabled={isJoinDisabled}>
            Join Room
          </Button>
        </div>
      )}

      {option === 'create' && (
        <div className={styles.inputSection}>
          <Input value={roomName} placeholder='Enter Room Name' onChange={setRoomName} />
          <Input value={userName} placeholder='Enter Your Name' onChange={setUserName} />
          <Button onClick={handleCreateRoom} variant='primary' fullWidth disabled={isCreateDisabled}>
            Create & Join Room
          </Button>
        </div>
      )}


      {isModalOpen && roomName && (
        <Modal 
          title='Room Created!'
          content={
            <div className={styles.modalWrapper}>
              <p>Copy room ID: {roomId}</p>
              <p>Or share this link:</p>
              <div className={styles.linkWrapper}>
                <Input type='text' value={joinLink} placeholder={''} />
                <Button variant='default' tooltip='Copy' onClick={handleCopyLink}><CopyIcon /></Button>
              </div>
              <Button variant='primary' fullWidth bgColor='rgb(199 225 250)' onClick={handleJoinRoom}>Join the room</Button>
            </div>
          }
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
};