import { StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';

export const getCommonStyle = (theme) => {
	const DEFAULT_GAP = 16;
	return StyleSheet.create({
		mainView: {
			marginTop: StatusBar.currentHeight,
			backgroundColor: theme.background, padding: DEFAULT_GAP * 1.25,
			gap: DEFAULT_GAP,
			flex: 1
		},
		dashHeader: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
		},
		text: {
			color: theme.text,
			fontFamily: 'Bricolage Grotesque',
		},
		boldText: {
			color: theme.text,
			fontFamily: 'Bricolage Grotesque Bold',
		},
		headerText: {
			fontSize: 18,
		},
		dateText: {
			color: theme.secondaryText,
			fontSize: 12
		},
		panel: {
			borderRadius: 26,
			borderWidth: 1,
			borderColor: `${theme.secondaryText}33`,
			backgroundColor: theme.foreground,
			paddingLeft: DEFAULT_GAP,
			paddingRight: DEFAULT_GAP,
			paddingTop: DEFAULT_GAP * 1.25,
			paddingBottom: DEFAULT_GAP * 1.25,
			overflow: 'hidden'
		},
		iconButton: {
			width: 38,
			height: 38,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 10,
			borderWidth: 1,
			borderColor: `${theme.secondaryText}22`,
			backgroundColor: theme.foreground,
		},
		iconButtonIcon: {
			color: theme.secondaryText
		},
		secondaryText: {
			color: theme.secondaryText,
			fontSize: 11
		},
		minorText: {
			color: theme.minorText,
			fontSize: 11
		},
		currency: {
			color: theme.primary,
			fontSize: 16
		},
		bigAmount: {
			color: theme.primary,
			fontSize: 56
		},
		amountContainer: {
			flexDirection: 'row',
			alignItems: 'baseline'
		},
		circleDecoration: {
			position: 'absolute',
			backgroundColor: `${theme.primary}11`,
			width: 200,
			height: 200,
			borderRadius: '100%',
			right: -55,
			top: -55,
		},
		statContainer: {
			flexDirection: 'row',
			gap: DEFAULT_GAP
		},
		statCard: {
			flex: 1,
			borderRadius: 18
		},
		statAmount: {
			color: theme.text,
			fontSize: 20
		},
		emptyListIndicatorContainer: {
			justifyContent: 'center',
			alignItems: 'center',
		},
		emptyListIndicatorIcon: {
			color: theme.minorText,
			marginBottom: 20
		},
		button: {
			borderRadius: 18,
			height: 54,
			backgroundColor: theme.primary,
			justifyContent: 'center',
			alignItems: 'center'
		},
		bottomMargin: {
			marginBottom: DEFAULT_GAP
		},
		modalHandleIndicator: {
			backgroundColor: `${theme.minorText}55`
		},
		modalHandle: {
			backgroundColor: theme.foreground,
			borderTopWidth: 1,
			borderLeftWidth: 1,
			borderRightWidth: 1,
			borderColor: `${theme.minorText}55`,
			borderRadius: 28
		},
		modal: {
			backgroundColor: theme.foreground,
			padding: DEFAULT_GAP
		},
		bigInputText: {
			fontSize: 38,
		},
		numInputContainer: {
			flexDirection: 'row',
			borderBottomWidth: 1,
			borderBottomColor: theme.primary,
			alignItems: 'center',
			marginBottom: DEFAULT_GAP
		},
		numInput: {
			fontFamily: 'Bricolage Grotesque Bold',
			color: theme.text,
			flex: 1,
		}
	})
}

