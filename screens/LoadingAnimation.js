import { StyleSheet, Text, View, Modal, ActivityIndicator} from 'react-native'
import React from 'react'
import {PacmanIndicator} from 'react-native-indicators';
import colors from '../assets/colors/colors'

export default LoadingAnimation = () => {
  return (
    <Modal transparent={true}
        animationType = 'none'
        >
      <View style={styles.container}>
        <PacmanIndicator size={48}/>
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