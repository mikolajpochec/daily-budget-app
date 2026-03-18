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
		apart: {
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
			paddingHorizontal: DEFAULT_GAP,
			paddingVertical: DEFAULT_GAP * 1.25,
			overflow: 'hidden'
		},
		lessPaddingForPanel:{
			borderRadius: 12,
			paddingVertical: DEFAULT_GAP,
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
		sectionHeader: {
			marginBottom: 0,
			color: theme.minorText,
			fontSize: 12,
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
		buttonDisabled: {
			borderRadius: 18,
			height: 54,
			backgroundColor: `${theme.primary}55`,
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
		},
		list: {
			marginBottom: DEFAULT_GAP,
			borderRadius: 10
		},
		listSeparator: {
			height: DEFAULT_GAP
		},
		listEntryContainer: {
			backgroundColor: theme.foreground,
			padding: DEFAULT_GAP,
			borderRadius: 14,
			flexDirection: 'row',
			alignItems: 'center'
		},
		listEntryCenter: {
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingLeft: DEFAULT_GAP,
			paddingRight: DEFAULT_GAP
		},
		listEntryIcon: {
			backgroundColor: `${theme.primary}55`,
			height: 36,
			width: 36,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 10,
			alignSelf: 'center'
		},
		removeButton: {
			backgroundColor: `${theme.bad}22`,
			width: 30,
			height: 30,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 10,
		},
		removeButtonIcon: {
			color: theme.bad
		},
		chipGroup: {
			flexDirection: 'row',
			gap: DEFAULT_GAP * 0.38,
			flexWrap: 'wrap',
			marginVertical: DEFAULT_GAP
		},
		chip: {
			borderWidth: 1,
			borderColor: `${theme.minorText}55`,
			backgroundColor: theme.foreground,
			paddingHorizontal: DEFAULT_GAP * 0.8,
			paddingVertical: DEFAULT_GAP * 0.4,
			borderRadius: 10
		},
		selectedChip: {
			borderWidth: 1,
			borderColor: theme.primary,
			backgroundColor: `${theme.primary}22`,
			paddingHorizontal: DEFAULT_GAP * 0.8,
			paddingVertical: DEFAULT_GAP * 0.4,
			borderRadius: 10,
		},
		textInput: {
			color: theme.text,
			paddingVertical: DEFAULT_GAP * 0.8,
			paddingHorizontal: DEFAULT_GAP * 0.68,
			marginVertical: DEFAULT_GAP * 0.75,
			borderRadius: 12,
			borderWidth: 1,
			borderColor: `${theme.minorText}55`,
		},
		stackHeader: {
			flexDirection: 'row',
			gap: DEFAULT_GAP,
			alignItems: 'center'
		},
		listLike: {
			gap: DEFAULT_GAP * 0.5
		}
	})
}

