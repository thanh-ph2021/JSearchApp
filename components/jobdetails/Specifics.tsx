import { View, FlatList, TouchableOpacity, Text } from 'react-native'
import { COLORS, SIZES } from '../../constants/Theme'
import { Feather } from '@expo/vector-icons'

interface SpecificsProps {
    title: string,
    points: string[]
}

const Specifics = ({ title, points }: SpecificsProps) => {

    return (
        <View style={{margin: 5}}>
            <Text style={{fontSize: SIZES.h3, fontWeight: 'bold', paddingBottom: 10}}>{title}:</Text>
            {points.map((item, index) => {
                return (
                    <View style={{flexDirection: 'row', alignItems: 'center'}} key={item+index}>
                        <Feather name='check-circle' color={COLORS.darkgreen} size={SIZES.base*2}/>
                        <Text style={{color: COLORS.black, padding: 10}}>{item}</Text>
                    </View>
                )
            })}
        </View>
    )
}

export default Specifics