import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
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
import { getValue, clearStorage } from '../src/utils/storage.ts';

export default function HomeScreen() {
	const [expensesData, setExpensesData] = useState([]);
	const [onboarded, setOnboarded] = useState(false);
	const [currency, setCurrency] = useState("USD");
	const [startDay, setStartDay] = useState(1);
	const [monthlyBudget, setMonthlyBudget] = useState(null);
	const [strategy, setStrategy] = useState(null);
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
			setExpensesData(prevData => prevData.filter(e => e.id !== id));
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
		setExpensesData(prev => [...prev, result]);
	};

	useEffect(() => {
		const db = async () => {
			await initDB();
			const expenses = await getDailyExpenses(new Date());
			setExpensesData(expenses);
		}
		db();
		(async () => {
			const isOnboarded = await getValue('onboarded') == 'true';
			console.log(`Is onboarded: ${isOnboarded}`);
			if(!isOnboarded) {
				router.navigate('/onboarding');
			}
			setCurrency(await getValue('currency'));
			setStartDay(parseInt(await getValue('start-day')));
			setMonthlyBudget(parseInt(await getValue('monthly-budget')));
			setStrategy(await getValue('strategy'));
			setOnboarded(isOnboarded);
		})();
	}, []);

	if(onboarded !== true) {
		return (
			<View style={[common.mainView, { justifyContent: 'center' }]}>
				<ActivityIndicator size="large"/>
			</View>
		);
	}

	return (
		<BottomSheetModalProvider>
			<View style={common.mainView}>
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
						onPress={()=>{ 
							router.navigate({
								pathname: '/settings',
								params: {
									currency,
									startDay,
									monthlyBudget,
									strategy
								},
							});
						}}
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
						count={expensesData.length} 
						data={expensesData}
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



