import React from 'react';
import { Trophy, RotateCcw, Clock, Zap } from 'lucide-react';
import { formatTime } from '../utils/gameUtils';

interface GameControlsProps {
  moves: number;
  matches: number;
  totalPairs: number;
  difficulty: 'easy' | 'medium' | 'hard';
  gameStarted: boolean;
  gameCompleted: boolean;
  elapsedTime: number;
  onStartGame: (difficulty: 'easy' | 'medium' | 'hard') => void;
  onRestartGame: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  moves,
  matches,
  totalPairs,
  difficulty,
  gameStarted,
  gameCompleted,
  elapsedTime,
  onStartGame,
  onRestartGame,
}) => {
  return (
    <div className="w-full">
      {!gameStarted ? (
        <div className="flex flex-col items-center space-y-4 p-4">
          <h2 className="text-xl font-bold text-indigo-800">Select Difficulty</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onStartGame('easy')}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Easy (6 pairs)
            </button>
            <button
              onClick={() => onStartGame('medium')}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Medium (8 pairs)
            </button>
            <button
              onClick={() => onStartGame('hard')}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              Hard (12 pairs)
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center items-center p-4">
            <div className="flex items-center bg-white rounded-lg shadow-sm px-3 py-2">
              <Zap className="w-5 h-5 text-indigo-500" />
              <span className="ml-2 font-medium">
                {matches} / {totalPairs} Matches
              </span>
            </div>
            
            <div className="flex items-center bg-white rounded-lg shadow-sm px-3 py-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span className="ml-2 font-medium">{moves} Moves</span>
            </div>

            <div className="flex items-center bg-white rounded-lg shadow-sm px-3 py-2">
              <Clock className="w-5 h-5 text-teal-500" />
              <span className="ml-2 font-medium">{formatTime(elapsedTime)}</span>
            </div>

            <button
              onClick={onRestartGame}
              className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors"
            >
              <RotateCcw className="w-5 h-5 mr-1" />
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameControls;