import React from 'react';
import { View } from 'react-native';
import FText from '../src/components/ftext';
import FTextBold from '../src/components/ftextBold';
import { getCommonStyle } from '../src/styles/common';
import { useTheme } from '../src/hooks/useTheme';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import IconButton from '../src/components/iconButton';

export default function SettingsScreen() {
	const { currency } = useLocalSearchParams();
	const { theme } = useTheme();
	const common = getCommonStyle(theme);
	const router = useRouter();
	return (
		<View style={common.mainView}>
			<View style={common.stackHeader}
			>
				<IconButton iconName='arrow-left' onPress={()=>{ router.back(); }}/>
				<FTextBold style={[common.headerText, common.boldText]}>
					Settings
				</FTextBold>
			</View>
			<FText style={common.sectionHeader}>BUDGET</FText>
			<View style={common.listLike}>
				<View style={[common.panel, common.apart, common.lessPaddingForPanel]}>
					<FText>Monthly budget</FText>
					<FText style={common.currency}>000 {currency}</FText>
				</View>
				<View style={[common.panel, common.apart, common.lessPaddingForPanel]}>
					<FText>Month start</FText>
					<FText style={common.currency}>12th day</FText>
				</View>
			</View>
			<FText style={common.sectionHeader}>OVERFLOW STRATEGY</FText>
		</View>
	);
}
