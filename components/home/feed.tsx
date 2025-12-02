import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PostResponse, PostType } from '@/types/api';
import Post from './post';
import { useMutation } from '@tanstack/react-query';
import { getPosts } from '@/services/posts';

type Props = {
    activeFilters: {[key: string]: boolean};
}

const Feed = (props: Props) => {
    const [posts, setPosts] = useState<PostType[]>([]);

    const PostsMutation = useMutation({
        mutationFn: getPosts,
        onSuccess: (data) => {
            setPosts(data.data as PostType[]);
        },
        onError: (error) => {
            Alert.alert('Issue getting posts');
            console.error('Issue getting posts', error);
        }});

        useEffect(() => {
            PostsMutation.mutate({page: 1, limit: 5});
        }, []);

    if (PostsMutation.isPending) {
        return <Text>Loading posts...</Text>; 
    }
                
    console.log('Posts in feed:', posts)

    return (
        <ScrollView>
            {posts.map((post, index) => (
            <Post key={index}
                data={post} />
            ))}
        </ScrollView>
  )
}

export default Feed

const styles = StyleSheet.create({})
