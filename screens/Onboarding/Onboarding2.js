import { StyleSheet, Text, View, Pressable, KeyboardAvoidingView, TextInput, } from 'react-native';
import {useState} from 'react';
import colors from '../../assets/colors/colors';


export default Onboarding2 = ({route, navigation}) => {
  const [gender, setGender] = useState('');
  const handleInputChange = (text) => {
    if (text === 'M' || text === 'F') {
      setGender(text);
    }
  };

  return (
    <View style={styles.container}  >
        <KeyboardAvoidingView>
            <View style = {styles.itemsWrapper}>
              <TextInput
              style={styles.input}
              autoCapitalize='none'
              autoCorrect = {false}
              selectionColor = {colors.backgroundColor}
              enterKeyHint = "done"
              inputMode = 'text'
              textAlign = 'center'
              maxLength = {1}
              value = {gender}
              onChangeText={handleInputChange}
              >
              </TextInput>

              <Text style = {styles.subtitle}>Gender</Text>
              

              <Pressable onPress={()=>{navigation.navigate('Onboarding3', {genderParam: gender, nameParam: route.params.nameParam})}}>
                <Text style = {styles.proceed}>Proceed</Text>
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