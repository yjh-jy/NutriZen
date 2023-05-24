import { StyleSheet, Text, View, Pressable, KeyboardAvoidingView, TextInput } from 'react-native';
import {useState} from 'react';
import colors from '../assets/colors/colors';
import { signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase'
import LoadingAnimation from './LoadingAnimation';

export default Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setisLoading] = useState(false)

  async function handleLogin() {
  setisLoading(true);
  await signInWithEmailAndPassword(auth, email, password)
  .catch( error => {
    alert(error.code)
  });
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
              enterKeyHint = "done"
              value = {email}
              onChangeText={text => setEmail(text)}
              >
              </TextInput>

              <Text style = {styles.subtitle}>Email</Text>

              <TextInput
              style={styles.input}
              autoCapitalize='none'
              autoCorrect = {false}
              autoComplete='current-password'
              selectionColor = {colors.backgroundColor}
              enterKeyHint = "done"
              value = {password}
              onChangeText={text => setPassword(text)}
              secureTextEntry
              >
              </TextInput>
              
              <Text style = {styles.subtitle}>Password</Text>
              
              <Pressable onPress={()=>{navigation.push('PasswordRetrival')}}>
                <Text style = {styles.passwordRetrival} >Forget Password?</Text>
                </Pressable> 

              <Pressable onPress={handleLogin}>
                <Text style = {styles.login}>Login</Text>
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
    marginTop: '60%',

  },
  input: {
    height:49,
    width:220,
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
  login: {
    fontFamily: "PixeloidsSanBold",
    fontSize: 20,
    marginTop:40,
  },
  back: {
    fontFamily: "PixeloidsSanBold",
    fontSize: 20,
    marginTop:20,
  },
  passwordRetrival:{
    fontFamily: "PixeloidsSanBold",
    fontSize: 13,
  }

})