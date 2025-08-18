import { carLogos, type CarLogo } from "@/data/carLogos";

interface LogoSelectorProps {
  selectedLogos: string[];
  onLogoToggle: (logoId: string) => void;
  maxSelections: number;
  disabled: boolean;
}

export const LogoSelector = ({ selectedLogos, onLogoToggle, maxSelections, disabled }: LogoSelectorProps) => {
  const handleLogoClick = (logoId: string) => {
    if (disabled) return;
    
    const isSelected = selectedLogos.includes(logoId);
    const canSelect = selectedLogos.length < maxSelections;
    
    if (isSelected || canSelect) {
      onLogoToggle(logoId);
    }
  };

  return (
    <div className="bg-arcade-red p-6 rounded-lg">
      <h3 className="text-center text-lg font-bold mb-4 text-secondary-foreground">
        SELECT YOUR LOGOS ({selectedLogos.length}/{maxSelections})
      </h3>
      
      <div className="grid grid-cols-6 gap-4">
        {carLogos.map((logo) => (
          <button
            key={logo.id}
            onClick={() => handleLogoClick(logo.id)}
            disabled={disabled || (!selectedLogos.includes(logo.id) && selectedLogos.length >= maxSelections)}
            className={`logo-button ${
              selectedLogos.includes(logo.id) ? 'selected' : ''
            } ${
              disabled || (!selectedLogos.includes(logo.id) && selectedLogos.length >= maxSelections) 
                ? 'opacity-50 cursor-not-allowed' 
                : 'cursor-pointer'
            }`}
          >
            <div className="text-2xl">{logo.icon}</div>
            <div className="text-xs mt-1 font-bold">{logo.name}</div>
          </button>
        ))}
      </div>
      
      {selectedLogos.length > 0 && (
        <div className="mt-4 text-center">
          <div className="text-secondary-foreground text-sm">Selected:</div>
          <div className="flex justify-center gap-2 mt-2">
            {selectedLogos.map(logoId => {
              const logo = carLogos.find(l => l.id === logoId);
              return logo ? (
                <div key={logoId} className="text-2xl">{logo.icon}</div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};