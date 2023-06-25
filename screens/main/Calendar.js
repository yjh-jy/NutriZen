import { StyleSheet, Text, View, SafeAreaView, Pressable, Image } from 'react-native'
import * as SplashScreen from 'expo-splash-screen';
import colors from '../../assets/colors/colors'
import CalendarPicker from 'react-native-calendar-picker';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default Calendar = ({navigation}) => {
  const today = new Date();
  const [date, setDate] = useState(null);
  const insets = useSafeAreaInsets();
  const selectedDate = date
    ? date.format('DD-M-YYYY').toString()
    : '';
  const dateArray = selectedDate.split('-');

  if (date) {
    navigation.navigate('IndividualMeals', {dateParams: dateArray})
  }
  
  return (
    <View style= {{
      flex:1,
      backgroundColor:colors.textFieldColor,
      paddingTop:insets.top,
      paddingBottom:insets.bottom,
      paddingLeft:insets.left,
      paddingRight:insets.right,
      justifyContent:'center',
      alignItems:'center'
    }}>
      <CalendarPicker
      selectedDayColor={colors.textFieldColor}
      onDateChange={setDate}
      maxDate={today}
      weekdays={['日','月','火','水','木','金','土']}
      textStyle={{fontFamily:'PixeloidSan', fontSize:15}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: colors.backgroundColor,
  },
  signOut:{
    fontFamily: "PixeloidsSanBold",
    fontSize: 13,
    alignSelf: 'center',
    marginTop: 30
    
  }
})