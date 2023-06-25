import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import {useCallback} from 'react'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../../assets/colors/colors'

SplashScreen.preventAutoHideAsync();

export default Entrance = ({navigation}) => {
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
    <View style={styles.container} onLayout={onLayoutRootView} >
        <SafeAreaView>
            
            <View style = {styles.itemsWrapper}>
                <Text style = {styles.title}>NutriZen</Text>
                <Image 
                style = {styles.image} 
                source= {require("../../assets/images/creature_loading_non_looping.gif")}
                >
                </Image>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style = {styles.login}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                    <Text style = {styles.register}>Register</Text>
                </TouchableOpacity>
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
    itemsWrapper: {
        marginTop: '60%',
        alignItems: 'center',
        justifyContent: 'center'

    },
    title: {
        fontFamily: 'PixeloidsSanBold',
        fontSize: 48,
    },
    image:{
        width:140,
        height:61,

    },
    login: {
        fontFamily: 'PixeloidsSanBold',
        fontSize: 20,
        marginVertical: 20


    },
    register: {
        fontFamily: 'PixeloidsSanBold',
        fontSize: 20,
        marginVertical: 5
    }
})



