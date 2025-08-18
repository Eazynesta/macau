import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				arcade: {
					gold: 'hsl(var(--arcade-gold))',
					'gold-dark': 'hsl(var(--arcade-gold-dark))',
					red: 'hsl(var(--arcade-red))',
					'red-dark': 'hsl(var(--arcade-red-dark))',
					green: 'hsl(var(--arcade-green))',
					black: 'hsl(var(--arcade-black))'
				},
				led: {
					orange: 'hsl(var(--led-orange))',
					red: 'hsl(var(--led-red))',
					green: 'hsl(var(--led-green))',
					background: 'hsl(var(--led-background))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'wheel-spin': {
					from: { transform: 'rotate(0deg)' },
					to: { transform: 'rotate(1440deg)' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						opacity: '1',
						textShadow: '0 0 8px currentColor'
					},
					'50%': { 
						opacity: '0.7',
						textShadow: '0 0 16px currentColor, 0 0 24px currentColor'
					}
				},
				celebrate: {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'wheel-spin': 'wheel-spin var(--spin-duration) cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'pulse-glow': 'pulse-glow var(--pulse-duration) infinite',
				celebrate: 'celebrate 0.6s ease-in-out 3'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
