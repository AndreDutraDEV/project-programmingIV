import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ${className}`}>
      {children}
    </div>
  );
};

export default Card;