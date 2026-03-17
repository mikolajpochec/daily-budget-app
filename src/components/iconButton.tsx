import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { getCommonStyle } from '../styles/common';
import { useTheme } from '../hooks/useTheme';

export type IconButtonProps = {
	iconName: string,
	onPress?: () => void;
};

export default function IconButton({iconName, onPress}: IconButtonProps) {
	const { theme, isDarkMode, toggleTheme } = useTheme();
	const common = getCommonStyle(theme);
	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.7}>
			<View style={common.iconButton}>
				<Ionicons
					style={common.iconButtonIcon}
					size={common.iconButton.width * 0.45}
					name={iconName} 
				/>
			</View>
		</TouchableOpacity>
	);
}
