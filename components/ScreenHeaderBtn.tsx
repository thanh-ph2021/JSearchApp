import Feather from '@expo/vector-icons/Feather'
import { COLORS } from '../constants/Theme'
import { TouchableOpacity } from 'react-native'

const ScreenHeaderBtn = ({iconName, color, handlePress}: any) => {
    return (
        <TouchableOpacity
            style={{backgroundColor: COLORS.lightGray, borderRadius: 5, padding: 3, alignItems: 'center', justifyContent: 'center', width: 30, height: 30}}
            onPress={handlePress}
        >
            <Feather
                name={iconName}
                color={color}
                size={20}
            />
        </TouchableOpacity>

    )
}

export default ScreenHeaderBtn