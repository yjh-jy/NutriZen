import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome5';

const Notifications = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{
        flex:1,
        paddingTop:insets.top,
        backgroundColor:colors.backgroundColor,
        alignItems:'center',
        justifyContent:'center',
        
    }}>
      <FontAwesome
      name='wrench'
      size={80}
      />
      <Text style={{alignSelf:'center', fontFamily:'PixeloidsSanBold', fontSize:20, marginTop:20}}>{'Work in Progress\n'}</Text>
      <Text style={{alignSelf:'center', fontFamily:'PixeloidsSanBold', fontSize:16}}>{'Swipe left to go back'}</Text>
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({

})