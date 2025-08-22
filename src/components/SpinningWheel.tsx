import { useEffect, useState } from "react";
import { carLogos, type CarLogo } from "@/data/carLogos";

interface SpinningWheelProps {
  isSpinning: boolean;
  onSpinComplete: (winnerId: string) => void;
  selectedLogos: string[];
}

export const SpinningWheel = ({ isSpinning, onSpinComplete, selectedLogos }: SpinningWheelProps) => {
  const [currentLight, setCurrentLight] = useState(0);
  const [spinSpeed, setSpinSpeed] = useState(100);

  useEffect(() => {
    if (!isSpinning) return;

    let interval: NodeJS.Timeout;
    let currentSpeed = 50; // Start fast
    let counter = 0;
    let totalSpins = 0;
    const maxSpins = 50; // Total lights to pass before slowing

    const spin = () => {
      counter++;
      totalSpins++;
      
      // Gradually slow down after initial spins
      if (totalSpins > maxSpins) {
        currentSpeed += Math.random() * 20 + 10; // Increase interval (slow down)
      }

      setCurrentLight(prev => (prev + 1) % carLogos.length);
      
      // Stop spinning when very slow and on a random logo
      if (currentSpeed > 500 && Math.random() < 0.3) {
        clearInterval(interval);
        const winnerId = carLogos[counter % carLogos.length].id;
        setTimeout(() => onSpinComplete(winnerId), 500);
        return;
      }

      interval = setTimeout(spin, currentSpeed);
    };

    interval = setTimeout(spin, currentSpeed);

    return () => {
      if (interval) clearTimeout(interval);
    };
  }, [isSpinning, onSpinComplete]);

  return (
    <div className="relative">
      {/* Wheel Container */}
      <div className="wheel-container w-96 h-96 relative">
        
        {/* Car Logos around the wheel */}
        {carLogos.map((logo, index) => {
          const angle = (index * 360) / carLogos.length;
          const radius = 170;
          const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
          const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
          
          return (
            <div
              key={logo.id}
              className={`logo-position ${selectedLogos.includes(logo.id) ? 'border-accent border-4 shadow-md shadow-accent/50' : ''}`}
              style={{
                left: `50%`,
                top: `50%`,
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
              }}
            >
              <div className="text-4xl">{logo.icon}</div>
            </div>
          );
        })}

        {/* Spinning Lights */}
        {carLogos.map((_, index) => {
          const angle = (index * 360) / carLogos.length;
          const radius = 140;
          const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
          const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
          
          return (
            <div
              key={`light-${index}`}
              className={`spin-light ${index === currentLight && isSpinning ? 'active' : ''}`}
              style={{
                left: `50%`,
                top: `50%`,
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
              }}
            />
          );
        })}

        {/* Center Hub */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-arcade-black border-4 border-arcade-gold-dark flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-arcade-gold animate-pulse-glow" />
        </div>
      </div>

      {/* Winner Indicator Arrow */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-4xl text-arcade-red animate-pulse">
        ▼
      </div>
    </div>
  );
};