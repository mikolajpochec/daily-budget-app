import { useState } from 'react';
import { View, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../src/hooks/useTheme';
import { getCommonStyle } from '../src/styles/common';
import FTextBold from '../src/components/ftextBold';
import FText from '../src/components/ftext.tsx';
import Button from '../src/components/button';
import StepsView from "../src/components/stepsView";
import StepIndicator from "../src/components/stepIndicator";
import ChipGroup, { ChipProps } from '../src/components/chipGroup';
import DayCalendar from '../src/components/dayCalendar';
import ListPicker from '../src/components/listPicker';
import { strategies } from '../src/constants/strategies.ts';
import { currencies } from '../src/constants/currencies';
import { setKey } from '../src/utils/storage';

export default function OnboardingScreen() {
	const STEP_GET_STARTED = 0;
	const STEP_MONTHLY_BUDGET = 1;
	const NUMBER_OF_STEPS = 3;

	const [step, setStep] = useState(STEP_GET_STARTED);
	const [currency, setCurrency] = useState(currencies[0].text);
	const [otherCurrency, setOtherCurrency] = useState(currencies[0].text);
	const [monthlyBudget, setMonthlyBudget] = useState('');
	const [startDay, setStartDay] = useState(1);
	const [strategy, setStrategy] = useState(strategies[0].id);
	const { theme } = useTheme();
	const common = getCommonStyle(theme);
	const router = useRouter();

	const getRealCurrency = () => {
		if(currency !== "OTHER") return currency;
		else return otherCurrency;
	};

	const handleStepsNumberExceeded = async () => {
		await setKey('monthly-budget', monthlyBudget);
		await setKey('currency', getRealCurrency().toUpperCase());
		await setKey('start-day', `${startDay}`);
		await setKey('strategy', strategy);
		await setKey('onboarded', 'true');
		router.navigate('/');
	};

	const getButtonText = () => {
		if(step === STEP_GET_STARTED) return "Get started";
		else if(step === NUMBER_OF_STEPS) return "Start tracking →";
		else return "Continue";
	};

	const OnboardingHeader = ({ text1, text2 }) => {
		return (
			<View>
				<FTextBold style={ common.bigText }>{text1}</FTextBold>
				<FTextBold style={[ 
					common.bigText, 
					{ 
						color: theme.primary, 
						marginTop: -common.bigText.fontSize * 0.5
					} 
				]}>
					{text2}
				</FTextBold>
			</View>
		);
	}

	// Android solution is to use pan mode from app.json 
	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
		>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				keyboardShouldPersistTaps="handled"
			>
				<View style={ [common.mainView ]}>
					<FTextBold style={[
						common.headerText, 
						common.boldText,
						{ color: theme.primary }
					]}>
						Daily Budget
					</FTextBold>
					<View style={ common.centerOnScreen }>
						<View style={ common.bottomMargin }>
							<StepIndicator step={ step } numberOfSteps={NUMBER_OF_STEPS}/>
						</View>
						<StepsView 
							step={ step } 
							onStepsNumberExceeded={ handleStepsNumberExceeded }
						>
							<View>
								<OnboardingHeader 
									text1={'Your money,'} 
									text2={'day by day.'}
								/>
								<FText style={{ color: theme.secondaryText }}>
									Set your monthly budget and let Daily Budget
									figure out how much you can spend each day
									— adjusting automatically when life happens.
								</FText>
							</View>
							<View>
								<OnboardingHeader 
									text1={'What\'s your'} 
									text2={'monthly budget?'}
								/>
								<FText style={{ color: theme.secondaryText }}>
									The total you'd like to spend this month.
									We'll split it into daily allowances automatically.
								</FText>
								<View style={common.bigSeparatorVertical}/>
								<FText style={ common.secondaryText }>MONTHLY BUGET</FText>
								<TextInput
									style={[ 
										common.textInput, 
										common.bigText,
										{ backgroundColor: theme.foreground, fontWeight: 'bold' } 
									]}
									placeholder={`${0} ${getRealCurrency()}`}
									placeholderTextColor={theme.minorText}
									keyboardType="numeric"
									onChangeText={setMonthlyBudget}
								/>
								<FText style={ common.secondaryText }>CURRENCY</FText>
								<ChipGroup 
									data={currencies}
									onSelectChip={(chipData) => { setCurrency(chipData.text) }}
								/>
								{currency === 'OTHER' && (
									<View>
										<FText style={ common.secondaryText }>ENTER YOUR CURRENCY</FText>
										<TextInput
											value={otherCurrency}
											style={[ common.textInput, { backgroundColor: theme.foreground } ]}
											maxLength={3}
											placeholderTextColor={theme.minorText}
											onChangeText={setOtherCurrency}
										/>
									</View>
								)}
							</View>
							<View>
								<OnboardingHeader 
									text1={'When does'} 
									text2={'your month start?'}
								/>
								<FText style={{ color: theme.secondaryText }}>
									Pick the day your budget resets — usually your payday.
								</FText>
								<View style={common.bigSeparatorVertical}/>
								<FText style={ common.secondaryText }>START DAY</FText>
								<DayCalendar selectedDay={startDay} onDaySelect={setStartDay}/>
							</View>
							<View>
								<OnboardingHeader 
									text1={'When you go'} 
									text2={'over budget...'}
								/>
								<FText style={{ color: theme.secondaryText }}>
									How should Daily Budget handle overspending?
									You can change this later in settings.
								</FText>
								<View style={common.bigSeparatorVertical}/>
								<ListPicker
									items={strategies}
									selectedId={strategy}
									onSelect={setStrategy}
								/>
							</View>
						</StepsView>
					</View>
					<Button 
						text={ getButtonText() }
						disabled={ 
							step === STEP_MONTHLY_BUDGET 
							&& !parseInt(monthlyBudget) 
						}
						onPress={() => { 
							setStep(step + 1);
						}}
					/>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
