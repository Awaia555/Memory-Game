export type CardType = {
  id: number;
  matched: boolean;
  flipped: boolean;
  value: string;
};

export type GameState = {
  cards: CardType[];
  flippedCards: CardType[];
  moves: number;
  matches: number;
  gameStarted: boolean;
  gameCompleted: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  startTime: number | null;
  endTime: number | null;
};

export type GameAction =
  | { type: 'START_GAME'; difficulty: 'easy' | 'medium' | 'hard' }
  | { type: 'FLIP_CARD'; id: number }
  | { type: 'CHECK_MATCH' }
  | { type: 'RESET_FLIPPED' }
  | { type: 'RESET_GAME' }
  | { type: 'END_GAME' };