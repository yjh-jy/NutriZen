import { StyleSheet, Text, View, SafeAreaView, Pressable, Image } from 'react-native'
import {useCallback} from 'react'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors'

SplashScreen.preventAutoHideAsync();

export default DailyOverview = ({navigation}) => {
  const [fontsLoaded] = useFonts({
    "PixeloidSan": require("../assets/fonts/PixeloidSans-mLxMm.ttf"),
    "PixeloidsSanBold": require("/Users/wakaka/Desktop/orbital_2023/assets/fonts/PixeloidSansBold-PKnYd.ttf"),
    "MinimalPixel": require("/Users/wakaka/Desktop/orbital_2023/assets/fonts/MinimalPixelFont.ttf")
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
      <Text>DailyOverview</Text>
    </View>
  )
}

 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: colors.backgroundColor,
  },
})