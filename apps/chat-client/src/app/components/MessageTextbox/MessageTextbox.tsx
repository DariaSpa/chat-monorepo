import { useRef } from 'react';
import SendIcon from '../../../assets/icons/SendIcon';
import styles from './MessageTextbox.module.scss';

type MessageTextboxProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  showButton?: boolean;
  onButtonClick?: () => void;
  maxLength?: number;
};

const MessageTextbox: React.FC<MessageTextboxProps> = ({
  value,
  placeholder,
  onChange,
  showButton = false,
  onButtonClick,
  maxLength = 500,
}) => {

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let text = e.target.value;

    if (text.length > maxLength) {
      text = text.substring(0, maxLength);
      if (text === value) return; 
    }

    onChange(text);

    const textarea = e.target;
    textarea.style.height = "auto"; 
    textarea.style.height = `${Math.min(textarea.scrollHeight, 90)}px`; 
  };

  return (
    <div className={styles.messageContainer}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        placeholder={placeholder}
        className={styles.messageBox}
        maxLength={maxLength}
        rows={1}
        aria-label="Message input"
      />
      {showButton && onButtonClick && (
        <button onClick={onButtonClick} className={styles.btn}>
          <SendIcon color={'#FFFFFF'} circleColor={'#BCBCBC'} />
        </button>
      )}
    </div>
  );
};

export default MessageTextbox;
