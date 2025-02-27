import React from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'default';
  fullWidth?: boolean;
  bgColor?: string; 
  disabled?: boolean;
  onClick?: () => void;
  tooltip?: string;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  fullWidth = false,
  bgColor,
  disabled = false,
  tooltip,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${
        disabled ? styles.disabled : ''
      }`}
      onClick={onClick}
      style={bgColor ? { backgroundColor: bgColor } : {}}
      disabled={disabled}
      title={tooltip}
    >
      {children}
    </button>
  );
};

export default Button;
