import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',          // ✅ fixed
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#bb1919',    // your primary color (optional)
      },
      // ... other extensions
    },
  },
  plugins: [],
}
export default config
