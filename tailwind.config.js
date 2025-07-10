module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- tells Tailwind to scan these files for class names
  ],
  theme: {
    extend: {
      animation: {
        'bounce-once': 'bounce 1s ease-out',
      },
      fontFamily: {
        dmsans: ['DM Sans', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      },
      colors: {
        babyrose: '#FEEAEF',
        slategray: '#495057',
        grayish: '#495057',
        rosefire: '#F93162',
        deepindigo: '#502DEB',
        slateboost: '#495057'
      }
    }
  }
}
