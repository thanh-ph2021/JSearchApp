import { TouchableOpacity, Text, View, Image } from 'react-native'
import { JobResponseModel } from '../models/JobResponseModel'
import { COLORS, SIZES } from '../constants/Theme'
import { checkImageURL } from '../utils'

interface NearbyJobCardModel {
    job: JobResponseModel,
    handleNavigate: () => void
}

const NearbyJobCard = ({ job, handleNavigate }: NearbyJobCardModel) => {
    return (
        <TouchableOpacity style={{ margin: SIZES.base, padding: SIZES.base, borderRadius: SIZES.base, flexDirection: 'row', backgroundColor: 'white', elevation: 3 }} onPress={handleNavigate}>
            {/* employer */}
            <TouchableOpacity style={{ backgroundColor: COLORS.lightGray, borderRadius: SIZES.base, width: 50, height: 50 }}>
                <Image
                    source={{ uri: job.employer_logo ? job.employer_logo : 'https://upload.wikimedia.org/wikipedia/commons/3/33/Vanamo_Logo.png' }}
                    resizeMode='contain'
                    style={{ width: 50, height: 50, borderRadius: SIZES.base }}
                />
            </TouchableOpacity>

            {/* job title */}
            <View style={{justifyContent: 'center', paddingLeft: SIZES.base, width: '85%'}}>
                <Text numberOfLines={1} style={{flexShrink: 1, width: '100%'}}>{job.job_title}</Text>
                <Text style={{ color: 'gray' }}>{job.job_employment_type}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default NearbyJobCard