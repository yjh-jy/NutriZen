import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Notifications = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{
        flex:1,
        paddingTop:insets.top,
        backgroundColor:colors.backgroundColor
    }}>
        

    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({})