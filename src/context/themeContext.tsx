import React, { createContext, useState, useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { getValue } from '../utils/storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const deviceTheme = useColorScheme();
	const [isDarkMode, setIsDarkMode] = useState(deviceTheme === 'dark');
	const [savedAppThemePreference, setSavedAppThemePreference] = useState(null);

	useEffect(() => {
		setIsDarkMode(deviceTheme === 'dark');
	}, [deviceTheme]);

	const toggleTheme = (theme?: 'dark' | 'light' = null) => {
		setIsDarkMode(prevMode => !prevMode);
	};

	const setTheme = (theme: 'dark' | 'light' | 'auto') => {
		if(theme === 'auto') {
			setIsDarkMode(deviceTheme === 'dark');
			return;
		}
		setIsDarkMode(theme === 'dark');
		setSavedAppThemePreference(theme);
	};

	const loadThemeSetting = async () => {
		const theme = await getValue('app-theme');
		setSavedAppThemePreference(theme);
		if(theme === null) return;
		setTheme(theme);
	};

	useEffect(() => {
		StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content', true);
	}, [isDarkMode]);

	useEffect(() => {
		loadThemeSetting();
	}, []);

	return (
		<ThemeContext.Provider value={{ 
			isDarkMode, 
			toggleTheme, 
			setTheme,
			savedAppThemePreference
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};
