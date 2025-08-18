import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface GameState {
  credits: number;
  selectedLogos: string[];
  isSpinning: boolean;
  lastWinner: string | null;
  totalWinnings: number;
  gamesPlayed: number;
}

const PAYOUT_MULTIPLIERS = {
  1: 8, // Select 1 logo: 8x payout
  2: 3, // Select 2 logos: 3x payout  
  3: 2, // Select 3 logos: 2x payout
};

const COST_PER_LOGO = 1;

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    credits: 10, // Start with 10 credits
    selectedLogos: [],
    isSpinning: false,
    lastWinner: null,
    totalWinnings: 0,
    gamesPlayed: 0,
  });

  const addCredits = useCallback((amount: number) => {
    setGameState(prev => ({
      ...prev,
      credits: prev.credits + amount
    }));
    toast.success(`Added ${amount} credits!`);
  }, []);

  const selectLogo = useCallback((logoId: string) => {
    setGameState(prev => {
      const isSelected = prev.selectedLogos.includes(logoId);
      const newSelected = isSelected 
        ? prev.selectedLogos.filter(id => id !== logoId)
        : [...prev.selectedLogos, logoId];
      
      return {
        ...prev,
        selectedLogos: newSelected
      };
    });
  }, []);

  const clearSelections = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      selectedLogos: []
    }));
  }, []);

  const canPlay = gameState.selectedLogos.length > 0 && 
                 gameState.credits >= gameState.selectedLogos.length * COST_PER_LOGO &&
                 !gameState.isSpinning;

  const startGame = useCallback(() => {
    if (!canPlay) return false;
    
    const cost = gameState.selectedLogos.length * COST_PER_LOGO;
    
    setGameState(prev => ({
      ...prev,
      credits: prev.credits - cost,
      isSpinning: true,
      gamesPlayed: prev.gamesPlayed + 1
    }));
    
    toast.info(`Spinning! Cost: ${cost} credits`);
    return true;
  }, [canPlay, gameState.selectedLogos.length]);

  const handleWin = useCallback((winnerId: string) => {
    setGameState(prev => {
      const isWinner = prev.selectedLogos.includes(winnerId);
      let winAmount = 0;
      
      if (isWinner) {
        const multiplier = PAYOUT_MULTIPLIERS[prev.selectedLogos.length as keyof typeof PAYOUT_MULTIPLIERS] || 1;
        winAmount = prev.selectedLogos.length * COST_PER_LOGO * multiplier;
        
        toast.success(`🎉 YOU WIN! +${winAmount} credits!`, {
          duration: 4000,
        });
      } else {
        toast.error("Better luck next time!", {
          duration: 3000,
        });
      }
      
      return {
        ...prev,
        credits: prev.credits + winAmount,
        isSpinning: false,
        lastWinner: winnerId,
        totalWinnings: prev.totalWinnings + winAmount,
        selectedLogos: [] // Clear selections after spin
      };
    });
  }, []);

  const getGameCost = () => gameState.selectedLogos.length * COST_PER_LOGO;
  
  const getPotentialWin = () => {
    if (gameState.selectedLogos.length === 0) return 0;
    const multiplier = PAYOUT_MULTIPLIERS[gameState.selectedLogos.length as keyof typeof PAYOUT_MULTIPLIERS] || 1;
    return gameState.selectedLogos.length * COST_PER_LOGO * multiplier;
  };

  return {
    ...gameState,
    addCredits,
    selectLogo,
    clearSelections,
    startGame,
    handleWin,
    canPlay,
    getGameCost,
    getPotentialWin,
    payoutMultipliers: PAYOUT_MULTIPLIERS,
  };
};