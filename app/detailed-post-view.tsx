import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router'
import Post from '@/components/home/post'
import { PostType } from '@/types/api'
import CommentSection from '@/components/home/comment-section';
import { Colors } from '@/constants/theme';

type Props = {

}

const DetailedPostView = ( props : Props) => {

    const params = useLocalSearchParams();
    const [comment, setComment] = useState('');

    const handleSubmitComment = () => {
        console.log("Submitting comment:", comment);
        setComment('');
    }
    
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
        <>
    <ScrollView style={{ flex: 1 }}>
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

        {/* --- Comment Section --- */}
        <CommentSection postID={postData.id} />

    </ScrollView>
    {/* --- Make a Comment --- */}
    <View style={styles.makeComment}>
        <View style={{ width: '100%', height: 1, backgroundColor: 'black' }} />
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.input}
                onChangeText={setComment}
                value={comment}
                placeholder="Make a Comment"
                placeholderTextColor="black" />
            <TouchableOpacity 
                style={styles.submitButton}
                onPress={handleSubmitComment}>
                <Text style={{ fontSize: 20, color: 'white', fontWeight: '700' }}>&uarr;</Text>
            </TouchableOpacity>
        </View>
    </View>
    </>
  )
}

export default DetailedPostView

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        fontSize: 24,
        alignItems: 'center',
        height: 27,
        marginLeft: 30,
        marginBottom: 15
    },
    title: {
        fontFamily: 'Syne_700Bold', 
        fontSize: 28, 
        paddingTop: 15
    },
    logo: {
        position: 'absolute',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        top: 45,
    },
    makeComment: {
        width: '100%',
        height: 120,
        paddingHorizontal: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    inputContainer: {
        width: '100%',
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        backgroundColor: Colors.lightGrey,
        fontFamily: 'Syne_400Regular',
        fontSize: 16,
        height: 35, 
        paddingHorizontal: 20,
    },
    submitButton: {
        backgroundColor: Colors.main,
        height: 35, 
        width: 35, 
        paddingLeft: 9,
        marginLeft: 10,
        justifyContent: 'center',
    }
})