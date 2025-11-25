import { Colors } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
    currentStepIndex: number;
    length?: number;
}

const SignupProgressBar = ({
    currentStepIndex,
    length = 4,
}: Props) => {

  return (
    <View style={{flexDirection: 'row', marginHorizontal: 30}}>
{Array.from({ length }).map((_, index) =>  {

    return <View
    key={index}
    style={{
      flex: 1,
      height: 8,
      marginHorizontal: 5,
      backgroundColor: currentStepIndex>=index ? Colors.main : Colors.grey,
    }}
  />
}
  
)}
    </View>
  )
}

export default SignupProgressBar

const styles = StyleSheet.create({})