module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'register-background':
          "url('https://img.freepik.com/free-vector/courier-delivering-order-customer-door-man-getting-parcel-box-package-flat-vector-illustration-postman-shipping-service_74855-8309.jpg?w=2000')",
      }),
    },
  },
  plugins: [],
}
