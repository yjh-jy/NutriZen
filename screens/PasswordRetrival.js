import { StyleSheet, Text, View, Pressable, KeyboardAvoidingView, TextInput} from 'react-native';
import {useCallback, useState} from 'react'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';
import {auth} from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

SplashScreen.preventAutoHideAsync();

export default PasswordRetrival = ({navigation}) => {
  const [email, enterEmail] = useState('')

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password Reset Email Sent!");
      navigation.navigate("Entrance")
  })
  .catch((error) => alert(error.message));
  }

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
              value = {email}
              onChangeText={text => enterEmail(text)}
              >
              </TextInput>


            <Pressable onPress={resetPassword}>
              <Text style = {styles.reset}>Reset</Text>
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