import { StyleSheet, Text, View, Pressable, KeyboardAvoidingView, TextInput} from 'react-native'
import {useCallback} from 'react'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors'

SplashScreen.preventAutoHideAsync();

export default Login = ({navigation}) => {
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
              enterKeyHint = "done"

              >
              </TextInput>

              <Text style = {styles.subtitle}>Email</Text>

              <TextInput
              style={styles.input}
              autoCapitalize='none'
              autoCorrect = {false}
              autoComplete='current-password'
              selectionColor = {colors.backgroundColor}
              enterKeyHint = "done"
              secureTextEntry
              >
              </TextInput>
              
              <Text style = {styles.subtitle}>Password</Text>
              <Pressable onPress={()=>{navigation.push('PasswordRetrival')}}>
                <Text style = {styles.passwordRetrival} >Forget Password?</Text>
                </Pressable> 
              <Pressable onPress={()=>{navigation.push("DailyOverview")}}>
                <Text style = {styles.login}>Login</Text>
                </Pressable>
              

              <Pressable onPress={()=>{navigation.goBack()}}>
                <Text style = {styles.back} >Back</Text>
                </Pressable>
              
              

            </View>
            </KeyboardAvoidingView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: colors.backgroundColor,
  },
  itemsWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 270,

  },
  input: {
    height:49,
    width:220,
    backgroundColor: colors.textFieldColor,
    fontSize: 20,
    fontFamily: "PixeloidSan",
    padding:10
    
  },
  subtitle: {
    fontFamily: "PixeloidsSanBold",
    fontSize: 20,
    padding:10
  },
  login: {
    fontFamily: "PixeloidsSanBold",
    fontSize: 20,
    marginTop:40,
  },
  back: {
    fontFamily: "PixeloidsSanBold",
    fontSize: 20,
    marginTop:20,
  },
  passwordRetrival:{
    fontFamily: "PixeloidsSanBold",
    fontSize: 13,
  }

})