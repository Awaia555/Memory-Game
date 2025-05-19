import { useReducer, useEffect } from 'react';
import { CardType, GameState, GameAction } from '../types/game';
import { shuffleArray } from '../utils/gameUtils';

const SYMBOLS = [
  '🐶', '🐱', '🦊', '🐼', '🐨', '🦁', '🐯', '🐭', '🐹', '🐰', 
  '🦄', '🐻', '🐮', '🐷', '🐸', '🐙', '🦋', '🦔', '🦒', '🦓'
];

const initialState: GameState = {
  cards: [],
  flippedCards: [],
  moves: 0,
  matches: 0,
  gameStarted: false,
  gameCompleted: false,
  difficulty: 'medium',
  startTime: null,
  endTime: null,
};

const createCards = (difficulty: 'easy' | 'medium' | 'hard'): CardType[] => {
  const pairCounts = {
    easy: 6, // 12 cards
    medium: 8, // 16 cards
    hard: 12, // 24 cards
  };

  const count = pairCounts[difficulty];
  const symbolsToUse = shuffleArray(SYMBOLS).slice(0, count);
  
  const cards: CardType[] = symbolsToUse.flatMap((symbol, index) => [
    { id: index * 2, matched: false, flipped: false, value: symbol },
    { id: index * 2 + 1, matched: false, flipped: false, value: symbol },
  ]);
  
  return shuffleArray(cards);
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        difficulty: action.difficulty,
        cards: createCards(action.difficulty),
        gameStarted: true,
        startTime: Date.now(),
      };
    
    case 'FLIP_CARD':
      if (state.flippedCards.length >= 2) return state;
      
      const card = state.cards.find(c => c.id === action.id);
      if (!card || card.matched || card.flipped) return state;
      
      const updatedCards = state.cards.map(c => 
        c.id === action.id ? { ...c, flipped: true } : c
      );
      
      const flippedCards = [...state.flippedCards, card];
      
      return {
        ...state,
        cards: updatedCards,
        flippedCards,
        moves: flippedCards.length === 2 ? state.moves + 1 : state.moves,
      };
    
    case 'CHECK_MATCH':
      if (state.flippedCards.length !== 2) return state;
      
      const [firstCard, secondCard] = state.flippedCards;
      const isMatch = firstCard.value === secondCard.value;
      
      const newCards = state.cards.map(card => {
        if (card.id === firstCard.id || card.id === secondCard.id) {
          return { ...card, matched: isMatch, flipped: isMatch };
        }
        return card;
      });
      
      const newMatches = isMatch ? state.matches + 1 : state.matches;
      const allMatched = newMatches === newCards.length / 2;
      
      return {
        ...state,
        cards: newCards,
        flippedCards: [],
        matches: newMatches,
        gameCompleted: allMatched,
        endTime: allMatched ? Date.now() : state.endTime,
      };
    
    case 'RESET_FLIPPED':
      return {
        ...state,
        cards: state.cards.map(card => 
          state.flippedCards.some(f => f.id === card.id) && !card.matched
            ? { ...card, flipped: false }
            : card
        ),
        flippedCards: [],
      };
    
    case 'RESET_GAME':
      return {
        ...initialState,
        difficulty: state.difficulty,
      };
    
    case 'END_GAME':
      return {
        ...state,
        gameCompleted: true,
        endTime: Date.now(),
      };
    
    default:
      return state;
  }
};

export const useGameState = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    if (state.flippedCards.length === 2) {
      // Check for match after cards are flipped
      const timer = setTimeout(() => {
        dispatch({ type: 'CHECK_MATCH' });
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [state.flippedCards]);

  useEffect(() => {
    if (state.gameCompleted && state.endTime === null) {
      dispatch({ type: 'END_GAME' });
    }
  }, [state.gameCompleted, state.endTime]);

  useEffect(() => {
    const nonMatchedCards = state.flippedCards.filter(
      card => !state.cards.find(c => c.id === card.id)?.matched
    );
    
    if (nonMatchedCards.length === 2) {
      const timer = setTimeout(() => {
        dispatch({ type: 'RESET_FLIPPED' });
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [state.flippedCards, state.cards]);

  return { state, dispatch };
};