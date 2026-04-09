export default {
  theme: {
    extend: {
      colors: {
        'navy': '#0B1D3A',
        'navy-light': '#1a3a52',
        'navy-dark': '#0a1428',
        'forest': '#1b4332',
        'forest-light': '#2d6a4f',
        'gold': '#d4a574',
        'gold-light': '#e8c4a0',
        'gold-dark': '#a0734d',
      },
      fontFamily: {
        'sans': ['system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        'heading': ['system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        'mono': ['ui-monospace', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'wave': 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 1200 120%27 preserveAspectRatio=%27none%27%3E%3Cpath d=%27M0,60 Q300,0 600,60 T1200,60%27 fill=%27%23ffffff%27 opacity=%270.1%27/%3E%3C/svg%3E")',
      },
      boxShadow: {
        'fishing': '0 10px 30px rgba(0, 0, 0, 0.3)',
        'hover': '0 15px 40px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'gentle-float': 'gentle-float 6s ease-in-out infinite',
      },
      keyframes: {
        'gentle-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
}
