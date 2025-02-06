"use client";

type TimeButtonProps = {
  time: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className: string;
};

const TimeButton = ({ time, onClick, className = "" }: TimeButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      <p>{time}:00</p>
    </button>
  );
};

export default TimeButton;
