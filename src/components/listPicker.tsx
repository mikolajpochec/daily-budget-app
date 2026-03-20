import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { getCommonStyle, BASE_GAP } from '../styles/common';
import FText from './ftext';
import FTextBold from './ftextBold';

export interface PickerItem {
	id: string;
	iconName: keyof typeof MaterialCommunityIcons.glyphMap;
	title: string;
	description: string;
}

interface StrategyPickerProps {
	items: PickerItem[];
	selectedId: string;
	onSelect?: (id: string) => void;
}

export default function StrategyPicker({ items, selectedId, onSelect }: StrategyPickerProps) {
	const { theme } = useTheme();
	const common = getCommonStyle(theme);

	return (
		<View style={common.listLike}>
			{items.map((item) => {
				const isSelected = item.id === selectedId;
				return (
					<TouchableOpacity
						key={item.id}
						onPress={() => onSelect?.(item.id)}
						style={[
							common.panel,
							styles.card,
							{ borderRadius: 18 },
							isSelected && { borderColor: theme.primary, backgroundColor: `${theme.primary}18` },
						]}
					>
						<View style={[
							styles.iconContainer
						]}>
							<MaterialCommunityIcons
								name={item.iconName}
								size={22}
								color={isSelected ? theme.primary : theme.secondaryText}
							/>
						</View>
						<View style={styles.body}>
							<FTextBold style={[common.boldText, styles.title]}>
								{item.title}
							</FTextBold>
							<FText style={common.secondaryText}>
								{item.description}
							</FText>
						</View>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: BASE_GAP,
		paddingVertical: BASE_GAP * 0.75,
	},
	iconContainer: {
		width: 36,
		height: 36,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
	body: {
		flex: 1,
	},
	title: {
		fontSize: 14,
	},
});
