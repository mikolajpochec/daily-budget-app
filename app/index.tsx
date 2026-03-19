import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { getLocales } from 'expo-localization';
import { getCommonStyle } from '../src/styles/common';
import { useTheme } from '../src/hooks/useTheme';
import FText from '../src/components/ftext';
import FTextBold from '../src/components/ftextBold';
import IconButton from '../src/components/iconButton';
import ExpensesList from '../src/components/expensesList';
import Button from '../src/components/button';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ExpenseModal from '../src/components/expenseModal';
import ExpenseDBEntry from '../src/types/expense.ts';
import { 
	initDB, 
	getDailyExpenses,
	addExpense,
	removeExpense
} from '../src/utils/sqldb.ts';

export default function HomeScreen() {
	const [data, setData] = useState([]);
	const [currency, setCurrency] = useState("USD");
	const { theme } = useTheme();
	const common = getCommonStyle(theme);
	const router = useRouter();
	const modalRef = useRef(null);

	const formatLocalDayMonth = () =>  {
		const date = new Date()
		const locale = getLocales()[0].languageTag;
		const dayName = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
		const dayNumber = date.getDate();
		const monthName = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
		return `${dayName} ${dayNumber} ${monthName}`;
	}

	const handlePresentModalPress = useCallback(() => {
		modalRef.current?.present();
	}, []);

	const onEntryRemoveRequest = async (id: number) => {
		const success = await removeExpense(id);
		if(success) {
			setData(prevData => prevData.filter(e => e.id !== id));
		}
	};

	const handleExpenseSubmit = async (
		{
			amount,
			categoryText,
			description,
		}: {
			amount: string;
			categoryText: string;
			description: string;
		}
	) => {			
		const result = await addExpense(amount, categoryText, description);
		setData(prev => [...prev, result]);
	};

	useEffect(() => {
		const db = async () => {
			await initDB();
			const expenses = await getDailyExpenses(new Date());
			setData(expenses);
		}
		db();
	}, []);

	return (
		<BottomSheetModalProvider>
			<View style={[common.mainView]}>
				{/* --- BEGIN HEADER --- */}
				<View style={common.apart}>
					<View>
						<FText style={common.dateText}>{formatLocalDayMonth()}</FText>
						<FTextBold style={[common.headerText, common.boldText]}>
							Daily Budget
						</FTextBold>
					</View>
					<IconButton 
						iconName='settings-outline'
						onPress={()=>{ router.navigate(`/settings?currency=${currency}`) }}
					/>
				</View>
				{/* --- END HEADER --- */}

				{/* --- BEGIN PANEL --- */}
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
				{/* --- END PANEL --- */}

				{/* --- BEGIN CARDS --- */}
				<View style={common.halfGap}>
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
				</View>
				{/* --- END CARDS --- */}

				<FTextBold>Today's expenses</FTextBold>
				<View style={{ flex: 1, justifyContent: 'space-between' }}>
					<ExpensesList 
						count={data.length} 
						data={data}
						currency={currency}
						onEntryRemoveRequest={onEntryRemoveRequest}
					/>

					<Button
						style={common.bottomMargin}
						text='+   Add record'
						onPress={handlePresentModalPress}
					/>
				</View>
			</View>

			<ExpenseModal
				ref={modalRef}
				currency={currency}
				onSubmit={handleExpenseSubmit}
			/>

		</BottomSheetModalProvider>
	);
}



