import React, { useEffect } from 'react';
import { formatTime } from '../utils/gameUtils';
import { Trophy } from 'lucide-react';

interface GameStatusProps {
  gameCompleted: boolean;
  moves: number;
  totalPairs: number;
  elapsedTime: number;
  onPlayAgain: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({
  gameCompleted,
  moves,
  totalPairs,
  elapsedTime,
  onPlayAgain,
}) => {
  useEffect(() => {
    if (gameCompleted) {
      const currentScore = Math.round((totalPairs * 1000) / (moves + elapsedTime / 1000));
      const highScores = JSON.parse(localStorage.getItem('memoryMatchHighScores') || '[]');
      highScores.push({ score: currentScore, moves, time: elapsedTime, date: new Date().toISOString() });
      highScores.sort((a: any, b: any) => b.score - a.score);
      localStorage.setItem('memoryMatchHighScores', JSON.stringify(highScores.slice(0, 5)));
    }
  }, [gameCompleted, moves, totalPairs, elapsedTime]);

  const highScores = JSON.parse(localStorage.getItem('memoryMatchHighScores') || '[]');
  
  if (!gameCompleted) return null;

  const currentScore = Math.round((totalPairs * 1000) / (moves + elapsedTime / 1000));
  const isNewHighScore = highScores.length === 0 || currentScore > highScores[0].score;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full mx-4 transform transition-all">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          🎉 Congratulations! 🎉
        </h2>
        
        <div className="space-y-3 mb-6">
          <p className="text-lg text-center">You've matched all the cards!</p>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-700">Pairs matched:</span>
                <span className="font-semibold">{totalPairs} pairs</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">Moves used:</span>
                <span className="font-semibold">{moves} moves</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">Time taken:</span>
                <span className="font-semibold">{formatTime(elapsedTime)}</span>
              </li>
              <li className="flex justify-between text-lg font-bold text-indigo-600 pt-2 border-t">
                <span>Score:</span>
                <span>{currentScore}</span>
              </li>
            </ul>
          </div>

          {isNewHighScore && (
            <div className="flex items-center justify-center space-x-2 text-yellow-500">
              <Trophy className="w-6 h-6" />
              <span className="text-lg font-bold">New High Score!</span>
            </div>
          )}
          
          {highScores.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">High Scores</h3>
              <div className="bg-gray-50 rounded-lg p-3">
                {highScores.slice(0, 5).map((score: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm py-1">
                    <span className="text-gray-600">#{index + 1}</span>
                    <span className="font-medium">{score.score}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={onPlayAgain}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-md"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameStatus;