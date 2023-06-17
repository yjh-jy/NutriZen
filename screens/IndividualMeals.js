import { StyleSheet, Text, View, Pressable, Image, ImageBackground, ScrollView,SafeAreaView,StatusBar } from 'react-native'
import {useState} from 'react'
import colors from '../assets/colors/colors'
import LoadingAnimation from '../components/LoadingAnimation';
import NutrientBar from '../components/NutrientBar';


export default IndividualMeals = ({navigation}) => {

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

    <View style={styles.container}>
    <Image style={styles.foodphoto} source ={require("../assets/images/steak.png")}></Image>


    <ImageBackground name = "Individual Icon" style = {styles.individual} source={require("../assets/images/dailyoverviewbg.png")}>
      
      <Text style = {styles.dailyOverviewText}>Individual Meals</Text>

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
    </View>
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
    fontFamily: 'PixeloidsSanBold',
    marginTop:20
  },

  nutrients:{
    justifyContent:'space-evenly',
    alignItems:'center',
    flexDirection:'column',
    marginTop:30

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