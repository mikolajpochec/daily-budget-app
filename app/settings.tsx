import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
import FText from '../src/components/ftext';
import FTextBold from '../src/components/ftextBold';
import { getCommonStyle } from '../src/styles/common';
import { useTheme } from '../src/hooks/useTheme';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import IconButton from '../src/components/iconButton';
import ListPicker from '../src/components/listPicker';
import { strategies } from '../src/constants/strategies';
import { setKey } from '../src/utils/storage';
import Button from '../src/components/button';
import { initDB, removeAllExpenses } from '../src/utils/sqldb';
import { round2 } from '../src/utils/formulas';
import { PickerItem } from '../src/components/listPicker';
import { ThemeContext } from '../src/context/themeContext';

export default function SettingsScreen() {
	const { currency, startDay, monthlyBudget, strategy } = useLocalSearchParams();
	const [selectedStrategy, setSelectedStrategy] = useState(strategy);
	const [selectedMode, setSelectedMode] = useState('auto');
	const { isDarkMode, toggleTheme, setTheme, savedAppThemePreference } =
		useContext(ThemeContext);
	const { appTheme, setAppTheme } = useState(null);
	const { theme } = useTheme();
	const common = getCommonStyle(theme);
	const router = useRouter();

	const handleStrategySelect = (value) => {
		setSelectedStrategy(value);
		setKey('strategy', value);
	};

	const handleModeSelect = (value) => {
		setSelectedMode(value);
		setTheme(value);
		setKey('app-theme', value);
	};

	const handleClearButtonPress = async () => {
		await initDB();
		await setKey('onboarded', 'false');
		await removeAllExpenses();
		router.navigate('/');
	};

	const themeModes: PickerItem[] = [
		{
			id: 'auto',
			iconName: 'auto-mode',
			title: 'Auto',
			description: 'Use device theme.'
		},
		{
			id: 'light',
			iconName: 'white-balance-sunny',
			title: 'Light',
			description: 'Use light theme.'
		},
		{
			id: 'dark',
			iconName: 'moon-last-quarter',
			title: 'Dark',
			description: 'Use dark theme.'
		}
	];

	useEffect(() => {
		if(savedAppThemePreference === null) return;
		setSelectedMode(savedAppThemePreference);
	}, [savedAppThemePreference]);

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
				onSelect={handleStrategySelect}
			/>
			<FText style={common.sectionHeader}>APP THEME</FText>
			<ListPicker
				items={themeModes}
				selectedId={selectedMode}
				onSelect={handleModeSelect}
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
