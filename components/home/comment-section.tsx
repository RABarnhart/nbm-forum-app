import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query';
import { getComments } from '@/services/posts';
import Comment from './comment';
import { Colors } from '@/constants/theme';

type Props = {
    postID: number
}

const CommentSection = ({ postID }: Props) => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isError,
        error,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['comments', postID], 
        queryFn: ({ pageParam }) => getComments({ postID, pageParam }), 
        getNextPageParam: (lastPage, allPages) => {
            const limit = 50;
            const nextPage = allPages.length + 1;
            
            if ((allPages.length * limit) < lastPage.total) {
                return nextPage;
            } else {
                return undefined;
            }
        },
        initialPageParam: 1,
    });

    const loadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
        }
    }

    if (data && data.pages.length > 0 && data.pages[0].data.length === 0) {
        return (
                <Text style={styles.message}>No comments yet. Be the first to comment!</Text>
        )
    }

    if (isError) {
        console.error('Error fetching comments:', error);
        return (
            <Text style={styles.message}>{`Error fetching comments: ${error.message}`}</Text>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Comments</Text>

            {/* --- Loading and Error States --- */}
            {isLoading ? <ActivityIndicator size="large" style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} /> : null}

            {/* --- Comment List --- */}
            <View style={{marginRight: 25}}>
                {data?.pages.flatMap(page => page.data).map((item, index) => (
                    <Comment 
                        key={item.id ? item.id.toString() : index.toString()} 
                        data={item} 
                    />
                ))}
            </View>

        </View>
    )
}

export default CommentSection

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop: 5,
        paddingHorizontal: 25,
        paddingTop: 15,
        height: '100%',
    },
    title: {
        fontFamily: 'Syne_700Bold',
        fontSize: 16,
    },
    message: {
        textAlign: 'center', 
        fontFamily: 'Syne_400Regular',
        fontSize: 16,
        padding: 20, 
        color:Colors.darkGrey
    },
})