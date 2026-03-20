import React, { forwardRef, useCallback, useState } from 'react';
import { View } from 'react-native';
import { getCommonStyle } from '../styles/common';
import { useTheme } from '../hooks/useTheme';
import FText from './ftext';
import FTextBold from './ftextBold';
import Button from './button';
import ChipGroup from './chipGroup';
import {
	BottomSheetModal,
	BottomSheetView,
	BottomSheetTextInput
} from '@gorhom/bottom-sheet';
import { categories } from '../constants/categories.ts';

const ExpenseModal = forwardRef(({ currency, onSubmit }: any, ref: any) => {
	const { theme } = useTheme();
	const common = getCommonStyle(theme);
	const [amount, setAmount] = useState('');
	const [description, setDescription] = useState('');
	const [selectedId, setSelectedId] = useState(0);

	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
	}, []);

	return (
		<BottomSheetModal
			ref={ref}
			onChange={handleSheetChanges}
			backgroundStyle={common.modalHandle}
			handleIndicatorStyle={common.modalHandleIndicator}
		>
			<BottomSheetView style={common.modal}>
				<FTextBold style={common.headerText}>Add expense</FTextBold>

				<View style={common.numInputContainer}>
					<FTextBold 
						style={[common.bigText, {color: theme.minorText}]}
					>
						{currency}
					</FTextBold>
					<BottomSheetTextInput
						style={[common.numInput, common.bigText]}
						keyboardType="decimal-pad"
						placeholder="0.00"
						placeholderTextColor={theme.minorText}
						paddingBottom={0}
						paddingTop={0}
						onChangeText={setAmount}
					/>
				</View>

				<FText style={common.secondaryText}>CATEGORY</FText>

				<ChipGroup
					data={categories}
					onSelectChip={({ id }: any) => setSelectedId(id)}
					defaultSelectedIndex={0}
				/>

				<FText style={common.secondaryText}>
					DESCRIPTION <FText style={common.minorText}>(optional)</FText>
				</FText>
				<BottomSheetTextInput
					style={common.textInput}
					placeholder="e.g. Lunch at cafe"
					placeholderTextColor={theme.minorText}
					padding={0}
					onChangeText={setDescription}
					maxLength={20}
				/>

				<Button
					style={common.bottomMargin}
					text='Save'
					onPress={
						() => {
							onSubmit({ 
								amount: amount, 
								categoryText: categories[selectedId].text,
								description: description
							});
							ref.current?.dismiss();
						}
					}
					disabled={ isNaN(parseInt(amount)) }
				/>
			</BottomSheetView>
		</BottomSheetModal>
	);
});

export default ExpenseModal;
