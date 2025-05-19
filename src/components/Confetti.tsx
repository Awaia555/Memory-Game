import React, { useEffect, useState } from 'react';

const COLORS = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4'];

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  speedX: number;
  speedY: number;
}

interface ConfettiProps {
  show: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ show }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  
  useEffect(() => {
    if (!show) {
      setPieces([]);
      return;
    }
    
    // Create confetti pieces
    const newPieces: ConfettiPiece[] = [];
    for (let i = 0; i < 100; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 10, // Start above the viewport
        size: 5 + Math.random() * 15,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 360,
        speedX: -1 + Math.random() * 2,
        speedY: 3 + Math.random() * 5,
      });
    }
    setPieces(newPieces);
    
    const interval = setInterval(() => {
      setPieces(prevPieces => {
        if (prevPieces.length === 0) {
          clearInterval(interval);
          return prevPieces;
        }
        
        return prevPieces.map(piece => {
          if (piece.y > 110) {
            // Reset piece if it's below the viewport
            return {
              ...piece,
              y: -10,
              x: Math.random() * 100,
            };
          }
          
          return {
            ...piece,
            x: piece.x + piece.speedX,
            y: piece.y + piece.speedY,
            rotation: piece.rotation + 2,
          };
        });
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [show]);

  if (!show || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {pieces.map(piece => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size * 0.6}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            opacity: 0.8,
            transition: 'transform 0.1s linear',
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;