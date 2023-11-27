import { View, FlatList, TouchableOpacity, Text, Linking } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import { COLORS, SIZES } from '../../constants/Theme'

interface JobFooterProps {
    url: string,
    isSaved: boolean,
    onHandleSave: () => void
}

const JobFooter = ({url, isSaved, onHandleSave}: JobFooterProps) => {

    return (
        <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
                style={{ borderRadius: 10, borderWidth: 2, borderColor: COLORS.gray, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
                onPress={onHandleSave}
            >
                <Entypo name={isSaved ? 'heart' : 'heart-outlined'} color={COLORS.red} size={20} />

            </TouchableOpacity>

            <TouchableOpacity
                style={{ borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary, width: '85%' }}
                onPress={() => Linking.openURL(url)}
            >
                <Text style={{color: COLORS.white, fontWeight: 'bold', fontSize: SIZES.body3}}>Apply for job</Text>

            </TouchableOpacity>
        </View>
    )
}

export default JobFooter