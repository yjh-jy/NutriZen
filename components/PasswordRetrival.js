import { StyleSheet, Text, View, Pressable, KeyboardAvoidingView, TextInput} from 'react-native'
import {useCallback} from 'react'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors'

SplashScreen.preventAutoHideAsync();

const PasswordRetrival = ({navigation}) => {
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
    <View style={styles.container} onLayout={onLayoutRootView} >
        <KeyboardAvoidingView>
            <View style = {styles.itemsWrapper}>
              <TextInput
              style={styles.input}
              autoCapitalize='none'
              autoCorrect = {false}
              autoComplete='email'
              selectionColor = {colors.backgroundColor}
              placeholder='Enter Email Address'
              enterKeyHint = "done"
              >
              </TextInput>


            <Pressable onPress={()=>{navigation.goBack()}}>
              <Text style = {styles.reset}>Reset</Text>
                </Pressable>
              
            </View>
            </KeyboardAvoidingView>
    </View>
  )
}

export default PasswordRetrival

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: colors.backgroundColor,
  },
  itemsWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 350,

  },
  input: {
    height:49,
    width:220,
    backgroundColor: colors.textFieldColor,
    fontSize: 20,
    fontFamily: "PixeloidSan",
    padding:10,
    fontSize: 15
    
  },
  reset: {
    fontFamily: "PixeloidsSanBold",
    fontSize: 20,
    padding:30
  }
})