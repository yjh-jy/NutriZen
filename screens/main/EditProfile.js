import { StyleSheet, Text, View,KeyboardAvoidingView, ScrollView, TextInput,TouchableOpacity, Image } from 'react-native'
import {useState} from 'react'
import colors from '../../assets/colors/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import DropdownComponent from '../../components/DropDown';
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';


const EditProfile = ({navigation, route}) => {
    const fitnessDataMap = {
      1.2: 'Sedentary',
      1.375: 'Lightly active',
      1.55: 'Moderate',
      1.725: 'Very active',
      1.9: 'Extra active',
    };

    const [name, setName] = useState('');
    const [gender, setGender] = useState(String(route.params.genderParam));
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [fitness, setFitness] = useState(fitnessDataMap[String(route.params.fitnessParam)]);
    const [profilePic, setProfilePic] = useState(route.params.profilePicParam);

    console.log(fitness);

    const genderData = [
      { label: 'male', value: 'male' },
      { label: 'female', value: 'female' },
    ];

    const fitnessData = [
        { label: 'Sedentary', value: 1.2 },
        { label: 'Lightly active', value: 1.375 },
        { label: 'Moderate', value: 1.55 },
        { label: 'Very active', value: 1.725},
        { label: 'Extra active', value: 1.9 },
    ];
    const insets = useSafeAreaInsets();
    
    const handleUpdate = async () => {
      if (name && gender && 13<Number(age) && Number(age)<=80 && 130<=Number(height) && Number(height) <=220 &&  30<=Number(weight) && Number(weight) <=200 && fitness) {
        const user = auth.currentUser;
        await setDoc(doc(db, "users", user.uid), {
        name: name,
        gender: gender,
        age: Number(age),
        height: Number(height),
        weight: Number(weight),
        fitness_constant: fitness,
        profilePic: profilePic
        });
        navigation.navigate('Profile')
        alert('Profile Updated !')
    } else {
      alert('Invalid Information keyed. Please try again.')
    }
  }

    return (
      <View style={{
        flex:1,
        paddingTop:insets.top,
        backgroundColor:colors.backgroundColor
      }}
      >
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <Ionicons name="arrow-back" 
          color='black'
          size={30}
          style={{marginLeft:30}}
          />
        </TouchableOpacity>

        <KeyboardAvoidingView>
          <ScrollView>
              <Image
              style={styles.profilePic}
              source={{uri:profilePic}}
              />
              <View style = {styles.itemsWrapper}>
              <Text style = {styles.subtitle}>Name</Text>       

              <TextInput
              style={styles.input}
              autoCapitalize='none'
              autoCorrect = {false}
              selectionColor = {colors.backgroundColor}
              enterKeyHint = "done"
              textAlign = 'center'
              value = {name}
              placeholder={route.params.nameParam}
              onChangeText={text => setName(text)}
              />

              <Text style = {styles.subtitle}>Gender</Text>
              <DropdownComponent 
              data={genderData} 
              dropdownlabel={gender ? gender : 'Select your gender'} 
              icon = 'venus-mars' 
              value={gender}
              setValue={setGender}
              margin={0}
              height={40}
              width={220}
              />  
              <Text style = {styles.subtitle}>Age</Text>

              <TextInput
              style={styles.input}
              autoCorrect = {false}
              selectionColor = {colors.backgroundColor}
              enterKeyHint = "done"
              keyboardType = 'number-pad'
              textAlign = 'center'
              maxLength = {2}
              value = {age}
              placeholder={String(route.params.ageParam)}
              onChangeText={text => setAge(text)}
              />

              <Text style = {styles.subtitle}>Height</Text>

              <TextInput
              style={styles.input}
              autoCapitalize='none'
              autoCorrect = {false}
              selectionColor = {colors.backgroundColor}
              enterKeyHint = "done"
              inputMode = 'numeric'
              textAlign = 'center'
              maxLength = {3}
              value = {height}
              placeholder={String(route.params.heightParam)}
              onChangeText={text => setHeight(text)}
              />
            
              <Text style = {styles.subtitle}>Weight</Text>

              <TextInput
              style={styles.input}
              autoCapitalize='none'
              autoCorrect = {false}
              selectionColor = {colors.backgroundColor}
              enterKeyHint = "done"
              inputMode = 'numeric'
              textAlign = 'center'
              maxLength = {3}
              value = {weight}
              placeholder={String(route.params.weightParam)}
              onChangeText={text => setWeight(text)}
              />
                
              <Text style = {styles.subtitle}>Fitness Level</Text>

              <DropdownComponent 
              data={fitnessData} 
              dropdownlabel={'Select your fitness level'} 
              icon = 'running' 
              value={fitness}
              setValue={setFitness}
              margin={0}
              height={40}
              width={220}
              />

              <TouchableOpacity style={{marginTop:30}}onPress={handleUpdate}>
                <Text style={styles.subtitle}>Save</Text>
              </TouchableOpacity>

              </View>

          </ScrollView>
        </KeyboardAvoidingView>

      </View>
    )
  }

export default EditProfile

const styles = StyleSheet.create({
    itemsWrapper: {
        alignItems: 'center',
      },
      profilePic: {
        height:100,
        width:100,
        alignSelf:'center',
        backgroundColor:'white',
        borderRadius:90,
        borderWidth:3,
        borderColor:'white',
        resizeMode:'cover',
        marginBottom:10
      },
      input: {
        height:40,
        width:220,
        backgroundColor: colors.textFieldColor,
        fontSize: 20,
        fontFamily: "PixeloidSan",
        marginBottom:10

      },
      subtitle: {
        fontFamily: "PixeloidsSanBold",
        fontSize: 15,
        marginBottom:10
      },
})