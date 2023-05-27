import { StyleSheet, Text, View, SafeAreaView, Pressable, Image } from 'react-native'
import {useCallback} from 'react'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors'
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

SplashScreen.preventAutoHideAsync();

export default DailyOverview = ({navigation}) => {
  const handleSignOut = () => {
    signOut(auth)
    .catch((error) => {
      alert(error.message)
    });

  };
  const [fontsLoaded] = useFonts({
    "PixeloidSan": require("../assets/fonts/PixeloidSans-mLxMm.ttf"),
    "PixeloidsSanBold": require("../assets/fonts/PixeloidSansBold-PKnYd.ttf"),
    "MinimalPixel": require("../assets/fonts/MinimalPixelFont.ttf")
    });

    const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
        await SplashScreen.hideAsync();
    }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
    return null;
    }

  return (
    <View style= {styles.container}onLayout={onLayoutRootView}>
      <SafeAreaView>
      <Text>Profile</Text>

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