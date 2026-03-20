import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

function displayErrorAlert(msg) {
	Alert.alert('Error', `Message: ${msg}`, [{
		text: 'Dismiss',
		onPress: () => console.error(msg)
	}
	]);
}

export async function setKey(key, value) {
	try {
		await AsyncStorage.setItem(key, value);
	} catch(e) {
		displayErrorAlert(e.message);
	}
}

export async function getValue(key) {
	try {
		const value = await AsyncStorage.getItem(key);
		return value;
	} catch(e) {
		displayErrorAlert(e.message);
	}
}
