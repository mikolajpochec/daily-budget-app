import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { TouchableOpacity, View } from 'react-native';
import { getCommonStyle } from '../styles/common';
import { useTheme } from '../hooks/useTheme';

type RemoveButtonProps = {
	onPress?: () => void;
};

export default function RemoveButton({onPress}: RemoveButtonProps) {
	const { theme, isDarkMode, toggleTheme } = useTheme();
	const common = getCommonStyle(theme);
	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.7}>
			<View style={common.removeButton}>
				<Feather
					style={common.removeButtonIcon}
					size={common.removeButton.width * 0.45}
					name='x'
				/>
			</View>
		</TouchableOpacity>
	);
}
