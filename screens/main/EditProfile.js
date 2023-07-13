import { StyleSheet, Text, View,KeyboardAvoidingView, ScrollView, TextInput } from 'react-native'
import {useState} from 'react'
import colors from '../../assets/colors/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import DropdownComponent from '../../components/DropDown';

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
    return (
      <View style={{
          flex:1,
          paddingTop:insets.top,
          backgroundColor:colors.backgroundColor
      }}
      >
        <Ionicons name="arrow-back" 
        color='black'
        size={30}
        style={{marginLeft:30}}
        onPress={()=>{navigation.goBack()}}
        />
        <KeyboardAvoidingView>
        <ScrollView>
            <View style = {styles.itemsWrapper}>
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
              >
              </TextInput>

              <Text style = {styles.subtitle}>Name</Text>       

            <DropdownComponent 
              data={genderData} 
              dropdownlabel={gender ? gender : 'Select your gender'} 
              icon = 'venus-mars' 
              value={gender}
              setValue={setGender}
              margin={20}
              height={40}
              width={200}
              />  
              <Text style = {styles.subtitle}>Gender</Text>

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
              >
              </TextInput>

              <Text style = {styles.subtitle}>Age</Text>

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
              >
              </TextInput>

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
              value = {weight}
              placeholder={String(route.params.weightParam)}
              onChangeText={text => setWeight(text)}
              >
              </TextInput>
              
              <Text style = {styles.subtitle}>Weight</Text>
              <DropdownComponent 
              data={fitnessData} 
              dropdownlabel={fitness ? fitness : 'Select your fitness level'} 
              icon = 'running' 
              value={fitness}
              setValue={setFitness}
              style={{marginLeft:-10}}
              margin={20}
              height={40}
              width={200}
              />
              <Text style = {styles.subtitle}>Fitness Level</Text>


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
        justifyContent: 'center',
        margin:30   
      },
      input: {
        height:40,
        width:200,
        backgroundColor: colors.textFieldColor,
        fontSize: 20,
        fontFamily: "PixeloidSan",
        padding:10
        
      },
      subtitle: {
        fontFamily: "PixeloidsSanBold",
        fontSize: 15,
        padding:20
      },
})