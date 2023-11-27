import { StyleSheet, SafeAreaView, View, FlatList, ListRenderItemInfo, Text, ActivityIndicator, ScrollView, Linking, Modal, Pressable } from 'react-native'
import { useRef, useEffect, useState } from 'react'
import { Stack, useRouter } from 'expo-router'
import { COLORS, SIZES } from '../../constants/Theme'
import { ChartView, formatMoney } from '../../utils'
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from 'victory-native'
import { EstimatedSalaryModel } from '../../models/EstimatedSalaryModel'
import { Input } from '../../components/Input'
import useFetch from '../../hook/useFetch'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { BlockStyle1 } from '../../components/StatististsBlocks'
import * as Location from 'expo-location';

export default function TabTwoScreen() {

  const router = useRouter()
  const { showActionSheetWithOptions } = useActionSheet()
  const [horizontal, setHorizontal] = useState(false)
  const [jobTitle, setJobtitle] = useState('React native developer')
  const [location, setLocation] = useState('UK')
  const [itemIndex, setItemIndex] = useState<number>(0)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [isLoadLocation, setIsLoadLocation] = useState<boolean>(false)
  const [barSelected, setBarSelected] = useState<{
    color: string,
    x: string,
    y: number,
    currency: string,
    period: string
  }>()
  const { data, isLoading, error, fetchData } = useFetch('estimated-salary', {
    job_title: jobTitle,
    location: location,
    radius: 100
  })

  useEffect(() => {
    setBarSelected(undefined)
  }, [itemIndex])

  useEffect(() => {
    searchData()
  }, [location])

  const checkPermission = async () => {
    setIsLoadLocation(true)
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      setModalVisible(!modalVisible)
      return;
    }
    // Get current location
    const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });

    // Perform reverse geocoding
    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    // Extract region information from reverse geocoding result
    if (reverseGeocode && reverseGeocode.length > 0) {
      setLocation(reverseGeocode[0].country ?? 'VietNam')
      setIsLoadLocation(false)
    }
  }

  useEffect(() => {
    // checkPermission()
  }, [])

  const searchData = () => {
    fetchData({
      job_title: jobTitle,
      location: location,
      radius: 100
    })
  }

  const handleSubmitEditing = () => {
    if (jobTitle) {
      searchData()
    }
  }

  const onPress = () => {
    const options = data.map(item => item.publisher_name);
    const icons = data.map(() => <Feather name='database' size={20} color={COLORS.black} />)

    showActionSheetWithOptions({
      options,
      containerStyle: {
        margin: 10,
        borderRadius: SIZES.base
      },
      icons: icons,
      cancelButtonIndex: -1
    }, (selectedIndex: number | undefined) => {
      selectedIndex != -1 && setItemIndex(selectedIndex ?? 0)
    });
  }

  const renderStatistics = (item: EstimatedSalaryModel) => {
    return (
      <View style={{ flexDirection: 'row', marginBottom: SIZES.base, justifyContent: 'space-between' }}>
        <BlockStyle1
          title='Min salary'
          salaryValue={item.min_salary}
          salaryCurrency={item.salary_currency}
          salaryPeriod={item.salary_period}
          Icon={() => <Feather name='minimize-2' color={COLORS.red} size={20} />}
        />
        <BlockStyle1
          title='Max salary'
          salaryValue={item.max_salary}
          salaryCurrency={item.salary_currency}
          salaryPeriod={item.salary_period}
          Icon={() => <Feather name='maximize-2' color={COLORS.red} size={20} />}
        />
        <BlockStyle1
          title='Median salary'
          salaryValue={item.median_salary}
          salaryCurrency={item.salary_currency}
          salaryPeriod={item.salary_period}
          Icon={() => <Feather name='minimize' color={COLORS.red} size={20} />}
        />
      </View>
    )
  }

  const renderChart = (item: EstimatedSalaryModel) => {

    const dataChart = [
      {
        x: 'Min',
        y: item.min_salary,
        color: COLORS.darkgreen,
        currency: item.salary_currency,
        period: item.salary_period
      },
      {
        x: 'Max',
        y: item.max_salary,
        color: COLORS.darkBlue,
        currency: item.salary_currency,
        period: item.salary_period
      },
      {
        x: 'Median',
        y: item.median_salary,
        color: COLORS.darkYellow,
        currency: item.salary_currency,
        period: item.salary_period
      },
    ]

    return (
      <View style={{ elevation: 3, borderRadius: 10, height: SIZES.height * 0.5, alignSelf: 'center' }}>
        {/*Tooltip biểu đồ */}
        {barSelected && (
          <View
            style={{
              position: 'absolute',
              backgroundColor: barSelected.color,
              zIndex: 2,
              top: 50,
              left: 0,
              right: 0,
              padding: 8,
              flex: 1,
              marginHorizontal: SIZES.base,
              borderRadius: SIZES.base,
              width: SIZES.width * 0.4
            }}>
            <Text style={{ alignSelf: 'flex-start', color: COLORS.white }}>
              {barSelected.x} salary:
            </Text>
            <Text style={{ alignSelf: 'flex-start', fontWeight: 'bold', color: COLORS.white }}>
              {formatMoney(barSelected.y, 0)} {barSelected.currency}/{barSelected.period}
            </Text>
          </View>
        )}

        {/* Header Chart */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: SIZES.base * 2, paddingVertical: SIZES.base, alignItems: 'center' }}>
          <View>

            <Text style={{ fontSize: SIZES.h2, fontWeight: 'bold' }}>Chart</Text>
            <Text style={{ color: COLORS.gray }}>Click on the bar to see details</Text>
          </View>
          <TouchableOpacity
            style={{ borderRadius: SIZES.base, borderColor: COLORS.gray, borderWidth: 2, padding: SIZES.base }}
            onPress={() => setHorizontal(!horizontal)}
          >
            <Text>{horizontal ? 'Vertical Bar' : 'Horizontal Bar'}</Text>
          </TouchableOpacity>
        </View>

        {/* Chart */}
        <VictoryChart
          width={SIZES.width - SIZES.base * 2}
          height={SIZES.height * 0.5}
          theme={VictoryTheme.material}
          padding={{ left: 70, right: 50, top: 0, bottom: 100 }}
          domainPadding={{ x: 20, y: 0 }}
          horizontal={horizontal}
        >
          <VictoryAxis

            style={{
              grid: {
                stroke: "transparent"
              }
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(t) => {
              let result = t;
              if (t >= 1000000000) {
                result = `${formatMoney(t / 1000000000, 0)}B`;
              } else if (t >= 1000000) {
                result = `${formatMoney(t / 1000000, 0)}M`;
              } else if (t >= 1000) {
                result = `${formatMoney(t / 1000, 0)}K`;
              }
              return result;
            }}
            style={{
              axis: {
                stroke: "transparent"
              },
              grid: {
                stroke: "grey"
              }
            }}
          />
          <VictoryBar
            data={dataChart}
            style={{ data: { fill: ({ datum }) => datum.color } }}
            cornerRadius={({ datum }) => 5}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            labels={() => ""}
            eventKey={'x'}
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onPressIn: (event, { datum }) => {
                    if (barSelected?.x != datum.x) {
                      setBarSelected(datum)
                    } else {
                      setBarSelected(undefined)
                    }

                  }
                },
              },
            ]}
          />
        </VictoryChart>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerBackVisible: false,
          headerShadowVisible: false,
          headerTitleStyle: { fontWeight: 'bold' },
          title: 'Estimated Salary'
        }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Input
          value={jobTitle}
          title={'Job title'}
          containerStyles={{ flex: 0.65 }}
          onChangeText={setJobtitle}
          Icon={() => <Feather name='edit-3' color={COLORS.gray} size={18} />}
          onSubmitEditing={handleSubmitEditing}
        />
        <Input
          value={location}
          title={'Location'}
          containerStyles={{ flex: 0.3 }}
          onChangeText={setLocation}
          Icon={() => <Feather name='map-pin' color={COLORS.gray} size={18} />}
          onPress={() => checkPermission()}
          isLoading={isLoadLocation}
          onSubmitEditing={handleSubmitEditing}
          editable={false}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator color={COLORS.red} size={'large'} />
      ) : error ? (
        <Text>Something went wrong!</Text>
      ) : data && data.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* from title */}
          <TouchableOpacity
            style={{
              borderRadius: SIZES.base,
              backgroundColor: COLORS.primary,
              marginVertical: SIZES.base,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            onPress={onPress}
          >
            <Text numberOfLines={1} style={{ padding: SIZES.base, fontWeight: 'bold', color: COLORS.white }}>Source: {data[itemIndex].publisher_name}</Text>
            <Feather name='chevron-down' color={COLORS.white} size={20} style={{ padding: SIZES.base }} />
          </TouchableOpacity>

          {/* statistics */}
          {renderStatistics(data[itemIndex])}

          {/* chart */}
          {renderChart(data[itemIndex])}

          {/* button publisher_link */}
          <TouchableOpacity
            style={{ borderRadius: SIZES.base, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary, marginVertical: SIZES.base, padding: SIZES.base }}
            onPress={() => Linking.openURL(data[itemIndex].publisher_link)}
          >
            <Text style={{ fontSize: SIZES.h3, fontWeight: 'bold', color: COLORS.white }}>Report detail</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <Text>No data</Text>
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>We need your country to gather salary data specific to where you live.</Text>
            <View style={{ flexDirection: 'row' }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible)
                }}>
                <Text style={styles.textStyle}>Not now</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={async () => {
                  setModalVisible(!modalVisible)
                  await checkPermission()
                }}>
                <Text style={styles.textStyle}>Get location</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: SIZES.base,
    flex: 1

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: SIZES.base,
    padding: 10,
    marginLeft: SIZES.base,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: COLORS.blue,
  },
  buttonClose: {
    backgroundColor: COLORS.red,
  },
  textStyle: {
    color: 'white',
    textAlign: 'left',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
  },
});
