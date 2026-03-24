import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

function displayErrorAlert(msg) {
	Alert.alert('Error', `Message: ${msg}`, [{
		text: 'Dismiss',
		onPress: () => console.error(msg)
	}
	]);
}

export async function setKey(key: string, value: any): void {
	try {
		await AsyncStorage.setItem(key, value);
		console.log(`Key '${key}' set to value '${value}'.`);
	} catch(e) {
		displayErrorAlert(e.message);
	}
}

export async function getValue(key: string): string | null {
	try {
		const value = await AsyncStorage.getItem(key);
		return value;
	} catch(e) {
		//displayErrorAlert(e.message);
		return null;
	}
}

export async function clearStorage() {
	await AsyncStorage.clear();
}
