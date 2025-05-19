import React, { useState, useEffect } from 'react';

interface CardProps {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
  onClick: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ id, value, flipped, matched, onClick }) => {
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (matched) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [matched]);

  const handleClick = () => {
    if (!flipped && !matched) {
      onClick(id);
    }
  };

  return (
    <div 
      className="relative h-24 w-24 md:h-28 md:w-28 cursor-pointer perspective-1000"
      onClick={handleClick}
    >
      {showCelebration && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="stars-1"></div>
          <div className="stars-2"></div>
          <div className="stars-3"></div>
        </div>
      )}
      <div
        className={`
          absolute inset-0 rounded-lg transition-transform duration-500 transform-style-3d
          ${flipped ? 'rotate-y-180' : ''}
          ${matched ? 'opacity-100 ring-2 ring-yellow-400 ring-opacity-50' : ''}
        `}
      >
        {/* Front of card (question mark) */}
        <div 
          className={`
            absolute inset-0 backface-hidden rounded-lg shadow-md
            bg-gradient-to-br from-indigo-500 to-purple-700
            flex items-center justify-center text-white
          `}
        >
          <span className="text-2xl">?</span>
        </div>
        
        {/* Back of card (symbol) */}
        <div 
          className={`
            absolute inset-0 backface-hidden rotate-y-180 rounded-lg shadow-md
            bg-gradient-to-br from-teal-400 to-emerald-500
            flex items-center justify-center
            ${matched ? 'bg-gradient-to-br from-green-400 to-green-600' : ''}
          `}
        >
          <span className="text-4xl select-none">{value}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;