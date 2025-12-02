import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PostType } from '@/types/api';
import Post from './post';

type Props = {
    activeFilters: {[key: string]: boolean};
}

const posts: PostType[] = [
    {
        id: 1,
        title: "XD vs Figma, you tell me what is better. Please...",
        content: "Does anyone know how XD works? Very new to the platform and looking for someone to show me the ropes!",
        createdAt: "28-10-2021",
        user: {
            id: 1,
            firstName: "John",
            lastName: "Smith",
            avatar: null,
            email: "JohnSmith@email.com",
            telephone: "555-555-5555"
        },
        likes: 3,
        comments: 12,
        tags: [{name: "Design"}]
    }]

const Feed = (props: Props) => {
  return (
    <View>
      {posts.map((post, index) => (
        <Post data={post} />
        ))}
    </View>
  )
}

export default Feed

const styles = StyleSheet.create({})