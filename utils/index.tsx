import { Platform, TouchableOpacity } from 'react-native'
import { Svg } from 'react-native-svg'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const checkImageURL = (uri: string) => {
    if (!uri) return false
    else {
        const pattern = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg\bmp|gif|webp)$', 'i')

        return pattern.test(uri)
    }
}

export const ChartView = Platform.OS == 'android' ? Svg : TouchableOpacity;

/**
 * formatMoney(number, n, x, s, c)
 * 
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */
export function formatMoney(number: number, n: number, x?: number, s?: string, c?: string) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = number.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));

}

// Save data to AsyncStorage
export const saveData = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(`@${key}`, value);
        console.log('Data saved successfully!');
    } catch (error) {
        console.error('Error saving data:', error);
    }
};

// Retrieve data from AsyncStorage
export const retrieveData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(`@${key}`);
        if (value !== null) {
            console.log('Retrieved data:', value);
        } else {
            console.log('No data found');
        }
    } catch (error) {
        console.error('Error retrieving data:', error);
    }
};

// Remove data from AsyncStorage
export const removeData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(`@${key}`);
        console.log('Data removed successfully!');
    } catch (error) {
        console.error('Error removing data:', error);
    }
};

export const RAPID_API_KEY=''