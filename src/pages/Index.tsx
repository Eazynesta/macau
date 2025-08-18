import { SpinningWheel } from "@/components/SpinningWheel";
import { LogoSelector } from "@/components/LogoSelector";
import { useGameState } from "@/hooks/useGameState";
import { Button } from "@/components/ui/button";
import { getLogoById } from "@/data/carLogos";
import { Coins, Info, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const {
    credits,
    selectedLogos,
    isSpinning,
    lastWinner,
    totalWinnings,
    gamesPlayed,
    addCredits,
    selectLogo,
    clearSelections,
    startGame,
    handleWin,
    canPlay,
    getGameCost,
    getPotentialWin,
    payoutMultipliers,
  } = useGameState();

  const handleStartSpin = () => {
    if (startGame()) {
      // Game started successfully
    } else {
      toast.error("Cannot start game. Check your credits and selections.");
    }
  };

  const handleAddCoins = () => {
    addCredits(5);
  };

  const handleInfoClick = () => {
    toast.info(
      `Game Rules:\n• 1 Logo: ${payoutMultipliers[1]}x payout\n• 2 Logos: ${payoutMultipliers[2]}x payout\n• 3 Logos: ${payoutMultipliers[3]}x payout\n• Each logo costs 1 credit`,
      { duration: 5000 }
    );
  };

  const winnerLogo = lastWinner ? getLogoById(lastWinner) : null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="arcade-frame max-w-4xl w-full p-8 space-y-8">
        
        {/* Top Display */}
        <div className="flex justify-between items-center">
          <div className="led-display px-6 py-3">
            <span className="text-sm">CREDITS:</span>
            <span className="text-2xl ml-2 font-bold">{credits.toString().padStart(3, '0')}</span>
          </div>
          
          <div className="led-display px-6 py-3">
            <span className="text-sm">GAMES:</span>
            <span className="text-2xl ml-2 font-bold">{gamesPlayed.toString().padStart(3, '0')}</span>
          </div>
          
          <div className="led-display px-6 py-3">
            <span className="text-sm">WINNINGS:</span>
            <span className="text-2xl ml-2 font-bold">{totalWinnings.toString().padStart(4, '0')}</span>
          </div>
        </div>

        {/* Win/Status Display */}
        <div className="led-display px-8 py-4 text-center">
          {isSpinning ? (
            <div className="text-3xl font-bold text-led-orange animate-pulse-glow">
              SPINNING...
            </div>
          ) : lastWinner ? (
            <div className="space-y-2">
              <div className="text-2xl font-bold text-led-green">
                WINNER: {winnerLogo?.name.toUpperCase()} {winnerLogo?.icon}
              </div>
              {selectedLogos.includes(lastWinner) ? (
                <div className="text-4xl font-bold text-led-green animate-pulse-glow">
                  🎉 YOU WIN! 🎉
                </div>
              ) : (
                <div className="text-xl text-led-red">
                  BETTER LUCK NEXT TIME
                </div>
              )}
            </div>
          ) : (
            <div className="text-2xl font-bold">
              SELECT LOGOS AND SPIN TO WIN!
            </div>
          )}
        </div>

        {/* Main Game Area */}
        <div className="flex justify-center">
          <SpinningWheel
            isSpinning={isSpinning}
            onSpinComplete={handleWin}
            selectedLogos={selectedLogos}
          />
        </div>

        {/* Logo Selection */}
        <LogoSelector
          selectedLogos={selectedLogos}
          onLogoToggle={selectLogo}
          maxSelections={3}
          disabled={isSpinning}
        />

        {/* Game Info Display */}
        {selectedLogos.length > 0 && (
          <div className="flex justify-center">
            <div className="led-display px-6 py-3 text-center space-y-2">
              <div className="text-sm">COST: {getGameCost()} CREDITS</div>
              <div className="text-sm">POTENTIAL WIN: {getPotentialWin()} CREDITS</div>
              <div className="text-xs">PAYOUT: {payoutMultipliers[selectedLogos.length as keyof typeof payoutMultipliers]}x</div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-6">
          <Button
            onClick={handleAddCoins}
            className="arcade-button coin-button"
            size="lg"
          >
            <Coins className="w-6 h-6 mr-2" />
            ADD COINS
          </Button>

          <Button
            onClick={handleStartSpin}
            disabled={!canPlay}
            className="arcade-button start-button text-2xl px-12"
            size="lg"
          >
            {isSpinning ? "SPINNING..." : "START"}
          </Button>

          <Button
            onClick={clearSelections}
            disabled={isSpinning || selectedLogos.length === 0}
            className="arcade-button"
            variant="secondary"
            size="lg"
          >
            <RotateCcw className="w-6 h-6 mr-2" />
            CLEAR
          </Button>

          <Button
            onClick={handleInfoClick}
            className="arcade-button info-button"
            size="lg"
          >
            <Info className="w-6 h-6 mr-2" />
            INFO
          </Button>
        </div>

        {/* Credits Warning */}
        {credits < 3 && (
          <div className="text-center">
            <div className="led-display px-4 py-2 text-led-red animate-pulse-glow inline-block">
              ⚠️ LOW CREDITS - ADD MORE TO CONTINUE PLAYING
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;