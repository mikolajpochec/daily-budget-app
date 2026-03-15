import { StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';

export const getCommonStyle = (theme) => {
	const DEFAULT_PADDING = 16;
	return StyleSheet.create({
		mainView: {
			marginTop: StatusBar.currentHeight,
			backgroundColor: theme.background,
			padding: DEFAULT_PADDING,
			flex: 1
		},
		dashHeader: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
		},
		text: {
			fontFamily: 'Bricolage Grotesque',
		},
		boldText: {
			fontFamily: 'Bricolage Grotesque Bold',
		},
		dateText: {
			color: theme.secondaryText,
			fontSize: 12
		}
	})
}

