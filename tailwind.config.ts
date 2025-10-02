const plugin = require("tailwindcss/plugin");

module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}"
	],
	theme: {
		extend: {
			animation: {
				"pulse-slow": "pulse 6s infinite",
		},
			colors: {
				background: "hsl(0, 0%, 97%)", // Light gray for better contrast
				foreground: "hsl(215, 28%, 17%)", // Dark navy for text
				primary: {
					DEFAULT: "hsl(205, 72%, 41%)", // Blue
					foreground: "hsl(180, 70%, 34%)",
					secondary: "#10587c", // Light text on primary
					headerMidPoint: "#2b7ab7"
				},
				backgroundSunny: {
					DEFAULT: "hsl(39, 89%, 86%)", // sun light yellow
				},
				backgroundSunnyDark: {
					DEFAULT: "hsla(42, 97%, 63%, 0.6)", // sun dark yellow
				},

				spacing: {
					80: "20rem"
				},
				secondary: {
					DEFAULT: "hsl(200, 30%, 46%)", // Muted blue-gray
					foreground: "hsl(0, 0%, 97%)" // Light text on secondary
				},
				muted: {
					DEFAULT: "hsl(200, 20%, 88%)", // Very light gray
					foreground: "hsl(215, 20%, 27%)" // Darker gray text
				},
				destructive: {
					DEFAULT: "hsl(0, 70%, 50%)", // Bright red
					foreground: "hsl(0, 0%, 97%)" // Light text on red
				},
				accent: {
					DEFAULT: "hsl(145, 63%, 42%)", // Green for accents
					foreground: "hsl(0, 0%, 97%)" // Light text on accent
				},
				border: "hsl(215, 28%, 89%)",
				input: "hsl(215, 28%, 96%)",
				card: {
					DEFAULT: "hsl(0, 0%, 100%)",
					foreground: "hsl(215, 28%, 17%)"
				},

			// 	animation: {
			// 		pulseScale: "pulseScale 2s infinite"
			// 	},
			// 	keyframes: {
			// 		pulseScale: {
			// 			"0%, 100%": { transform: "scale(1)" },
			// 			"50%": { transform: "scale(1.1)" }
			// 		}
			// 	}
			},
			borderRadius: {
				lg: "0.5rem",
				md: "0.375rem",
				sm: "0.25rem"
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography"),
		require("@tailwindcss/line-clamp"),
		plugin(function ({ addComponents }: any) {
			addComponents({
				".input-default": {
					backgroundColor: "hsl(215, 28%, 96%)", // Match updated input background
					borderWidth: "1px",
					borderColor: "hsl(215, 28%, 89%)",
					borderRadius: "0.5rem"
				}
			});
		})
	]
};
