import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, TouchableHighlight } from 'react-native'
import {useCallback} from 'react'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors'


SplashScreen.preventAutoHideAsync();

export default DailyOverview = ({navigation}) => {

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

  const testing = new Date();
  const dateTextWord = `${testing.getDate()}/${testing.getMonth()+1}/${testing.getFullYear()}`; 

  return (
    <View style= {styles.container}onLayout={onLayoutRootView}>
      <SafeAreaView>

        <View name = "Top Icon">
          <View name= "Date Bar" >
            <Image style = {styles.dateBar} 
            source = {require("../assets/images/date_bg.png")}>
            </Image>  
            <Text className="datetext" style = {styles.dateText}>{dateTextWord}</Text>     
          </View>
        <TouchableHighlight onPress = {() => navigation.navigate('Calendar')}>
          <View name = "Calendar" style = {styles.calendar}>
            <Image source = {require("../assets/images/calendar.png")}></Image>
          </View>
        </TouchableHighlight>
        </View> 

      <View name = "Middle Icon">
        <View name = "Scroll" style = {styles.scroll}>
          <Image source = {require("../assets/images/daily_overview_bg.png")}></Image>
          <Text style = {styles.dailyOverviewText}>Daily Overview</Text>

          <View name = "Left Side Nutrients">
          <Image style = {styles.gif} source = {require("../assets/gifs/excessive/excessive1.gif")}></Image>



          </View>

          <View name = "Right Side Nutrients">

          </View>
        </View>
      </View>


      <View name = "Bottom Icon">
        <View name = "Recommendation" style = {styles.recommendation}>
          <Image source = {require("../assets/images/creature.png")}></Image>
          <Image style = {styles.textbox} source = {require("../assets/images/advice_box_bg.png")}></Image>
        </View>
      </View>
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
    marginTop: 30,
  },
  dateBar:{
    marginTop: -50,
    marginLeft: 10,
  },

  dateText: {
    fontFamily: 'PixeloidsSanBold',
    marginTop: -140,
    marginLeft: 130,
  },

  calendar: {
    marginTop: -184,
    marginLeft: 175,
  },

  scroll: {
    marginTop: -325,
    alignItems: 'center',
    justifyContent: 'center',

  },

  dailyOverviewText: {
    fontFamily: 'PixeloidsSanBold',
    marginTop: -515
  },

  recommendation: {
    marginTop: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textbox: {
    marginTop: -15,
  },

  gif: {
    height:100,
    width: 120,
    marginTop: 30,
    marginRight: 125
  }


})