import { LegacyRef } from "react";
import { StyleProp, TextInput, ViewStyle } from "react-native";

export interface InputProps {
    containerStyles?: StyleProp<ViewStyle>,
    titleStyles?: ViewStyle,
    inputStyles?: ViewStyle,
    value: string,
    onChangeText?: (text: string) => void,
    title: string,
    editable?: boolean
    Icon?: () => JSX.Element,
    onPress?: () => void,
    isLoading?: boolean,
    onSubmitEditing?: () => void
}