
import { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, StyleSheet, ScrollView, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import { COLORS, SIZES } from '../../constants/Theme';
import ScreenHeaderBtn from '../../components/ScreenHeaderBtn';
import useFetch from '../../hook/useFetch';
import NearbyJobCard from '../../components/NearbyJobCard';
import axios from 'axios';
import { JobResponseModel } from '../../models/JobResponseModel';
import { SearchData } from '../../utils/data';



const SearchScreen = () => {

  const router = useRouter()
  const params = useLocalSearchParams()
  const [isLoadNextPage, setIsLoadNextPage] = useState(false)
  const [refreshing, setRefeshing] = useState(false)
  const [page, setPage] = useState(1)
  // const [data, setData] = useState<JobResponseModel[]>([])
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const searchData = async (query?: any, isLoadNextPage?: boolean) => {
    const options = {
      method: 'GET',
      url: `https://jsearch.p.rapidapi.com/search`,
      headers: {
        // 'X-RapidAPI-Key': '813af22005msh81cd639b88520abp1d4922jsna6e8dd4f2322',
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      },
      params: query ?? { query: params.id, page: page },
    }
    setIsLoading(isLoadNextPage ? false : true)

    // example data
    setData(SearchData)

    setTimeout(() => {
      setIsLoading(false);
    }, 1000)

    // try {
    //   const response = await axios.request(options)
    //   setData([...data, ...response.data.data])
    //   setIsLoading(false)
    // } catch (error: any) {
    //   setError(error.message)
    // } finally {
    //   setIsLoading(false)
    // }
  }

  const handleEndReached = () => {
    if (!isLoadNextPage) {
      setIsLoadNextPage(true)
      setPage(prev => prev + 1)
      searchData({ query: params.id, page: page + 1 }, true)
    }
  }

  const onRefresh = () => {
    searchData()
  }

  useEffect(() => {
    searchData()
  }, [])

  useEffect(() => {
    setIsLoadNextPage(false)
  }, [data])

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1, paddingHorizontal: 10 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.white },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconName='chevron-left' color={'black'} handlePress={() => router.back()} />
          ),
          title: ''
        }}
      />
      <View>
        {isLoading ? (
          <ActivityIndicator size={'large'} color='red' />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : data.length === 0 ? (
          <Text>No data</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <NearbyJobCard
                  job={item}
                  handleNavigate={() => router.push(`/JobDetail/${item.job_id}`)}
                />
              )
            }}
            keyExtractor={(item, index) => item.job_id + index}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            contentContainerStyle={{ rowGap: SIZES.base, paddingHorizontal: SIZES.base }}
            ListHeaderComponent={() => {
              return (
                <View>
                  <Text style={{ fontSize: SIZES.h2, fontWeight: 'bold' }}>{params.id}</Text>
                </View>
              )
            }}
            ListFooterComponent={() => {
              return (
                <ActivityIndicator size={'small'} color={COLORS.red} />
              )
            }}
            onEndReached={handleEndReached}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default SearchScreen
