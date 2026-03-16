import { TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';
import { getCommonStyle } from '../styles/common';
import { useTheme } from '../hooks/useTheme';
import FTextBold from '../components/ftextBold';

type ButtonProps = {
	onPress?: () => void,
		text: string,
	style?: StyleProp<ViewStyle>,
	disabled: boolean
};

export default function Button({onPress, text, style, disabled}: ButtonProps) {
	const { theme, isDarkMode, toggleTheme } = useTheme();
	const common = getCommonStyle(theme);
	return (
		<TouchableOpacity 
			onPress={onPress} 
			activeOpacity={0.7}
			accessibilityState={{ disabled: disabled }}
		>
			<View style={[disabled ? common.buttonDisabled: common.button, style]}>
				<FTextBold style={{ color: theme.foreground }}>
					{text}
				</FTextBold>
			</View>
		</TouchableOpacity>
	);
}

