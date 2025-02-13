import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  bgColor?: string; 
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = "primary",
  fullWidth = false,
  bgColor,
  disabled = false,
}) => {
  return (
    <button
    className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ""} ${
      disabled ? styles.disabled : ""
    }`}
    onClick={!disabled ? onClick : undefined}
    style={bgColor ? { backgroundColor: bgColor } : {}}
    disabled={disabled}
  >
      {children}
    </button>
  );
};

export default Button;
