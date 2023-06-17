import { StyleSheet, Text, View, SafeAreaView, Pressable, Image } from 'react-native'
import {useCallback} from 'react'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../../assets/colors/colors'
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

SplashScreen.preventAutoHideAsync();

export default Calendar = ({navigation}) => {
  const handleSignOut = () => {
    signOut(auth)
    .catch((error) => {
      alert(error.message)
    });

  };
  

  return (
    <View style= {styles.container}>
      <SafeAreaView>
      <Text>Calendar</Text>

      <Pressable onPress={handleSignOut}>
        <Text style = {styles.signOut} >Sign Out</Text>
        </Pressable> 
        </SafeAreaView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: colors.backgroundColor,
  },
  signOut:{
    fontFamily: "PixeloidsSanBold",
    fontSize: 13,
    alignSelf: 'center',
    marginTop: 30
    
  }
})