import { View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { getCommonStyle } from '../styles/common';

interface StepIndicatorProps {
	step: number,
	numberOfSteps: number
};

export default function StepIndicator({step, numberOfSteps}: StepIndicatorProps) {
	const { theme } = useTheme();
	const common = getCommonStyle(theme);
	if(step > 0 && step <= numberOfSteps) {
		let children = [];
		for(let n = 1; n <= numberOfSteps; n++) {
			children.push(
				<View 
					key={n} 
					style={n === step ? common.stepIndicatorSelected : common.stepIndicator}
				/>
			);
		}
		return (<View style={{ flexDirection: 'row', gap: 3 }}>{children}</View>);
	}
	return (<View/>);
}
