import { View, FlatList, TouchableOpacity, Text } from 'react-native'
import { COLORS, SIZES } from '../../constants/Theme'

interface JobTabsProps {
    tabs: string[],
    activeTab: string,
    setActiveTab: (item: any) => void
}

const TabButton = ({ name, activeTab, onHandleSearchType }: any) => {
    return (
        <TouchableOpacity
            style={{
                padding: SIZES.padding,
                borderRadius: 10,
                backgroundColor: activeTab == name ? COLORS.darkgreen : COLORS.gray
            }}
            onPress={onHandleSearchType}
        >
            <Text style={{ color: activeTab == name ? COLORS.white : COLORS.lightGray, fontWeight: 'bold' }}>{name}</Text>
        </TouchableOpacity>
    )
}

const JobTabs = ({ tabs, activeTab, setActiveTab }: JobTabsProps) => {

    return (
        <View style={{ flex: 1, alignSelf: 'center', margin: 5 }}>
            <FlatList
                data={tabs}
                renderItem={({ item }) => {
                    return (
                        <TabButton
                            name={item}
                            activeTab={activeTab}
                            onHandleSearchType={() => setActiveTab(item)}
                        />
                    )
                }}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ columnGap: SIZES.base }}
            />
        </View>
    )
}

export default JobTabs