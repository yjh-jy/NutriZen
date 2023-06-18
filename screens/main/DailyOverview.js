import { StyleSheet, Text, View, Pressable, Image, ImageBackground, ScrollView } from 'react-native'
import {useState} from 'react'
import colors from '../../assets/colors/colors'
import LoadingAnimation from '../../components/LoadingAnimation';
import NutrientBar from '../../components/NutrientBar';
import IndividualMeals from './IndividualMeals';

export default DailyOverview = ({navigation}) => {

  const [calorie, setCalorie] = useState('lacking4');
  const [sodium, setSodium] = useState('excessive6');
  const [protein, setProtein] = useState('sufficient4');
  const [fibre, setFibre] = useState('excessive12');
  const [fat, setFat] = useState('lacking4');
  const [carbohydrate, setCarbohydrate] = useState('sufficient5');
  const [sugar, setSugar] = useState('lacking5');
  const [cholesterol, setCholesterol] = useState('excessive5');
  const [loading, setLoading] = useState(false);

  const testing = new Date();
  const dateTextWord = `${testing.getDate()}/${testing.getMonth()+1}/${testing.getFullYear()}`; 

  if (loading) {
    return <LoadingAnimation/>
  }

  return (
    
    <ScrollView>
      
    <View style= {styles.container}>
      
        <View name = "Top Icon" style = {styles.top}>
          
        <ImageBackground
        source = {require("../../assets/images/datebg.png")} style = {styles.dateBar}>
          <Text className="datetext" style = {styles.dateText}>{dateTextWord}</Text>     
        </ImageBackground>  
        <Pressable  onPress={()=>{navigation.navigate('Calendar')}}>
          <Image style={styles.calendar} source = {require("../../assets/images/calendar.png")}></Image>
        </Pressable>
        </View> 

      <ImageBackground name = "Middle Icon" style = {styles.middle} source={require("../../assets/images/dailyoverviewbg.png")}>
        
          <Text style = {styles.dailyOverviewText}>Daily Overview</Text>

          <View name= "Nutrient Bars" style={styles.nutrients}>
            <View name = "Row1" style= {styles.nutrientRow}>
                <NutrientBar name='Calorie' tier={calorie}/>
                <NutrientBar name='Sodium' tier={sodium}/>
            </View>
            <View name = "Row2" style= {styles.nutrientRow}>
                <NutrientBar name='Protein' tier={protein}/>
                <NutrientBar name='Fibre' tier={fibre}/>
            </View>
            <View name = "Row3" style= {styles.nutrientRow}>
                <NutrientBar name='Fat' tier={fat}/>
                <NutrientBar name='Carbohydrate'tier={carbohydrate}/>
            </View>
            <View name = "Row4" style= {styles.nutrientRow}>
                <NutrientBar name='Sugar' tier={sugar}/>
                <NutrientBar name='Cholesterol'tier={cholesterol}/>
            </View>
          </View>

      </ImageBackground>


      <View name = "Bottom Icon" style ={styles.bottom}>
          <Image style = {styles.creature} source = {require("../../assets/images/creature.png")}></Image>
          <ImageBackground style = {styles.textbox} source = {require("../../assets/images/advicebg.png")}>
            <Text style={styles.text}>
              High on Fats{'\n'}
              Cut down on fried foods{'\n'}
              High on Calories{'\n'}
              Cut down on starchy foods such as rice and pasta
              </Text>
          </ImageBackground>
      </View>

      <IndividualMeals/>



    
    </View>
    
    </ScrollView>

    
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems:'center',
  },

  top:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:50,    
  },

  dateBar:{
    alignItems:'center',
    width:290,
    height:55,
    justifyContent:'center',
  },

  dateText: {
    fontFamily: 'PixeloidsSanBold',
    fontSize:15
  },

  calendar: {
    height:70,
    width:70,
  },

  middle:{
    marginTop:20,
    height:370,
    width:370,
    alignItems:'center',
  },

  dailyOverviewText: {
    fontFamily: 'MinimalPixel',
    fontSize:37,
    marginTop:13
  },

  nutrients:{
    justifyContent:'space-evenly',
    alignItems:'center',
    flexDirection:'column',
    marginTop:27

  },
  nutrientRow:{
    justifyContent:'space-evenly',
    flexDirection:'row'
  },

  bottom: {
    alignItems: 'center',
    justifyContent:'space-between',
    paddingHorizontal:15,
    marginTop:20,
  },
  creature:{
    height:60,
    width:120,
  },

  textbox: {
    height:175,
    width:340,
    marginTop:-20,
    justifyContent:'flex-start',
    alignItems:'center',
  },
  text:{
    marginTop:'10%',
    fontFamily:'PixeloidSan',
    fontSize:12,
    textAlign:'center',
    width:'75%',
    height:'70%',
  },

  individual:{
    marginTop:20,
    height:370,
    width:370,
    alignItems:'center',
    marginBottom:100,
  },
  
  foodphoto:{
    height:200,
    width:300,
    marginTop:150,
    borderRadius:75,

  },
})