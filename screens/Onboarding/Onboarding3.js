import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
import {useState} from 'react';
import colors from '../../assets/colors/colors';


export default Onboarding3 = ({route, navigation}) => {
  const [age, setAge] = useState('');

  return (
    <View style={styles.container}  >
        <KeyboardAvoidingView>
            <View style = {styles.itemsWrapper}>
              <TextInput
              style={styles.input}
              autoCorrect = {false}
              selectionColor = {colors.backgroundColor}
              enterKeyHint = "done"
              keyboardType = 'number-pad'
              textAlign = 'center'
              maxLength = {2}
              value = {age}
              onChangeText={text => setAge(text)}
              >
              </TextInput>

              <Text style = {styles.subtitle}>Age</Text>
              

              <TouchableOpacity 
              onPress={
                (age !== '' && Number(age) >= 13)
                ? ()=>{navigation.navigate('Onboarding4', {ageParam: age, genderParam: route.params.genderParam, nameParam: route.params.nameParam})}
                : () => {alert('Invalid age')}
                }>
                <Text style = {styles.proceed}>Proceed</Text>
                </TouchableOpacity>

              <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                <Text style = {styles.back} >Back</Text>
                </TouchableOpacity>
              
              

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
    marginVertical: '80%',

  },
  input: {
    height:49,
    width:150,
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