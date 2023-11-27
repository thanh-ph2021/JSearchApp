import { View, FlatList, TouchableOpacity, Text } from 'react-native'
import { COLORS, SIZES } from '../../constants/Theme'

interface JobAboutProps {
    info: string,
}

const JobAbout = ({ info }: JobAboutProps) => {

    return (
        <View style={{margin: 5}}>
            <Text style={{fontSize: SIZES.h3, fontWeight: 'bold', paddingBottom: 10}}>About a job:</Text>
            <View>
                <Text>{info}</Text>
            </View>
        </View>
    )
}

export default JobAbout