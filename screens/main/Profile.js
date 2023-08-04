import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList,Dimensions, Alert } from 'react-native'
import * as SplashScreen from 'expo-splash-screen';
import colors from '../../assets/colors/colors'
import { auth, db } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCallback, useEffect, useState } from 'react';
import { retrieveProfile } from '../../hooks/retrieveProfile';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { doc, setDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from '@react-navigation/native';
import { calorieAtom, carbohydrateAtom, cholesterolAtom, fatAtom, fibreAtom, proteinAtom, sodiumAtom, sugarAtom, updateBadges } from '../../hooks/updateBadges';
import { useAtomValue } from 'jotai';

SplashScreen.preventAutoHideAsync();

const { width } = Dimensions.get('window');

const renderShowRoom = ({item}) => {
  const titles_bank = {
    allExcessive: '不健康ダイエットアウトロー',
    allSufficient: 'バランス栄養マエストロ',
    logConsecutive3: '三日間の輝煌',
    logConsecutive7: '七日間の記録伝説',
    moreThan3MealsADay: '食事フリーク',
  };
  const badges_bank = {
    allExcessive: require('../../assets/images/allExcessive.png'),
    allSufficient: require('../../assets/images/allSufficient.png'),
    logConsecutive3: require('../../assets/images/logConsecutive3.png'),
    logConsecutive7: require('../../assets/images/logConsecutive7.png'),
    moreThan3MealsADay: require('../../assets/images/moreThan3MealsADay.png'),
  }

  return (
    <View style={[styles.showroom, {width}]}>
      <Text style={styles.title}>{titles_bank[item]}</Text>
      <Image style={styles.badge} source={badges_bank[item]}/>
      <Text style={styles.badgeName}>{item}</Text>
    </View>
  )

};

export default Profile = ({navigation}) => {
  const calorie  = useAtomValue(calorieAtom);
  const sodium = useAtomValue(sodiumAtom);
  const protein = useAtomValue(proteinAtom);
  const fibre = useAtomValue(fibreAtom);
  const fat = useAtomValue(fatAtom);
  const carbohydrate  = useAtomValue(carbohydrateAtom);
  const sugar  = useAtomValue(sugarAtom);
  const cholesterol = useAtomValue(cholesterolAtom);

  const insets = useSafeAreaInsets();
  const [name, setName] = useState(null);
  const [gender, setGender] = useState();
  const [age, setAge] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [fitness, setFitness] = useState();
  const [profilePic, setProfilePic] = useState();
  const [badgesData, setBadgesData] = useState([]);
  const isFocused = useIsFocused(); // hook that returns a boolean when screen focus changes

  useEffect(()=>{
    const fetchData = async() => {
      const userInformation = await retrieveProfile();
      setName(userInformation.name);
      setGender(userInformation.gender);
      setAge(userInformation.age);
      setHeight(userInformation.height);
      setWeight(userInformation.weight);
      setFitness(userInformation.fitness_constant);
      setProfilePic(userInformation?.profilePic);
      setBadgesData( await updateBadges(calorie, sodium, protein, fibre, fat, carbohydrate, sugar, cholesterol));
    
    };
    fetchData();
  }, [isFocused]);

  const handleSignOut = () => {
    signOut(auth)
    .catch((error) => {
      alert(error.message)
    });
  };

  const handleUploadProfilePic = async () => {
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!response.canceled) {
    const source = response.assets[0];
    setProfilePic(source.uri);
    const user = auth.currentUser;
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, { profilePic: source.uri }, { merge: true });
    }

  };

  return (
    <View style= {{
      backgroundColor:colors.textFieldColor,
      flex:1,
      paddingTop: insets.top, 
      justifyContent:'center',
    }}
    >
    <TouchableOpacity style={{marginRight:15, alignSelf:'flex-end'}}>
      <Ionicons name="exit-outline" 
      color='black'
      size={40}
      />
    </TouchableOpacity>

    <View style={styles.topIcons}>
      
      <TouchableOpacity onPress={handleUploadProfilePic}>
        <Image source={{uri:profilePic}} style={styles.profilePic}/>
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>

      <FlatList
      data={badgesData}
      horizontal={true}
      renderItem={renderShowRoom}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      />

    </View>

    <View style={styles.settingsWrapper}>
      <Text style={styles.generalText}>General</Text>
      
      <TouchableOpacity style={styles.options} onPress={()=>{navigation.navigate('EditProfile', {nameParam:name, genderParam:gender, ageParam:age, weightParam:weight, heightParam:height, fitnessParam:fitness, profilePicParam: profilePic})}}>
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
    </View>
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
    height:100,
    width:100,
    alignSelf:'center',
    backgroundColor:'white',
    borderRadius:90,
    borderWidth:3,
    borderColor:'white',
    resizeMode:'cover'
  },
  name:{
    fontFamily:'MinimalPixel',
    fontSize:65,
    textAlign:'center'
  },
  title: {
    fontFamily:'MinimalPixel',
    fontSize:20,
    textAlign:'center'
  },
  badgeName:{
    fontFamily:'MinimalPixel',
    fontSize:20,
    textAlign:'center',
    marginTop:-25,
    
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
    alignItems:'flex-start', 
    borderTopRightRadius:30, 
    borderTopLeftRadius:30, 
  },
  generalText:{
    fontFamily:'PixeloidSan',
    fontSize:20,
    marginLeft:30,
    marginTop:40
  },
  options: {
    flexDirection:'row',
    alignItems:'center',
    marginVertical: 20,
    marginLeft:30
  },
  showroom:{
    marginTop:20,
  },
  text: {
    fontFamily:'PixeloidSan',
    fontSize:14,
    marginLeft: 30,
  },
  badge:{
    height:150,
    width:150,
    alignSelf:'center',
    marginTop:-20
  }
})