import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, ActivityIndicator } from 'react-native';
import { ThemeProvider } from '../src/context/themeContext';
import { useFontAssets } from '../src/hooks/useFontAssets';
import { StatusBar } from 'react-native';

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
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ThemeProvider>
				<StatusBar
					barStyle="dark-content"
					backgroundColor="#ff0000"
					translucent={false}
				/>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="index" options={{ title: 'Home' }} />
				</Stack>
			</ThemeProvider>
		</GestureHandlerRootView>
	);
}
