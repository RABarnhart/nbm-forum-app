import { View, Text, Pressable } from 'react-native'
import { SubmitHandler, useForm } from 'react-hook-form'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'

type Props = {}
type Inputs = {
  example: string
  exampleRequired: string
}

const signup = (props: Props) => {
const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  console.log(watch("example")) // watch input value by passing the name of it

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <Pressable onPress={() => {router.replace("/welcome")}}>
                    <Text style={{ fontSize: 30 }}>←</Text>
                  </Pressable>
    </SafeAreaView>
  )
}

export default signup