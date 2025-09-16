module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spotify-bg': '#121212',
        'spotify-sidebar': '#000000',
        'spotify-text-primary': '#ffffff',
        'spotify-text-secondary': '#b3b3b3',
        'spotify-accent': '#1db954',
        'spotify-hover': '#282828',
        'spotify-card': '#181818',
        'spotify-player': '#181818'
      }
    },
  },
  plugins: [],
}