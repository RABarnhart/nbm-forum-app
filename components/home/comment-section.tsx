import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query';
import { getComments } from '@/services/posts';
import Comment from './comment';

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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Comments</Text>
            {isError ? <Text >{`Error fetching comments: ${error.message}`}</Text> : null}
            {isLoading ? <ActivityIndicator size="large" style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} /> : null}
            <FlatList
            data={data?.pages.flatMap(page => page.data) || []}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Comment data={item} />}
                    onEndReached={loadMore} 
                    onEndReachedThreshold={0.25}
                />
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
        height: '100%'
    },
    title: {
        fontFamily: 'Syne_700Bold',
        fontSize: 16,
    }
})