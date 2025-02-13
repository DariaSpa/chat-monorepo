import React from "react";

interface SendIconProps {
  color?: string;
  circleColor?: string;
}

const SendIcon: React.FC<SendIconProps> = ({
  color = "white",
  circleColor = "grey",
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="11" fill={circleColor} stroke="none" />
      <path
        d="M6 12L18 6L13 12L18 18L6 12Z"
        fill={color}
        stroke="none"
      />
    </svg>
  );
};

export default SendIcon;
