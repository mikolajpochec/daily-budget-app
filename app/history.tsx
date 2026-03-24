import React, { useState, useEffect } from 'react';
import { View, SectionList } from 'react-native';
import { useRouter } from 'expo-router';
import { getLocales } from 'expo-localization';
import { getCommonStyle } from '../src/styles/common';
import { useTheme } from '../src/hooks/useTheme';
import FText from '../src/components/ftext';
import FTextBold from '../src/components/ftextBold';
import IconButton from '../src/components/iconButton';
import ExpensesList from '../src/components/expensesList';
import { getExpensesFromPeriod, removeExpense } from '../src/utils/sqldb';
import { getValue } from '../src/utils/storage';
import * as formulas from '../src/utils/formulas';
import Expense from '../src/types/expense';

function formatSectionDate(localDate: string): string {
	const [year, month, day] = localDate.split('-').map(Number);
	const date = new Date(year, month - 1, day);
	const locale = getLocales()[0].languageTag;
	const weekday = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
	const dayNum = String(day).padStart(2, '0');
	const monthNum = String(month).padStart(2, '0');
	return `${weekday}, ${dayNum}.${monthNum}`;
}

export default function PeriodExpensesScreen() {
	const [sections, setSections] = useState([]);
	const [currency, setCurrency] = useState('USD');
	const { theme } = useTheme();
	const common = getCommonStyle(theme);
	const router = useRouter();

	const loadExpenses = async () => {
		const savedStartDay = parseInt(await getValue('start-day'));
		const curr = await getValue('currency');
		setCurrency(curr);

		const periodStart = formulas.getCurrentPeriodStart(savedStartDay);
		const expenses = await getExpensesFromPeriod(periodStart, new Date());

		const grouped = expenses.reduce((acc, expense) => {
			if (!acc[expense.localDate]) acc[expense.localDate] = [];
			acc[expense.localDate].push(expense);
			return acc;
		}, {} as Record<string, Expense[]>);

		const sorted = Object.keys(grouped)
			.sort((a, b) => b.localeCompare(a))
			.map(date => ({
				title: formatSectionDate(date),
				data: [grouped[date]],
			}));

		setSections(sorted);
	};

	const onEntryRemoveRequest = async (id: number) => {
		const success = await removeExpense(id);
		if (success) {
			setSections(prev =>
				prev
					.map(section => ({
						...section,
						data: [section.data[0].filter((e: Expense) => e.id !== id)],
					}))
					.filter(section => section.data[0].length > 0)
			);
		}
	};

	useEffect(() => {
		loadExpenses();
	}, []);

	return (
		<View style={common.mainView}>
			<View style={common.stackHeader}>
				<IconButton iconName='arrow-back' onPress={() => router.back()} />
				<FTextBold style={[common.headerText, common.boldText]}>
					This period
				</FTextBold>
			</View>
			<SectionList
				sections={sections}
				keyExtractor={(_, index) => index.toString()}
				renderSectionHeader={({ section }) => (
					<FTextBold style={[common.boldText, styles.sectionHeader]}>
						{section.title}
					</FTextBold>
				)}
				renderItem={({ item }) => (
					<ExpensesList
						count={item.length}
						data={item}
						currency={currency}
						onEntryRemoveRequest={onEntryRemoveRequest}
					/>
				)}
				showsVerticalScrollIndicator={false}
				stickySectionHeadersEnabled={false}
			/>
		</View>
	);
}

const styles = {
	sectionHeader: {
		fontSize: 20,
		marginTop: 16,
		marginBottom: 8,
	},
};
