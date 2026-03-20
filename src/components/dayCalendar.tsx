import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { BASE_GAP } from '../styles/common';
import FText from './ftext';

interface DayCalendarProps {
	selectedDay: number;
	onDaySelect?: (day: number) => void;
}

const DAYS = Array.from({ length: 28 }, (_, i) => i + 1);
const COLUMNS = 7;
const ROWS = DAYS.length / COLUMNS;

export default function DayCalendar({ selectedDay, onDaySelect }: DayCalendarProps) {
	const { theme } = useTheme();

	return (
		<View style={styles.grid}>
			{Array.from({ length: ROWS }, (_, row) => (
				<View key={row} style={styles.row}>
					{DAYS.slice(row * COLUMNS, row * COLUMNS + COLUMNS).map((day) => (
						<TouchableOpacity
							key={day}
							onPress={() => onDaySelect?.(day)}
							style={[
								styles.cell,
								{ borderColor: `${theme.minorText}55`, backgroundColor: theme.foreground },
								selectedDay === day && [
									styles.cellSelected,
									{ backgroundColor: theme.primary, borderColor: theme.primary },
								],
							]}
						>
							<FText style={[
								styles.cellText,
								{ color: theme.secondaryText },
								selectedDay === day && {
									color: theme.background,
									fontFamily: 'Bricolage Grotesque Bold'
								},
							]}>
								{day}
							</FText>
						</TouchableOpacity>
					))}
				</View>
			))}
		</View>
	);
}

export const styles = StyleSheet.create({
	grid: {
		gap: BASE_GAP * 0.2,
	},
	row: {
		flexDirection: 'row',
		gap: BASE_GAP * 0.2,
	},
	cell: {
		flex: 1,
		aspectRatio: 1,
		borderRadius: 8,
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cellSelected: {
		borderRadius: 8,
		borderWidth: 1,
	},
	cellText: {
		fontSize: 13,
	},
});
