import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router'
import Post from '@/components/home/post'
import { PostType } from '@/types/api'

type Props = {

}

const DetailedPostView = ( props : Props) => {

    const params = useLocalSearchParams();
    
    const handleBack = () => {
        router.back();
    }

let postData: PostType | undefined;
    if (params.postData && typeof params.postData === 'string') {
        try {
            postData = JSON.parse(params.postData);
        } catch (e) {
            console.error("Failed to parse post data from navigation params", e);
        }
    }

    if (!postData) {
        return <Text style={{padding: 50}}>Error: Post data not found.</Text>;
    }
    
    return (
    <View style={{ flex: 1 }}>
        <View style={styles.container}>
            {/* --- Title and Back Arrow --- */}
            <View style={styles.header}>
                <Pressable onPress={handleBack}>
                <Text style={{ fontSize: 30 }}>←</Text>
                </Pressable>
            </View>
            <View style={styles.logo}>
                <Text style={styles.title}>Post</Text>
            </View>

            {/* --- Post Content --- */}
            <Post data={postData} />

            </View>
    </View>
  )
}

export default DetailedPostView

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 80,
    },
    header: {
        flexDirection: 'row',
        fontSize: 24,
        alignItems: 'center',
        height: 50,
        marginLeft: 30,
        marginBottom: 15
    },
    title: {
        fontFamily: 'Syne_700Bold', 
        fontSize: 28, 
        paddingTop: 40
    },
    logo: {
        position: 'absolute',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        top: 45,
    }
})