import React from 'react';
import { Brain } from 'lucide-react';

const GameTitle: React.FC = () => {
  return (
    <div className="flex justify-center items-center space-x-2 mb-6">
      <Brain className="w-8 h-8 text-indigo-600" />
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        Memory Match
      </h1>
    </div>
  );
};

export default GameTitle;