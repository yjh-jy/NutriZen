import { StyleSheet, Text, View, Pressable, KeyboardAvoidingView, TextInput} from 'react-native';
import {useState} from 'react'
import colors from '../../assets/colors/colors';
import {auth} from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import LoadingAnimation from '../../components/LoadingAnimation';

export default PasswordRetrival = ({navigation}) => {
  const [email, enterEmail] = useState('');
  const [isLoading, setisLoading] = useState(false);

  async function resetPassword() {
    setisLoading(true);
    await sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password Reset Email Sent!");
      navigation.navigate("Entrance")
  })
  .catch((error) => alert(error.code));
  setisLoading(false);
  }
  if (isLoading) {
    return <LoadingAnimation/>
  }

  return (
    <View style={styles.container} >
        <KeyboardAvoidingView>
            <View style = {styles.itemsWrapper}>
              <TextInput
              style={styles.input}
              autoCapitalize='none'
              autoCorrect = {false}
              autoComplete='email'
              selectionColor = {colors.backgroundColor}
              placeholder='Enter Email Address'
              enterKeyHint = "done"
              value = {email}
              onChangeText={text => enterEmail(text)}
              >
              </TextInput>


            <Pressable onPress={resetPassword}>
              <Text style = {styles.reset}>Reset</Text>
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
    marginTop: '90%',

  },
  input: {
    height:49,
    width:220,
    backgroundColor: colors.textFieldColor,
    fontSize: 20,
    fontFamily: "PixeloidSan",
    padding:10,
    fontSize: 15
    
  },
  reset: {
    fontFamily: "PixeloidsSanBold",
    fontSize: 20,
    padding:30
  }
})