import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useFonts, Syne_400Regular, Syne_700Bold } from '@expo-google-fonts/syne';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({ Syne_400Regular, Syne_700Bold });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider  value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Ensure splash shows first */}
        <Stack.Screen name="signin" />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
