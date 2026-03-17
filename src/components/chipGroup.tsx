import { getCommonStyle } from '../styles/common';
import { useTheme } from '../hooks/useTheme.ts';
import { useState } from 'react';
import { View, Pressable } from 'react-native';
import FText from './ftext';

export type ChipProps = {
	id: number;
	emoji: string;
	text: string;
};

type ChipGroupProps = {
	data: ChipProps[];
	onSelectChip?: (selectedChipData: ChipProps) => void;
	defaultSelectedIndex?: number;
};

export default function ChipGroup({
	data,
	onSelectChip,
	defaultSelectedIndex = 0
}: ChipGroupProps) {
	const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex);
	const { theme, isDarkMode, toggleTheme } = useTheme();
	const common = getCommonStyle(theme);
	return ( 
		<View style={common.chipGroup}>
			{data.map((item, index) => (
				<Pressable 
					key={item.id}
					style={index === selectedIndex ? common.selectedChip : common.chip}
					onPress={()=>{ setSelectedIndex(index); onSelectChip(data[index]) }}
				>
					<FText 
						style={{
							fontSize: 13,
							color: index === selectedIndex ? theme.primary : theme.text
						}}
					>
						{item.emoji} {item.text}
					</FText>
				</Pressable>
			))}
		</View>
		   );
}
