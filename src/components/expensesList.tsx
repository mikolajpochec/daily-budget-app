import { useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCommonStyle } from '../styles/common';
import { useTheme } from '../hooks/useTheme';
import { getLocales } from 'expo-localization';
import FText from './ftext';
import FTextBold from './ftextBold';
import RemoveButton from './removeButton';

export type ExpenseEntry = {
	id: number;
	category: string;
	unixTime: number; 
	description?: string;
	amount: number;
};

export type ExpensesListProps = {
	count: number;
	data: ExpenseEntry[];
	currency: string;
	onEntryRemoveRequest: (id: number) => void;
};

export type ExpensesListItemProps = {
	item: ExpenseEntry;
	currency: string;
	onEntryRemoveRequest: (id: number) => void;
}

function ExpenseListItem({ item, currency, onEntryRemoveRequest }: ExpensesListItemProps) {
	const { theme, isDarkMode, toggleTheme } = useTheme();
	const common = getCommonStyle(theme);

	const locale = getLocales()[0].languageTag;
	const time = new Intl.DateTimeFormat(locale, {
		hour: 'numeric',
		minute: '2-digit',
	}).format(new Date(item.unixTime));
	return (
		<View style={common.listEntryContainer}>
			<View style={common.listEntryIcon}>
				<Ionicons 
					size={16}
					name='compass' 
				/>
			</View>
			<View 
				style={common.listEntryCenter}
			>
				<View>
					<FTextBold>{item.category}</FTextBold>
					<FText style={common.minorText}>
						{item.description ? `${item.description}  ·  ` : ''}
						{time}
					</FText>
				</View>
				<FTextBold>{item.amount} {currency}</FTextBold>
			</View>
			<View >
				<RemoveButton onPress={() => {onEntryRemoveRequest(item.id)}}/>
			</View>
		</View>
	);
}

// Placeholder for an actual list
export default function ExpensesList({
	count, 
	data, 
	currency, 
	onEntryRemoveRequest
}: ExpensesListProps) {
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
		<FlatList
			style={common.list}
			data={data}
			keyExtractor={(item) => item.id}
			renderItem={
				({ item }) => 
					<ExpenseListItem 
						item={item} 
						currency={currency}
						onEntryRemoveRequest={onEntryRemoveRequest}
					/>
			}
			ItemSeparatorComponent={() => <View style={common.listSeparator} />}
		/>
	)
}
