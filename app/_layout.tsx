import KeyboardAwareScrollView from "@/components/keyboard-aware-scrollview";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  Syne_400Regular,
  Syne_700Bold,
  useFonts,
} from "@expo-google-fonts/syne";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({ Syne_400Regular, Syne_700Bold });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="splash" />
          </Stack>
        </KeyboardAwareScrollView>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
