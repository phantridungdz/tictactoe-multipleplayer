module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    'nativewind/babel',
    [
      'react-native-reanimated/plugin',
      {
        relativeSourceLocation: true,
      },
    ],
  ],
};
