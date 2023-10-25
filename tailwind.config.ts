import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#622398',
        gray: '#F3F3F3',
        secondary: '#FE7F2E',
        dark: '#000',
        white: '#fff',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
export default config;
