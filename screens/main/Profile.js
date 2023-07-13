import { StyleSheet, Text, View, Pressable, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import * as SplashScreen from 'expo-splash-screen';
import colors from '../../assets/colors/colors'
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { retrieveProfile } from '../../hooks/retrieveProfile';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';

SplashScreen.preventAutoHideAsync();

export default Profile = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState(null);
  const [gender, setGender] = useState();
  const [age, setAge] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [fitness, setFitness] = useState();
  const titles = {
    allExcessive: '不健康ダイエットアウトロー',
    allSufficient: 'バランス栄養マエストロ',
    logConsecutive7: '七日間の記録伝説',
    moreThan3MealsADay: '食事フリーク',

  }

  
  useEffect(()=>{
    (async() => {
    const userInformation = await retrieveProfile();
    setName(userInformation.name);
    setGender(userInformation.gender);
    setAge(userInformation.age);
    setHeight(userInformation.height);
    setWeight(userInformation.weight);
    setFitness(userInformation.fitness_constant);
    
    })()
  
  },[])
  const handleSignOut = () => {
    signOut(auth)
    .catch((error) => {
      alert(error.message)
    });

  };

  return (
    <ScrollView contentContainerStyle= {{
      backgroundColor:colors.textFieldColor,
      flex:1,
      paddingTop: insets.top, 
      justifyContent:'center',
    }}
    backgroundColor={colors.textFieldColor}
    scrollEnabled={false}
    >
      <Ionicons name="exit-outline" 
      color='black'
      style={{marginRight: 15, alignSelf:'flex-end', }}
      size={40}
      onPress={handleSignOut}
      />
      <ScrollView  
      contentContainerStyle={styles.topIcons}
      horizontal={true}
      >
    
          <Image source={require('../../assets/images/creature.png')} style={styles.profilePic}/>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.title}>{titles.allSufficient}</Text>

      </ScrollView>

    <View style={styles.settingsWrapper}>
      <Text style={styles.generalText}>General</Text>
      
      <TouchableOpacity style={styles.options} onPress={()=>{navigation.navigate('EditProfile', {nameParam:name, genderParam:gender, ageParam:age, weightParam:weight, heightParam:height, fitnessParam:fitness})}}>
      <FontAwesome name="user" 
      color='black'
      size={25}
      />
      <Text style={styles.text}>Edit Profile</Text>  
      </TouchableOpacity>

      <TouchableOpacity style={styles.options} onPress={()=>{navigation.navigate('Notifications')}}>
      <FontAwesome name="bell" 
      color='black'
      size={25}
      />
      <Text style={styles.text}>Set Notifications</Text>

      </TouchableOpacity>

      <TouchableOpacity style={styles.options} onPress={()=>{navigation.navigate('About')}}>
      <AntDesign name="question" 
      color='black'
      size={25}
      />
      <Text style={styles.text}>About</Text>  

      </TouchableOpacity>
    
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  topIcons:{
    flexDirection:'column',
    alignSelf:'center',
    flex:1,
    justifyContent:'center',
  },
  profilePic: {
    height:90,
    width:90,
    alignSelf:'center',
    backgroundColor:'white',
    borderRadius:90,
    resizeMode:'contain'
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
  signOut:{
    fontFamily: "PixeloidsSanBold",
    fontSize: 13,
    alignSelf: 'center',
    marginTop: 30
  },
  settingsWrapper:{
    backgroundColor:colors.backgroundColor, 
    flex:1, 
    justifyContent:'center', 
    alignItems:'flex-start', 
    borderTopRightRadius:30, 
    borderTopLeftRadius:30, 
  },
  generalText:{
    fontFamily:'PixeloidSan',
    fontSize:20,
    marginLeft:30,
    marginTop:-30
  },
  options: {
    flexDirection:'row',
    alignItems:'center',
    marginVertical: 20,
    marginLeft:30
  },
  text: {
    fontFamily:'PixeloidSan',
    fontSize:14,
    marginLeft: 30,
  }
})