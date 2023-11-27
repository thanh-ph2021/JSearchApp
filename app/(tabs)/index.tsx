import { useState } from 'react'
import { StyleSheet, TouchableOpacity, TextInput, FlatList, ListRenderItemInfo, ScrollView } from 'react-native'
import Entypo from '@expo/vector-icons/AntDesign'
import { Text, View } from '../../components/Themed'
import { SIZES, COLORS } from '../../constants/Theme'
import { useRouter } from 'expo-router'
import PopularJobs from '../../components/PopularJobs'
import NearbyJobs from '../../components/NearbyJobs'

export default function TabOneScreen() {

  const router = useRouter()
  
  const [textSearch, setTextSearch] = useState('')


  const handleEndEditing = () => {
    if (textSearch) {
      router.push(`/search/${textSearch}`)
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* find job */}
      <View>
        <View style={{ ...styles.inputContainer, flexDirection: 'row' }}>
          <Entypo
            name='search1'
            size={25}
            color={'white'}
          />
          <TextInput
            style={styles.input}
            placeholder='What are you looking for?'
            placeholderTextColor={'white'}
            value={textSearch}
            onChangeText={setTextSearch}
            onSubmitEditing={handleEndEditing}
          />
        </View>
        
      </View>
      {/* Popular jobs */}
      <PopularJobs />
      {/* Near by jobs */}
      <NearbyJobs />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },

  inputContainer: {
    backgroundColor: COLORS.lightBlue,
    height: 50,
    borderRadius: SIZES.base*3,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: SIZES.base,
    flex: 1
  },

  input: {
    marginVertical: SIZES.base,
    paddingHorizontal: 10,
    color: 'white',
  }
});
