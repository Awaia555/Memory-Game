import React from 'react';
import Card from './Card';
import { CardType } from '../types/game';

interface GameBoardProps {
  cards: CardType[];
  onCardClick: (id: number) => void;
  difficulty: 'easy' | 'medium' | 'hard';
}

const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardClick, difficulty }) => {
  // Define grid classes based on difficulty
  const gridClasses = {
    easy: "grid-cols-3 md:grid-cols-4",
    medium: "grid-cols-4",
    hard: "grid-cols-4 md:grid-cols-6",
  };

  return (
    <div className={`grid ${gridClasses[difficulty]} gap-3 md:gap-4 p-4 w-full max-w-4xl mx-auto`}>
      {cards.map(card => (
        <Card
          key={card.id}
          id={card.id}
          value={card.value}
          flipped={card.flipped}
          matched={card.matched}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default GameBoard;