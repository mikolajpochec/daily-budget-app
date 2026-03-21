import { useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCommonStyle } from '../styles/common';
import { useTheme } from '../hooks/useTheme';
import { getLocales } from 'expo-localization';
import FText from './ftext';
import FTextBold from './ftextBold';
import RemoveButton from './removeButton';
import Expense from '../types/expense';
import { categories } from '../constants/categories';

type ExpensesListProps = {
	count: number;
	data: Expense[];
	currency: string;
	onEntryRemoveRequest: (id: number) => void;
};

export type ExpensesListItemProps = {
	item: Expense;
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
	}).format(new Date(item.createdAt));
	return (
		<View style={[common.listEntryContainer]}>
			<View style={common.listEntryIcon}>
				<FText style={{fontSize: 18}}>
					{categories.find((e) => e.text === item.category)?.emoji}
				</FText>
			</View>
			<View 
				style={common.listEntryCenter}
			>
				<View>
					<FTextBold>{item.category}</FTextBold>
					<FText style={common.minorText}>
						{time}
						{item.description ? `  ·  ${item.description}` : ''}
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
