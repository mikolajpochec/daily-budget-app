import { Stack } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { ThemeProvider } from '../src/context/themeContext';
import { useFontAssets } from '../src/hooks/useFontAssets';

export default function RootLayout() {
	const fontsLoaded = useFontAssets();
	if (!fontsLoaded) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}
	return (
		<ThemeProvider>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="index" options={{ title: 'Home' }} />
			</Stack>
		</ThemeProvider>
	);
}
