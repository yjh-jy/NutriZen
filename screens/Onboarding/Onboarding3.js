import { StyleSheet, Text, View, Pressable, KeyboardAvoidingView, TextInput, } from 'react-native';
import {useState} from 'react';
import colors from '../../assets/colors/colors';


export default Onboarding3 = ({navigation, route}) => {
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
              

              <Pressable onPress={() => {
                navigation.navigate('Onboarding4', {
                  heightParam: height, 
                  weightParam: weight, 
                  ageParam: route.params.ageParam, 
                  nameParam: route.params.nameParam
                  })}}>
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