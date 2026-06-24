const autoprefixer = require('autoprefixer')

function loadTailwindPlugin() {
  try {
    return require('@tailwindcss/postcss')
  } catch (err) {
    // fallback to the legacy package if the new one isn't installed
    return require('tailwindcss')
  }
}

module.exports = {
  plugins: [
    loadTailwindPlugin(),
    autoprefixer,
  ],
}
