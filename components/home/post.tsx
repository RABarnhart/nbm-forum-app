import { Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { PostType } from '@/types/api'
import { Colors } from '@/constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

type Props = {
  data: PostType;
}

const Post = ({ data }: Props) => {

  const handlePress = () => {
      router.push({
          pathname: `/detailed-post-view`,
          params: { 
              postData: JSON.stringify(data) 
          }
      });
    }

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>

      {/* --- Author and Date --- */}
      <View style={{flexDirection: 'row', marginTop: 15}}>
        <Text style={{fontFamily: 'Syne_700Bold', fontSize: 18, color: Colors.darkGrey}}>
          {data.user.firstName} {data.user.lastName}
        </Text>
        <Icon 
        name="circle-medium" 
        size={15} 
        color={Colors.main} 
        style={{alignSelf: 'center', marginHorizontal: 5}} />
        <Text style={{fontFamily: 'Syne_400Regular', fontSize: 18, color: Colors.darkGrey}}>
          {data.createdAt.slice(0, 10)}
        </Text>
      </View>

      {/* --- Title --- */}
      <Text style={styles.title}>{data.title}</Text>

      {/* --- Tags --- */}
      <View style={{flexDirection: 'row', marginBottom: 10}}>
      {data.tags.map((tag, index) => (
        <Text 
        key={index}
        style={styles.tag}>{tag.name}</Text>
      ))}
      </View>

      {/* --- Content --- */}
      <Text style={{fontFamily: 'Syne_400Regular', fontSize: 16, paddingVertical: 5}}>{data.content}</Text>
      </Pressable>

      {/* --- Likes and Comments --- */}
      <View style={styles.footer}>
        <View style={{flexDirection: 'row', marginRight: 20, alignItems: 'center'}}>
          <TouchableOpacity>
            <Icon 
            name="heart-outline" 
            size={25} 
            color="gray" />
          </TouchableOpacity>
          <Text style={styles.footerText}>{data.likes}</Text>
        </View>
        
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon 
            name="comment-outline" 
            size={25} 
            color="gray" />
        <Text style={styles.footerText}>{data.comments}</Text>
        </View>
      </View>
      
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 5,
    paddingHorizontal: 25,
  },
  title: {
    fontFamily: 'Syne_700Bold',
    fontSize: 25,
    marginTop: 20,
    marginBottom: 12,
},
  tag: {
    paddingVertical: 5, 
    paddingHorizontal: 15, 
    marginRight: 10,
    backgroundColor: Colors.main,
    color: 'white'
  },
  footer: {
    flexDirection: 'row', 
    marginTop: 15, 
    marginBottom: 20, 
  },
  footerText: {
    fontSize: 18, 
    color: 'gray',
    paddingHorizontal: 5
  }
})