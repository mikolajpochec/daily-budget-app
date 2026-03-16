import React, { useCallback, useRef, useState} from 'react';
import { View, Text } from 'react-native';
import { getLocales } from 'expo-localization';
import { getCommonStyle } from '../src/styles/common';
import { useTheme } from '../src/hooks/useTheme';
import FText from '../src/components/ftext';
import FTextBold from '../src/components/ftextBold';
import IconButton from '../src/components/iconButton';
import ExpensesList from '../src/components/expensesList';
import Button from '../src/components/button';
import {
	BottomSheetModal,
	BottomSheetView,
	BottomSheetModalProvider,
	BottomSheetTextInput
} from '@gorhom/bottom-sheet';

const mockData: Entry[] = [
	{
		id: 1,
		category: "Food",
		unixTime: 1710000000000,
		description: "Lunch",
		amount: 12.5,
	},
	{
		id: 2,
		category: "Transport",
		unixTime: 1710100000000,
		amount: 3.2,
	},
	{
		id: 3,
		category: "Transport",
		unixTime: 1710100000000,
		amount: 3.2,
	},
	{
		id: 4,
		category: "Transport",
		unixTime: 1710100000000,
		amount: 3.2,
	},
];

function formatLocalDayMonth() {
	const date = new Date()
	const locale = getLocales()[0].languageTag;
	const dayName = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
	const dayNumber = date.getDate();
	const monthName = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);

	return `${dayName} ${dayNumber} ${monthName}`;
}

export default function HomeScreen() {
	const [data, setData] = useState(mockData);
	const [currency, setCurrency] = useState("USD");
	const { theme, isDarkMode, toggleTheme } = useTheme();
	const common = getCommonStyle(theme);
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);
	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
	}, []);
	const onEntryRemoveRequest = (id: number) => {
		setData(prevData => prevData.filter(e => e.id !== id));
	};
	return (
		<BottomSheetModalProvider>
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

			<BottomSheetModal
				ref={bottomSheetModalRef}
				onChange={handleSheetChanges}
				backgroundStyle={common.modalHandle}
				handleIndicatorStyle={common.modalHandleIndicator}
			>
				<BottomSheetView style={common.modal}>
					<FTextBold style={common.headerText}>Add expense</FTextBold>
					<View style={common.numInputContainer}>
						<FTextBold 
							style={[common.bigInputText, {color: theme.minorText}]}>
							{currency}
						</FTextBold>
						<BottomSheetTextInput
							style={[common.numInput, common.bigInputText]}
							keyboardType="decimal-pad"
							placeholder="0.00"
							placeholderTextColor={theme.minorText}
							paddingBottom={0}
							paddingTop={0}
						/>
					</View>
					<FText style={common.secondaryText}>CATEGORY</FText>
					<FText style={common.secondaryText}>
						DESCRIPTION <FText style={common.minorText}>(optional)</FText>
					</FText>
					<Button
						style={common.bottomMargin}
						text='Save'
						onPress={handlePresentModalPress}
						disabled={true}
					/>
				</BottomSheetView>
			</BottomSheetModal>

		</BottomSheetModalProvider>
	);
}
