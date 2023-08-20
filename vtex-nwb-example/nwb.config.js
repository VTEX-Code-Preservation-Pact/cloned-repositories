const path = require('path')

module.exports = {
  type: 'react-component',
  npm: {
    esModules: false,
    umd: false
  },
  webpack: {
    extractText: {
      allChunks: true,
      filename: 'styles.css',
    },
    styles: {
      css: [
        {
          include: path.resolve('src/components'),
          css: {
            modules: true,
            localIdentName:
              process.env.NODE_ENV === 'production'
                ? '[path][name]-[local]-[hash:base64:5]'
                : '[hash:base64:5]',
          },
        },
        // Create a catch-all rule for all other CSS stylesheets
        {
          exclude: path.resolve('src/components'),
        },
      ],
    },
  },
}
