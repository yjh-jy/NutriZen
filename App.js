import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from './assets/colors/colors'

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "PixeloidSan": require("./assets/fonts/PixeloidSans-mLxMm.ttf"),
    "PixeloidsSanBold": require("./assets/fonts/PixeloidSansBold-PKnYd.ttf"),
    "MinimalPixel": require("./assets/fonts/MinimalPixelFont.ttf")
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
      <Text style = {{fontFamily: "PixeloidSan", fontSize: 18}}>NutriZen's Early Beginnings</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:  colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
