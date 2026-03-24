import { StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';

export const BASE_GAP = 16;

export const getCommonStyle = (theme) => {
	return StyleSheet.create({
		mainView: {
			paddingTop: StatusBar.currentHeight + BASE_GAP * 1.25,
			paddingHorizontal: BASE_GAP * 1.5,
			paddingBottom: BASE_GAP * 1.5,
			backgroundColor: theme.background,
			gap: BASE_GAP,
			flex: 1
		},
		apart: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
		},
		halfGap: {
			gap: BASE_GAP / 2
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
			paddingHorizontal: BASE_GAP,
			paddingVertical: BASE_GAP * 1.25,
			overflow: 'hidden'
		},
		lessPaddingForPanel:{
			borderRadius: 12,
			paddingVertical: BASE_GAP,
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
			gap: BASE_GAP / 2
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
		buttonDangerous: {
			backgroundColor: theme.bad
		},
		bottomMargin: {
			marginBottom: BASE_GAP
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
			padding: BASE_GAP
		},
		numInputContainer: {
			flexDirection: 'row',
			borderBottomWidth: 1,
			borderBottomColor: theme.primary,
			alignItems: 'center',
			marginBottom: BASE_GAP
		},
		numInput: {
			fontFamily: 'Bricolage Grotesque Bold',
			color: theme.text,
			flex: 1,
		},
		list: {
			marginBottom: BASE_GAP,
			borderRadius: 10
		},
		listSeparator: {
			height: BASE_GAP * 0.65
		},
		listEntryContainer: {
			backgroundColor: theme.foreground,
			padding: BASE_GAP * 0.8,
			borderRadius: 14,
			flexDirection: 'row',
			alignItems: 'center'
		},
		listEntryCenter: {
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingLeft: BASE_GAP,
			paddingRight: BASE_GAP
		},
		listEntryIcon: {
			//backgroundColor: `${theme.primary}55`,
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
			gap: BASE_GAP * 0.38,
			flexWrap: 'wrap',
			marginVertical: BASE_GAP
		},
		chip: {
			borderWidth: 1,
			borderColor: `${theme.minorText}55`,
			backgroundColor: theme.foreground,
			paddingHorizontal: BASE_GAP * 0.8,
			paddingVertical: BASE_GAP * 0.4,
			borderRadius: 10
		},
		selectedChip: {
			borderWidth: 1,
			borderColor: theme.primary,
			backgroundColor: `${theme.primary}22`,
			paddingHorizontal: BASE_GAP * 0.8,
			paddingVertical: BASE_GAP * 0.4,
			borderRadius: 10,
		},
		textInput: {
			color: theme.text,
			paddingVertical: BASE_GAP * 0.8,
			paddingHorizontal: BASE_GAP * 1.25,
			marginVertical: BASE_GAP * 0.75,
			borderRadius: 12,
			borderWidth: 1,
			borderColor: `${theme.minorText}55`,
			fontFamily: 'Bricolage Grotesque',
		},
		stackHeader: {
			flexDirection: 'row',
			gap: BASE_GAP,
			alignItems: 'center'
		},
		listLike: {
			gap: BASE_GAP * 0.5
		},
		bigText: {
			fontSize: 38,
		},
		centerOnScreen: {
			flex: 1,
			justifyContent: 'center',
		},
		stepIndicator: {
			width: 6,
			height: 6,
			borderRadius: '50%',
			backgroundColor: theme.secondaryText
		},
		stepIndicatorSelected: {
			width: 20,
			height: 6,
			borderRadius: 3,
			backgroundColor: theme.primary
		},
		bigSeparatorVertical: {
			height: BASE_GAP * 2
		},
		icons: {
			flexDirection: 'row',
			gap: BASE_GAP / 2
		}
	})
}

