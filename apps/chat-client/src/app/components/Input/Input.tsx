import SendIcon from '../../../assets/icons/SendIcon';
import styles from './Input.module.scss';

type InputProps = {
  value: string;
  placeholder: string;
  type?: 'text';
  onChange?: (value: string) => void;
  showButton?: boolean;
  onButtonClick?: () => void;
  readOnly?: boolean;
};

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  placeholder,
  onChange,
  showButton = false,
  onButtonClick,
  readOnly = false,
}) => {
  return (
    <div className={`${styles.inputWrapper} ${readOnly ? styles.readOnly : ''}`}>
      <input
        type={type}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
        readOnly={readOnly}
      />
      {showButton && onButtonClick && (
        <button onClick={onButtonClick} className={styles.btn}><SendIcon color={'#FFFFFF'} circleColor={'#BCBCBC'}/></button>
      )}
    </div>
  );
};

export default Input;
