import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default About = () => {
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


const styles = StyleSheet.create({

})