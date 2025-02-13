import SendIcon from '../../../assets/icons/SendIcon';
import styles from './Input.module.scss';

type InputProps = {
  type?: 'text';
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  showButton?: boolean;
  onButtonClick?: () => void;
};

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  placeholder,
  onChange,
  showButton = false,
  onButtonClick,
}) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        type={type}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} 
        placeholder={placeholder}
        className={styles.input}
      />
      {showButton && onButtonClick && (
        <button onClick={onButtonClick} className={styles.btn}><SendIcon color={'#FFFFFF'} circleColor={'#BCBCBC'}/></button>
      )}
    </div>
  );
};

export default Input;
