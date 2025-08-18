export interface CarLogo {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const carLogos: CarLogo[] = [
  { id: 'bmw', name: 'BMW', icon: '🚗', color: '#1f5582' },
  { id: 'mercedes', name: 'Mercedes', icon: '⭐', color: '#c0c0c0' },
  { id: 'audi', name: 'Audi', icon: '⚫', color: '#bb0a30' },
  { id: 'toyota', name: 'Toyota', icon: '🔴', color: '#eb0a1e' },
  { id: 'ford', name: 'Ford', icon: '🔵', color: '#003478' },
  { id: 'chevrolet', name: 'Chevrolet', icon: '✨', color: '#ffc72c' },
  { id: 'volkswagen', name: 'VW', icon: '🅥', color: '#151f6d' },
  { id: 'honda', name: 'Honda', icon: '🏁', color: '#cc0000' },
  { id: 'nissan', name: 'Nissan', icon: '🎯', color: '#c3002f' },
  { id: 'hyundai', name: 'Hyundai', icon: '💎', color: '#002c5f' },
  { id: 'kia', name: 'Kia', icon: '🔸', color: '#05141f' },
  { id: 'mazda', name: 'Mazda', icon: '🌟', color: '#b32821' },
  { id: 'subaru', name: 'Subaru', icon: '⭐', color: '#0052cc' },
  { id: 'lexus', name: 'Lexus', icon: '🔷', color: '#1a1a1a' },
  { id: 'ferrari', name: 'Ferrari', icon: '🐎', color: '#dc143c' },
  { id: 'lamborghini', name: 'Lambo', icon: '🐂', color: '#f9e71e' }
];

export const getLogoById = (id: string): CarLogo | undefined => {
  return carLogos.find(logo => logo.id === id);
};