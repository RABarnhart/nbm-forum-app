import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feed from '@/components/home/feed';
import Header from '@/components/home/header';

type Props = {}

const home = (props: Props) => {

const filters = ['Design', 'XD', 'Figma', 'Development', 'Javascript', 'CSS']

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Header />

        {/* --- Search Bar --- */}
        <View style={styles.searchBar}>
          <Icon 
            name="magnify" 
            size={30} 
            color="gray" 
            style={{marginHorizontal: 10, alignSelf: 'center'}} />
          <TextInput
            style={styles.input}
            onChangeText={() => {}}
            value={''}
            placeholder="Search"
          />
        </View>

        {/* --- Filters --- */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection: 'row', marginTop: 15, marginBottom: 10}}>
            {filters.map((filter, index) => (
              <Pressable 
                key={index} 
                style={styles.filterButton}
                onPress={() => {}}>
                <Text style={{fontFamily: 'Syne_400Regular', fontSize: 14}}>{filter}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      <Feed />
    </View>
  )
}

export default home

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: 'white',
      padding: 25
    },
    input: {
      fontFamily: 'Syne_400Regular',
      fontSize: 20,
    },
    searchBar: {
      width: '100%',
      height: 45,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: Colors.lightGrey,
    },
    filterButton: 
    {
      backgroundColor: Colors.lightGrey, 
      paddingVertical: 5, 
      paddingHorizontal: 15, 
      marginRight: 10
    }
})