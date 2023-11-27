import { useState } from 'react'
import { View, Text, ActivityIndicator, FlatList, ListRenderItemInfo, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import useFetch from '../hook/useFetch'
import PopularJobCard from './PopularJobCard'
import { JobResponseModel } from '../models/JobResponseModel'
import { COLORS, SIZES } from '../constants/Theme'
import { SearchFilterData } from '../utils/data'

const tabsJobTitle = SearchFilterData.job_titles.map(m => m.name)

const PopularJobs = () => {

    const router = useRouter()
    const [listSelected, setListSelected] = useState<string[]>([])
    const [tabJobChoose, setTabJobChoose] = useState(tabsJobTitle[0])

    const { data, isLoading, error, fetchData } = useFetch('search', {
        query: tabsJobTitle[0],
        page: '1',
        num_pages: '1'
    })

    function renderItem({ item }: ListRenderItemInfo<string>) {
        const handlePressTypeJob = () => {
            setTabJobChoose(item)
            fetchData({query: item})
            // router.push(`/search/${item}`)
        }

        return (
            <TouchableOpacity
                style={{
                    padding: SIZES.padding,
                    borderRadius: 10,
                    backgroundColor: tabJobChoose == item ? COLORS.darkgreen : COLORS.gray
                }}
                onPress={handlePressTypeJob}>
                <Text style={{ color: tabJobChoose == item ? COLORS.white : COLORS.lightGray, fontWeight: 'bold' }}>{item}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <View style={{ marginVertical: SIZES.base }}>
                <FlatList
                    horizontal
                    data={tabsJobTitle}
                    keyExtractor={(item, index) => item + index}
                    renderItem={renderItem}
                    contentContainerStyle={{ columnGap: SIZES.base }}
                />
            </View>
            <View style={{ minHeight: 100 }}>
                {/* card job */}
                <View>
                    {isLoading ? (
                        <ActivityIndicator size="large" color={'red'} style={{ alignContent: 'center', height: 100 }} />
                    ) : error ? (
                        <Text>Something went wrong</Text>
                    ) : (
                        <FlatList
                            data={data}
                            renderItem={({ item }: ListRenderItemInfo<JobResponseModel>) => {
                                return (
                                    <PopularJobCard
                                        item={item}
                                        handleCardPress={() => {
                                            setListSelected([...listSelected, item.job_id])
                                            router.push(`/JobDetail/${item.job_id}`)
                                        }}
                                        selectedJob={listSelected}
                                    />
                                )
                            }}
                            keyExtractor={(item, index) => `${item}` + index}
                            contentContainerStyle={{ columnGap: SIZES.base }}
                            horizontal
                        />
                    )}
                </View>
            </View>
        </View>
    )
}

export default PopularJobs