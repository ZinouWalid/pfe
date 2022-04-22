module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'register-background':
          "url('https://cdn.dribbble.com/users/1068771/screenshots/5077240/media/aa2a8f085a817f4d3326e1dc1061161e.jpg?compress=1&resize=1200x900&vertical=top')",
        
      }),
    },
  },
  plugins: [],
}
