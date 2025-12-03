import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CommentType } from '@/types/api'

type Props = {
    data: CommentType;
}

const Comment = ({ data }: Props) => {
  return (
    <View>
      <Text>Comment</Text>
    </View>
  )
}

export default Comment

const styles = StyleSheet.create({})