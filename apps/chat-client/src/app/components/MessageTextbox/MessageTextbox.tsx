import { useEffect, useRef } from 'react';
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

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 90)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let text = e.target.value;

    if (text.length > maxLength) {
      text = text.substring(0, maxLength);
      if (text === value) return;
    }

    onChange(text);
    adjustHeight();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onButtonClick?.();
    }
  };

  useEffect(() => {
    if(value === '' && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [value]);

  return (
    <div className={styles.messageContainer}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={styles.messageBox}
        maxLength={maxLength}
        rows={1}
        aria-label='Message input'
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
