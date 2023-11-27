import { LegacyRef, useRef } from 'react'
import { COLORS, SIZES } from '../../constants/Theme'
import { InputProps } from './styles'
import { View, TextInput, Text, TextInputProps, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Input({ containerStyles, inputStyles, titleStyles, value, onChangeText, title, editable, Icon, onPress, isLoading, onSubmitEditing }: InputProps) {

    const inputRef = useRef<any>()
    return (
        <View style={containerStyles}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderRadius: SIZES.base,
                borderColor: COLORS.gray,
                borderWidth: 1,
                padding: SIZES.base,
                alignItems: 'center'
            }}>
                {isLoading ? (
                    <ActivityIndicator size='small' color={COLORS.red} style={{marginTop: SIZES.base}} />
                ) : (
                    <TextInput
                        ref={inputRef}
                        style={{
                            ...inputStyles
                        }}
                        value={value}
                        onChangeText={onChangeText}
                        editable={editable}
                        numberOfLines={1}
                        onSubmitEditing={onSubmitEditing}
                    />
                )}
                {Icon && <TouchableOpacity onPress={onPress ? onPress : () => inputRef.current.focus()}><Icon /></TouchableOpacity>}
            </View>

            <Text
                style={{
                    position: 'absolute',
                    marginTop: -10,
                    backgroundColor: COLORS.white,
                    padding: 2,
                    paddingRight: 5,
                    ...titleStyles
                }}
            >
                {title}
            </Text>

        </View>

    )
}