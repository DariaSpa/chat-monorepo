import React from 'react';
import styles from './Modal.module.scss';
import Button from '../Button/Button';
import Header from '../Header/Header';

type ModalProps = {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ title, content, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Header headerText={title} />
        <div className={styles.modalContent}>{content}</div>
        <div className={styles.btnWrapper}>
          <Button onClick={onClose} variant='default'>x</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
