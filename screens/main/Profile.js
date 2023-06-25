import { StyleSheet, Text, View, Pressable, Image, ImageBackground } from 'react-native'
import * as SplashScreen from 'expo-splash-screen';
import colors from '../../assets/colors/colors'
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { retrieveProfile } from '../../hooks/retrieveProfile';
import Ionicons from '@expo/vector-icons/Ionicons';

SplashScreen.preventAutoHideAsync();

export default Profile = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState(null);

  useEffect(()=>{
    (async() => {
    const userInformation = await retrieveProfile();
    setName(userInformation.name);
    })()
  
  },[])
  const handleSignOut = () => {
    signOut(auth)
    .catch((error) => {
      alert(error.message)
    });

  };

  return (
    <View style= {{
      flex:1,
      backgroundColor:colors.textFieldColor,
      paddingTop: insets.top, 
      justifyContent:'center',
  
    }}>
         <Ionicons name="exit-outline" 
        color='black'
        backgroundColor='transparent'
        style={{marginRight: 15, alignSelf:'flex-end', }}
        size={40}
        onPress={handleSignOut}
        />
      <View style={styles.topIcons}>
   
        <Image source={require('../../assets/images/creature.png')} style={styles.profilePic}/>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.title}>ザ・ヴァンキシャー</Text>
        

      </View>

      <View style={styles.settingsWrapper}>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  topIcons:{
    backgroundColor:'gradient',
    alignSelf:'center',
    flex:1/2,
    justifyContent:'center',

  },
  profilePic: {
    height:50,
    width:100,
    alignSelf:'center'

  },
  headerText:{
    fontFamily:'MinimalPixel',
    fontSize:40,
    
  },
  name:{
    fontFamily:'MinimalPixel',
    fontSize:60,
    textAlign:'center'

  },
  title: {
    fontFamily:'MinimalPixel',
    fontSize:15,
    textAlign:'center'

  },
  settingsWrapper:{
    backgroundColor:colors.backgroundColor,
    flex:1
  },
  signOut:{
    fontFamily: "PixeloidsSanBold",
    fontSize: 13,
    alignSelf: 'center',
    marginTop: 30
    
  }
})