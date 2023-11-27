import { TouchableOpacity, Text, View, Image, FlatList } from 'react-native'
import { JobResponseModel } from '../models/JobResponseModel'
import { COLORS, SIZES } from '../constants/Theme'

interface PopularJobCardModel {
    item: JobResponseModel,
    selectedJob: string[],
    handleCardPress: () => void
}

const PopularJobCard = ({ item, selectedJob, handleCardPress }: PopularJobCardModel) => {
    return (
        <TouchableOpacity
            style={{
                marginVertical: SIZES.base,
                marginRight: SIZES.base,
                padding: SIZES.base,
                borderRadius: SIZES.radius,
                width: SIZES.width * 0.6,
                elevation: 3,
                backgroundColor: selectedJob.includes(item.job_id) ? COLORS.lightGray : 'white'
            }}
            onPress={handleCardPress}>
            {/* employer */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity style={{ backgroundColor: COLORS.lightGray, borderRadius: SIZES.base, width: 50, height: 50 }}>
                    <Image
                        source={{ uri: item.employer_logo ? item.employer_logo : 'https://upload.wikimedia.org/wikipedia/commons/3/33/Vanamo_Logo.png' }}
                        resizeMode='contain'
                        style={{ width: 50, height: 50, borderRadius: SIZES.base }}
                    />
                </TouchableOpacity>
                <View style={{paddingHorizontal: SIZES.base, width: '75%'}}>
                    <Text style={{fontWeight: 'bold'}} numberOfLines={1}>{item.employer_name}</Text>
                    <Text>{item.job_employment_type.toLowerCase()}</Text>
                </View>
            </View>
            {/* job title */}
            <View style={{paddingVertical: 5}}>
                <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: SIZES.h3 }}>{item.job_title}</Text>
                <Text>{item.job_city}, {item.job_country}</Text>
            </View>

        </TouchableOpacity>
    )
}

export default PopularJobCard