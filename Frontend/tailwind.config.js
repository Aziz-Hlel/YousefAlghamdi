module.exports = {
  theme: {

    extend: {

      keyframes: {
        hoverUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        hoverUp: 'hoverUp 0.3s ease-out bg-black',
      },

    },
  },


  plugins: [],
};
