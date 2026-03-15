import { View, Text } from 'react-native';
import { getLocales } from 'expo-localization';
import { getCommonStyle } from '../src/styles/common';
import { useTheme } from '../src/hooks/useTheme';
import FText from '../src/components/ftext';
import FTextBold from '../src/components/ftextBold';

function formatLocalDayMonth() {
	const date = new Date()
	const locale = getLocales()[0].languageTag;
	const dayName = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
	const dayNumber = date.getDate();
	const monthName = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);

	return `${dayName} ${dayNumber} ${monthName}`;
}

export default function HomeScreen() {
	const { theme, isDarkMode, toggleTheme } = useTheme();
	const common = getCommonStyle(theme);
	return (
		<View style={common.mainView}>
			<View style={common.dashHeader}>
				<View>
					<FText style={common.dateText}>{formatLocalDayMonth()}</FText>
					<FTextBold style={common.boldText}>dayly.</FTextBold>
				</View>
			</View>
		</View>
	);
}
