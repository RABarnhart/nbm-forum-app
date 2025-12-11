/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: "black", 
    background: '#e6e6e6',
    tint: '#624ff0',
    icon: '#5b5b5b',
    tabIconDefault: '#a5a5a5',
    tabIconSelected: '#624ff0',
  },
  dark: {
    text: '#e6e6e6',
    background: '#5b5b5b', 
    tint: '#624ff0', 
    icon: '#e6e6e6', 
    tabIconDefault: '#a5a5a5', 
    tabIconSelected: '#624ff0',
  },
  main: '#624ff0',
  darkGrey: '#5b5b5b',
  grey: '#a5a5a5',
  lightGrey: '#e6e6e6',
  errorPink: '#fcd0c9',
  errorRed: '#ff0000'
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
    // Custom Syne fonts
    syne: {
      regular: 'Syne_400Regular',
      bold: 'Syne_700Bold',
    },
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
    // Custom Syne fonts
    syne: {
      regular: 'Syne_400Regular',
      bold: 'Syne_700Bold',
    },
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    // Custom Syne fonts
    syne: {
      regular: 'Syne_400Regular',
      bold: 'Syne_700Bold',
    },
  },
});
