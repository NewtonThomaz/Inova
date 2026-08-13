/**
 * Configuração do Tailwind CSS
 * Inclui design tokens da marca Inova (cores, fontes)
 */
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        inova: {
          blue: '#004D95',
          'blue-hover': '#003A70',
          'blue-light': '#EBF3FA',
          yellow: '#F4B41A',
          'yellow-hover': '#D99E10',
          'yellow-light': '#FEF9E7'
        }
      }
    }
  }
};