import React from "react";
interface Props {
  background?: string;
  color?: string;
  onClick: () => void;
  height?: string;
  width?: string;
  children?: React.ReactNode;
}

const Button: React.FC<Props> = ({
  background,
  color,
  onClick,
  height,
  width,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-${background} hover:bg-blue-500 text-blue-700 font-semibold
      hover:text-white py-2 px-4 border
       border-blue-500 hover:border-transparent rounded`}
    >
      {children}
    </button>
  );
};

export default Button;
