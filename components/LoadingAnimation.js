import { StyleSheet, Text, View, Modal} from 'react-native';
import React from 'react';
import {PacmanIndicator} from 'react-native-indicators';
import colors from '../assets/colors/colors';

export default LoadingAnimation = ({caption=''}) => {
  return (
    <Modal transparent={true}
        animationType = 'none'
        >
      <View style={styles.container}>
        <PacmanIndicator style={{position:'absolute'}} size={48}/>
        <Text style={{fontFamily:'PixeloidSan', fontSize:15, color:'black', marginBottom:-70}}>{caption}</Text>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor:colors.backgroundColor
    }
})