import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { getCommonStyle } from '../styles/common';
import { useTheme } from '../hooks/useTheme';
import FText from './ftext';

type ExpensesListProps = {
	count: number
};

// Placeholder for an actual list
export default function ExpensesList({count}: ExpensesListProps) {
	const { theme, isDarkMode, toggleTheme } = useTheme();
	const common = getCommonStyle(theme);
	if(count === 0) {
		return (
			<View style={[{flex: 1}, common.emptyListIndicatorContainer]}>
				<Ionicons 
					style={common.emptyListIndicatorIcon} 
					size={50}
					name='compass' 
				/>
				<FText style={common.minorText}>No expenses yet today.</FText>
				<FText style={common.minorText}>Tap the button below to add one.</FText>
			</View>
		)
	}
	return (
		<Text style={{backgroundColor: 'red'}}>Not implemented</Text>
	)
}
