import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput, } from 'react-native';
import {useState} from 'react';
import colors from '../../assets/colors/colors';


export default Onboarding4 = ({navigation, route}) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');


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
              inputMode = 'numeric'
              textAlign = 'center'
              maxLength = {3}
              value = {height}
              onChangeText={text => setHeight(text)}
              >
              </TextInput>

              <Text style = {styles.subtitle}>Height in CM</Text>

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
              onChangeText={text => setWeight(text)}
              >
              </TextInput>
              
              <Text style = {styles.subtitle}>Weight in KG</Text>
              

              <TouchableOpacity onPress={
                ( Number(height) >= 100 && Number(height) <= 220 && Number(weight)>=30 && Number(weight)<= 300 )
                ? () => {
                navigation.navigate('Onboarding5', {
                  heightParam: height, 
                  weightParam: weight, 
                  genderParam: route.params.genderParam,
                  ageParam: route.params.ageParam, 
                  nameParam: route.params.nameParam
                  })}
                : () => {alert('Invalid height/weight')}
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
    marginTop: '70%',

  },
  input: {
    height:49,
    width:200,
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