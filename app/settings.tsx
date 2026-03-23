import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import FText from '../src/components/ftext';
import FTextBold from '../src/components/ftextBold';
import { getCommonStyle } from '../src/styles/common';
import { useTheme } from '../src/hooks/useTheme';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import IconButton from '../src/components/iconButton';
import { getValue } from '../src/utils/storage';
import ListPicker from '../src/components/listPicker';
import { strategies } from '../src/constants/strategies';
import { setKey } from '../src/utils/storage';
import Button from '../src/components/button';
import { initDB, removeAllExpenses } from '../src/utils/sqldb';
import { round2 } from '../src/utils/formulas';

export default function SettingsScreen() {
	const { currency, startDay, monthlyBudget, strategy } = useLocalSearchParams();
	const [selectedStrategy, setSelectedStrategy] = useState(strategy);
	const { theme } = useTheme();
	const common = getCommonStyle(theme);
	const router = useRouter();

	const handleSelect = (value) => {
		setSelectedStrategy(value);
		setKey('strategy', value);
	};

	const handleClearButtonPress = async () => {
		await initDB();
		await setKey('onboarded', 'false');
		await removeAllExpenses();
		router.navigate('/');
	};

	return (
		<View style={common.mainView}>
			<View style={common.stackHeader}
			>
				<IconButton iconName='arrow-back' onPress={()=>{ router.back(); }}/>
				<FTextBold style={[common.headerText, common.boldText]}>
					Settings
				</FTextBold>
			</View>
			<FText style={common.sectionHeader}>BUDGET</FText>
			<View style={common.listLike}>
				<View style={[common.panel, common.apart, common.lessPaddingForPanel]}>
					<FText>Monthly budget</FText>
					<FText style={common.currency}>
						{monthlyBudget} {currency}
					</FText>
				</View>
				<View style={[common.panel, common.apart, common.lessPaddingForPanel]}>
					<FText>Month start</FText>
					<FText style={common.currency}>{startDay}</FText>
				</View>
			</View>
			<FText style={common.sectionHeader}>OVERFLOW STRATEGY</FText>
			<ListPicker
				items={strategies}
				selectedId={selectedStrategy}
				onSelect={handleSelect}
			/>
			<FText style={common.sectionHeader}>DATA</FText>
			<Button 
				onPress={handleClearButtonPress} 
				style={common.buttonDangerous} 
				text="Clear all data"
			/>
		</View>
	);
}
