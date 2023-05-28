import { StyleSheet, Text, View, Pressable, KeyboardAvoidingView, TextInput, } from 'react-native';
import {useState, useCallback} from 'react';
import { useFonts } from 'expo-font';
import colors from '../../assets/colors/colors';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default Onboarding1 = ({navigation}) => {
  const [name, setName] = useState('');

  const [fontsLoaded] = useFonts({
    "PixeloidSan": require("../../assets/fonts/PixeloidSans-mLxMm.ttf"),
    "PixeloidsSanBold": require("../../assets/fonts/PixeloidSansBold-PKnYd.ttf"),
    "MinimalPixel": require("../../assets/fonts/MinimalPixelFont.ttf")
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
    <View style={styles.container} onLayout={onLayoutRootView}>
        <KeyboardAvoidingView>
            <View style = {styles.itemsWrapper}>
              <TextInput
              style={styles.input}
              autoCapitalize='none'
              autoCorrect = {false}
              selectionColor = {colors.backgroundColor}
              enterKeyHint = "done"
              textAlign = 'center'
              value = {name}
              onChangeText={text => setName(text)}
              >
              </TextInput>

              <Text style = {styles.subtitle}>Enter your name</Text>              

              <Pressable onPress={() => {navigation.navigate('Onboarding2', {nameParam: name})}}>
                <Text style = {styles.proceed}>Proceed</Text>
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
    marginTop: '80%',

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
    fontSize: 18,
    padding:10
  },
  proceed: {
    fontFamily: "PixeloidsSanBold",
    fontSize: 20,
    marginTop:40,
  },
  back: {
    fontFamily: "PixeloidsSanBold",
    fontSize: 20,
    marginTop:20,
  },

})