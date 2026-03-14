import { Stack } from 'expo-router';
import { ThemeProvider } from './context/themeContext'

export default function RootLayout() {
  return (
	  <ThemeProvider>
	  	<Stack>
	  		<Stack.Screen name="index" options={{ title: 'Home' }} />
	  	</Stack>
	  </ThemeProvider>
  );
}
