import { View, Text, ActivityIndicator, FlatList, ListRenderItemInfo, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import useFetch from '../hook/useFetch'
import PopularJobCard from './PopularJobCard'
import { JobResponseModel } from '../models/JobResponseModel'
import { SIZES, COLORS } from '../constants/Theme'
import NearbyJobCard from './NearbyJobCard'
import { SearchPopularJobs } from '../utils/data'

const NearbyJobs = () => {

    const router = useRouter()

    const { data, isLoading, error } = useFetch('search', {
        query: SearchPopularJobs,
        page: '1',
        num_pages: '1'
    })

    return (
        <View style={{ minHeight: 100 }}>
            {/* header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: SIZES.base }}>
                <Text style={{ fontSize: SIZES.h2, fontWeight: 'bold' }}>Popular jobs</Text>
                <TouchableOpacity onPress={() => router.push(`./search/${SearchPopularJobs}`)}>
                    <Text style={{opacity: 0.7}}>Show all</Text>
                </TouchableOpacity>
            </View>

            {/* card job */}
            <View style={{marginVertical: SIZES.base}}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={'red'} style={{ alignContent: 'center', height: 100 }} />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : (
                    data?.filter(m => m.job_id != null).map((job) => {
                        return (
                            <NearbyJobCard
                                job={job}
                                key={`nearby-job-${job.job_id}`}
                                handleNavigate={() => { router.push(`/JobDetail/${job.job_id}`) }}
                            />
                        )
                    })
                )}
            </View>

        </View>
    )
}

export default NearbyJobs