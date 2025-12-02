import { Alert, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { PaginatedPostsResponse, PostResponse, PostType } from '@/types/api';
import Post from './post';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { getPosts } from '@/services/posts';
import { Colors } from '@/constants/theme';

type Props = {
    activeFilters: {[key: string]: boolean};
}

const Feed = (props: Props) => {
    const initialPayload = { 
        limit: 5,
        tags: Object.keys(props.activeFilters).filter(key => props.activeFilters[key])
    };

    {/* --- Infinite Query --- */}
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery<PaginatedPostsResponse>({
        queryKey: ['posts', initialPayload], 
        queryFn: ({ pageParam }) => getPosts({ pageParam: pageParam as number | undefined, ...initialPayload }),
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            if ((allPages.length * initialPayload.limit) < lastPage.total) {
                return nextPage;
            } else {
                return undefined;
            }
        },
        initialPageParam: 1,
    });
    
    {/* --- Flatten pages into a single list of posts --- */}
    const allPosts = useMemo(() => {
        return data?.pages?.flatMap(page => page.data) || [];
    }, [data]);

    {/* --- Filtering posts --- */}
    const activeTagNames = Object.keys(props.activeFilters).filter(key => props.activeFilters[key]);

    const filteredPosts = allPosts.filter(post => {
        if (activeTagNames.length === 0) {
            return true;
        }

        const postHasActiveTag = post.tags.some(postTag => 
            activeTagNames.includes(postTag.name)
        );

        return postHasActiveTag;
    });

    if (isError) {
        return <Text style={styles.feedMessage}>Error loading posts.</Text>;
    }

    const loadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    if (activeTagNames.length > 0 && filteredPosts.length === 0) {
        return (
                <Text style={styles.feedMessage}>No posts match the selected filters.</Text>
        );
    }
    
    return (
        <FlatList
            data={filteredPosts}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <Post data={item} />}
            onEndReached={loadMore} 
            onEndReachedThreshold={0.25}
            ListFooterComponent={isFetchingNextPage ? 
                null 
                : <Text style={styles.feedMessage}>End of Posts</Text>
            }
        />
    );
}

export default Feed

const styles = StyleSheet.create({
    feedMessage: {
        textAlign: 'center', 
        fontFamily: 'Syne_400Regular',
        fontSize: 16,
        padding: 20, 
        color:Colors.darkGrey
    },
})
