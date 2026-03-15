import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const deviceTheme = useColorScheme();
	const [isDarkMode, setIsDarkMode] = useState(deviceTheme === 'dark');

	useEffect(() => {
		setIsDarkMode(deviceTheme === 'dark');
	}, [deviceTheme]);

	const toggleTheme = () => {
		setIsDarkMode(prevMode => !prevMode);
	};

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
