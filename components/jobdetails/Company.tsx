import { View, Image, Text } from 'react-native'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import { COLORS, SIZES } from '../../constants/Theme'

interface CompanyProps {
    companyLogo: string,
    jobTitle: string,
    companyName: string,
    location: string
}

const Company = ({ companyLogo, jobTitle, companyName, location }: CompanyProps) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {/* company logo */}
            <View>
                <Image
                    source={{ uri: companyLogo ? companyLogo : 'https://upload.wikimedia.org/wikipedia/commons/3/33/Vanamo_Logo.png' }}
                    style={{ width: 60, height: 60 }}
                />
            </View>
            {/* job title */}
            <View>
                <Text style={{ fontSize: SIZES.h3, paddingTop: SIZES.base, textAlign: 'center', fontWeight: 'bold' }}>{jobTitle}</Text>
            </View>
            {/* company name / location */}
            <View style={{ flexDirection: 'row', paddingBottom: SIZES.base }}>
                <Text>
                    {companyName} /
                    <EvilIcons
                        name='location'
                        color={COLORS.gray}
                        size={15}
                    />
                </Text>
                <Text style={{ color: COLORS.gray }}>{location}</Text>
            </View>
        </View>
    )
}

export default Company