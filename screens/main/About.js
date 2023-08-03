import { Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import colors from '../../assets/colors/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome5';

const Question = ({question, answer}) => {
  const [pressed, setPressed] = useState(false);

  return (
    <View>
      <Pressable style={styles.questionWrapper} onPress={()=>{setPressed(!pressed)}}>
        <Text style={styles.questionText}>{question}</Text>
        {pressed ? <FontAwesome name='caret-up'size={22} /> : <FontAwesome name = 'caret-down' size={22}/>}
      </Pressable>
      { pressed ? <Text style={styles.answerText}>{answer}</Text> : null }
    </View>
  )
}

export default About = ({navigation}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{
      flex:1,
      paddingTop:insets.top,
      backgroundColor:colors.backgroundColor,
      
    }}>
      <View style={styles.header}>
        <Text style={styles.headerText}> Frequently Asked Questions</Text>
        <TouchableOpacity onPress={()=>{navigation.navigate('Profile')}}>
          <FontAwesome name='times' size={25} />
        </TouchableOpacity>
      </View>

      <Question question = 'What is Nutrizen ?' answer = 'Nutrizen is a nutrition tracking app that helps you visualize your daily and individual meals in a fun and concise way.'/>
      <Question question = 'What do the bars mean ?' answer = {'Each bar represent a nutrient, with 3 main segements: Lacking, Sufficient & Excessive. The goal is the stay within the Sufficient range for every nutrient.\n\nA quick way to know would be to observe the changes in our mascot Nutri expression !'}/>
      <Question question = 'How do I view past meal logs ?' answer = 'Click on the top right icon in the DailyOverview screen (Home Screen) and select a past date to travel to'/>
      <Question question = 'Additional queries or feedback ?' answer = {'Feel free to contact us at: \n\njunhanyoong@gmail.com\n\nroderichsuwandi@gmail.com'}/>

    </View>
  )
}


const styles = StyleSheet.create({
  aboutWrapper:{
    marginHorizontal:10
  },
  header:{
    marginBottom:25,
    marginTop:10,
    flexDirection:'row', 
    justifyContent:'space-between',
    marginHorizontal:17
    
  },
  headerText:{
    fontFamily:'PixeloidSan',
    fontSize:19,
  },
  questionWrapper: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:19,
    marginVertical:3
  },
  answerText: {
    fontFamily:'PixeloidSan',
    fontSize:12,
    marginHorizontal:20,
    marginVertical:10,
    letterSpacing:1.3
  },
  questionText: {
    fontFamily:'PixeloidSan',
    fontSize:15,
    letterSpacing:1.1,
    color:'#BB3274',
  }

})