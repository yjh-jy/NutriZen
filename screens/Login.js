import { StyleSheet, Text, View, Pressable, KeyboardAvoidingView, TextInput, } from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';
import { signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase'

SplashScreen.preventAutoHideAsync();

export default Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch( error => alert(error.message))
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
              enterKeyHint = "done"
              value = {email}
              onChangeText={text => setEmail(text)}
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
              value = {password}
              onChangeText={text => setPassword(text)}
              secureTextEntry
              >
              </TextInput>
              
              <Text style = {styles.subtitle}>Password</Text>
              
              <Pressable onPress={()=>{navigation.push('PasswordRetrival')}}>
                <Text style = {styles.passwordRetrival} >Forget Password?</Text>
                </Pressable> 

              <Pressable onPress={handleLogin}>
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