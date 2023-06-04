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


        <View name = "Top Icon" style = {styles.top}>
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

      <View name = "Middle Icon" style = {styles.middle}>
        <View name = "Scroll" style = {styles.scroll}>
          <Image source = {require("../assets/images/dailyoverviewbg.png")}></Image>
          <Text style = {styles.dailyOverviewText}>Daily Overview</Text>
          <View name= "Nutrient Bars" style={styles.nutrient}>

            <View name = "Left Side Nutrients">
            <Image style = {styles.gifLeft1} source = {require("../assets/gifs/excessive/excessive1.gif")}></Image>
            <Text style = {styles.nutrientNamesLeft1}>Calories</Text>
            <Image style = {styles.gifLeft2} source = {require("../assets/gifs/excessive/excessive1.gif")}></Image>
            <Text style = {styles.nutrientNamesLeft2}>Protein</Text>
            <Image style = {styles.gifLeft3} source = {require("../assets/gifs/excessive/excessive1.gif")}></Image>
            <Text style = {styles.nutrientNamesLeft3}>Fat</Text>
            <Image style = {styles.gifLeft4} source = {require("../assets/gifs/excessive/excessive12.gif")}></Image>
            <Text style = {styles.nutrientNamesLeft4}>Sugar</Text>
            </View>

            <View name = "Right Side Nutrients">
            <Image style = {styles.gifRight1} source = {require("../assets/gifs/excessive/excessive1.gif")}></Image>
            <Text style = {styles.nutrientNamesRight1}>Sodium</Text>
            <Image style = {styles.gifRight2} source = {require("../assets/gifs/excessive/excessive1.gif")}></Image>
            <Text style = {styles.nutrientNamesRight2}>Fibre</Text>
            <Image style = {styles.gifRight3} source = {require("../assets/gifs/excessive/excessive1.gif")}></Image>
            <Text style = {styles.nutrientNamesRight3}>Carbohydrates</Text>
            <Image style = {styles.gifRight4} source = {require("../assets/gifs/excessive/excessive12.gif")}></Image>
            <Text style = {styles.nutrientNamesRight4}>Cholestrol</Text>
          </View>

          </View>
        </View>
      </View>


      <View name = "Bottom Icon" style ={styles.bottom}>
        <View name = "Recommendation" style = {styles.recommendation}>
          <Image source = {require("../assets/images/creature.png")}></Image>
          <Image style = {styles.textbox} source = {require("../assets/images/advice_box_bg.png")}></Image>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  top:{
    marginTop:0,
    marginLeft:-12.5,
  },

  middle:{
    marginTop:-20,
  },

  bottom:{
    marginTop:70,
  },

  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: colors.backgroundColor,
    justifyContent:'space-evenly',
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
    marginTop: -250,
    alignItems: 'center',
    justifyContent: 'center',


  },

  dailyOverviewText: {
    fontFamily: 'PixeloidsSanBold',
    marginTop: -550,
  },

  recommendation: {
    marginTop: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textbox: {
    marginTop: -15,
  },

  gifLeft1: {
    height:70,
    width: 130,
    marginTop: 30,
    marginLeft:-130,
    position: 'absolute',
  },
  gifLeft2: {
    height:70,
    width: 130,
    marginTop: 110,
    marginLeft: -130,
    position: 'absolute',
  },
  gifLeft3: {
    height:70,
    width: 130,
    marginTop: 190,
    marginLeft: -130,
    position: 'absolute',
  },
  gifLeft4: {
    height:70,
    width: 130,
    marginTop: 270,
    marginLeft: -130,
    position: 'absolute',
  },

  nutrientNamesLeft1: {
    marginLeft: -95,
    alignItems: 'center',
    marginTop:75,
    position: 'absolute',
    fontFamily: 'PixeloidSan',
  },

  nutrientNamesLeft2: {
    marginLeft: -95,
    alignItems: 'center',
    marginTop:155,
    position: 'absolute',
    fontFamily: 'PixeloidSan',
  },

  nutrientNamesLeft3: {
    marginLeft: -95,
    alignItems: 'center',
    marginTop:235,
    position: 'absolute',
    fontFamily: 'PixeloidSan',
  },

  nutrientNamesLeft4: {
    marginLeft: -95,
    alignItems: 'center',
    marginTop:315,
    position: 'absolute',
    fontFamily: 'PixeloidSan',
  },

  gifRight1:{
    height:70,
    width: 130,
    marginTop: 30,
    marginLeft:0,
    position: 'absolute',
  },

  gifRight2:{
    height:70,
    width: 130,
    marginTop: 110,
    marginLeft:0,
    position: 'absolute',
  },

  gifRight3:{
    height:70,
    width: 130,
    marginTop: 190,
    marginLeft:0,
    position: 'absolute',
  },

  gifRight4:{
    height:70,
    width: 130,
    marginTop: 270,
    marginLeft:0,
    position: 'absolute',
  },



  nutrientNamesRight1: {
    marginLeft: 50,
    alignItems: 'center',
    marginTop:75,
    position: 'absolute',
    fontFamily: 'PixeloidSan',
  },

  nutrientNamesRight2: {
    marginLeft: 50,
    alignItems: 'center',
    marginTop:155,
    position: 'absolute',
    fontFamily: 'PixeloidSan',
  },

  nutrientNamesRight3: {
    marginLeft: 15,
    alignItems: 'center',
    marginTop:235,
    position: 'absolute',
    fontFamily: 'PixeloidSan',
    fontSize: 12
  },

  nutrientNamesRight4: {
    marginLeft: 50,
    alignItems: 'center',
    marginTop:315,
    position: 'absolute',
    fontFamily: 'PixeloidSan',
  },

})