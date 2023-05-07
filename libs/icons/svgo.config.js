module.exports = {
  plugins: [
    {
      name: 'cleanupAttrs',
      active: true,
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: '(stroke|fill|class)',
      },
      active: true,
    },
    {
      name: 'removeDimensions',
      active: true,
    },
    {
      name: 'removeViewBox',
      active: true,
    },
  ],
};
