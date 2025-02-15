import React from 'react';

type CopyIconProps = {
  size?: number;
  color?: string;
};

const CopyIcon: React.FC<CopyIconProps> = ({ size = 24, color = '#000' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect x='9' y='9' width='12' height='12' stroke={color} strokeWidth='2' rx='2'/>
      <rect x='4' y='4' width='12' height='12' stroke={color} strokeWidth='2' rx='2'/>
    </svg>
  );
};

export default CopyIcon;
