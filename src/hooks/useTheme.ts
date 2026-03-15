import { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';
import { lightTheme, darkTheme } from '../constants/theme';

export const useTheme = () => {
	const { isDarkMode, toggleTheme } = useContext(ThemeContext);
	const theme = isDarkMode ? darkTheme : lightTheme;
	return { theme, isDarkMode, toggleTheme };
};
