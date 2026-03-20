import React, { useEffect } from 'react';
import { View } from 'react-native';

interface StepsViewProps {
	step: number;
    children: React.ReactNode[];
	onStepsNumberExceeded?: () => void;
}

export default function StepsView({ step, children, onStepsNumberExceeded } : StepsViewProps) {
	const isStepCorrectValue = step < children.length && step >= 0;
	useEffect(() => {
		if(step >= children.length && onStepsNumberExceeded !== undefined) {
			onStepsNumberExceeded();
		}
	}, [step]);
	return (
		<View>
			{isStepCorrectValue ? children[step] : <View/> }
		</View>
	);
}
