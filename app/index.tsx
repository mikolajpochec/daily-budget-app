import { View, Text } from 'react-native';
import { getLocales } from 'expo-localization';
import { getCommonStyle } from '../src/styles/common';
import { useTheme } from '../src/hooks/useTheme';
import FText from '../src/components/ftext';
import FTextBold from '../src/components/ftextBold';
import IconButton from '../src/components/iconButton';
import ExpensesList from '../src/components/expensesList';
import Button from '../src/components/button';

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
	const currency = 'USD'; // TODO: Let user choose currency
	return (
		<View style={[common.mainView]}>
			<View style={common.dashHeader}>
				<View>
					<FText style={common.dateText}>{formatLocalDayMonth()}</FText>
					<FTextBold style={[common.headerText, common.boldText]}>Daily Budget</FTextBold>
				</View>
				<IconButton iconName='settings-outline'/>
			</View>
			<View>
				<View style={common.panel}>
					<FText style={common.secondaryText}>REMAINING TODAY</FText>
					<View style={common.amountContainer}>
						<FText style={common.currency}>{currency}</FText>
						<FTextBold style={common.bigAmount}>0.00</FTextBold>
					</View>
					<FText style={common.secondaryText}>
						of <FTextBold>0.00 {currency}</FTextBold> daily budget
					</FText>
					<View style={common.circleDecoration}/>
				</View>
			</View>
			<View style={common.statContainer}>
				<View style={[common.panel, common.statCard]}>
					<FText style={common.secondaryText}>SPENT TODAY</FText>
					<FTextBold style={common.statAmount}>0.00 {currency}</FTextBold>
					<FText style={common.minorText}>0 expenses</FText>
				</View>
				<View style={[common.panel, common.statCard]}>
					<FText style={common.secondaryText}>DAYS LEFT</FText>
					<FTextBold style={common.statAmount}>31</FTextBold>
					<FText style={common.minorText}>in this period</FText>
				</View>
			</View>
			<View style={common.statContainer}>
				<View style={[common.panel, common.statCard]}>
					<FText style={common.secondaryText}>MONTHLY SPENT</FText>
					<FTextBold style={common.statAmount}>0.00 {currency}</FTextBold>
					<FText style={common.minorText}>of ??? {currency}</FText>
				</View>
				<View style={[common.panel, common.statCard]}>
					<FText style={common.secondaryText}>MONTHLY LEFT</FText>
					<FTextBold style={common.statAmount}>0.00 {currency}</FTextBold>
					<FText style={common.minorText}>Tommorow: ??? {currency}</FText>
				</View>
			</View>
			<FTextBold>Today's expenses</FTextBold>
			<View style={{flex: 1, justifyContent: 'space-between'}}>
				<ExpensesList count={0}/>
				<Button style={common.bottomMargin} text='+   Add record'/>
			</View>
		</View>
	);
}
