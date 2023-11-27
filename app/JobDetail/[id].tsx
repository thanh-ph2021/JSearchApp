import { View, Text, SafeAreaView, ScrollView, RefreshControl, ActivityIndicator, Share, Alert } from 'react-native'
import { useLocalSearchParams, useRouter, Stack } from 'expo-router'
import { COLORS, SIZES } from '../../constants/Theme'
import useFetch from '../../hook/useFetch'
import ScreenHeaderBtn from '../../components/ScreenHeaderBtn'
import { useState } from 'react'
import Company from '../../components/jobdetails/Company'
import JobTabs from '../../components/jobdetails/JobTabs'
import Specifics from '../../components/jobdetails/Specifics'
import JobAbout from '../../components/jobdetails/JobAbout'
import JobFooter from '../../components/jobdetails/JobFooter'

const tabs = ['About', 'Qualifications', 'Responsibilities']

const JobDetail = () => {

    const params = useLocalSearchParams()
    const router = useRouter()
    const [refreshing, setRefreshing] = useState(false)
    const [activeTab, setActiveTab] = useState(tabs[0])
    const [isSaved, setIsSaved] = useState(false)

    const { data, isLoading, error, refetch } = useFetch('job-details', {
        job_id: params.id
    })

    const onRefresh = () => {
        refetch()
    }

    function displayTabContent() {
        switch (activeTab) {
            case 'About':
                return (
                    <JobAbout info={data[0]?.job_description ?? 'No data provided'} />
                )
            case 'Qualifications':
                return (
                    <Specifics
                        title={activeTab}
                        points={data[0]?.job_highlights.Qualifications ?? ['N/A']}
                    />
                )
            case 'Responsibilities':
                return (
                    <Specifics
                        title={activeTab}
                        points={data[0]?.job_highlights.Responsibilities ?? ['N/A']}
                    />
                )
            default:
                break;

        }

    }

    const shareLink = async () => {
        try {
            const result = await Share.share({
              message: data[0]?.job_google_link ?? data[0]?.job_apply_link,
            });
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
              } else {
                // shared
              }
            } else if (result.action === Share.dismissedAction) {
              // dismissed
            }
          } catch (error: any) {
            Alert.alert(error.message);
          }
    };

    const onHandleSave = () => {  
        setIsSaved(!isSaved)
    }

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1, padding: 10 }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.white },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconName='chevron-left' color={'black'} handlePress={() => router.back()} />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconName='share-2' color={'black'} handlePress={() => shareLink()} />
                    ),
                }}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {isLoading ? (
                    <ActivityIndicator size={'large'} color='red' />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : data.length === 0 ? (
                    <Text>No data</Text>
                ) : (
                    <View>
                        <Company
                            companyLogo={data[0].employer_logo}
                            jobTitle={data[0].job_title}
                            companyName={data[0].employer_name}
                            location={data[0].job_country}
                        />
                        <JobTabs
                            tabs={tabs}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                        {displayTabContent()}
                    </View>
                )}
            </ScrollView>
            <JobFooter url={data[0]?.job_google_link ?? data[0]?.job_apply_link} isSaved={isSaved} onHandleSave={onHandleSave} />

        </SafeAreaView>
    )
}

export default JobDetail