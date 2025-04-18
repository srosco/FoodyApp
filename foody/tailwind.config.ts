import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  safelist: [
    {
      pattern: /bg-(.*)-(.*)/,
      variants: ['hover'],
    },
  ],
  theme: {
    extend: {
      animation: {
        'fade-bounce': 'fadeBounce 0.75s ease-out', // Duration and easing
        'fadout-bounce': 'fadeBounce 2s ease-out forwards',
      },
      keyframes: {
        fadeBounce: {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '60%': { opacity: '1', transform: 'scale(1.1)' }, // Reduced the scale
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadoutBounce: {
          '0%': { opacity: '1', transform: 'scale(0.5)' },
          '60%': { opacity: '1', transform: 'scale(1.1)' }, // Reduced the scale
          '100%': { opacity: '0.2', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
} satisfies Config;
