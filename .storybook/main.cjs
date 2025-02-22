module.exports = {
  'stories': [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],
  'addons': [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs'
  ],
  'framework': '@storybook/react',
  'core': {
    'builder': '@storybook/builder-vite'
  },
  'features': {
    'storyStoreV7': true
  }
};