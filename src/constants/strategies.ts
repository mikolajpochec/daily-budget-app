import { PickerItem } from '../components/listPicker.tsx';

export const strategies: PickerItem[] = [
	{
		id: 'subtract',
		iconName: 'arrow-down',
		title: 'Subtract from tomorrow',
		description: 'Overspend by 20 today, tomorrow\'s budget shrinks by 20.',
	},
	{
		id: 'recalculate',
		iconName: 'refresh',
		title: 'Recalculate daily',
		description: 'Remaining monthly budget divided by remaining days. Rebalances every morning.',
	},
];
