import { StyleSheet, Text, View, Pressable, Image, ImageBackground } from 'react-native'
import {useState, useEffect} from 'react'
import colors from '../../assets/colors/colors'
import LoadingAnimation from '../../components/LoadingAnimation';
import NutrientBar from '../../components/NutrientBar';
import { retrieveRNI } from '../../hooks/retrieveRNI';

export default IndividualMeals = ({navigation, route}) => {

  const [calorie, setCalorie] = useState('lacking1');
  const [sodium, setSodium] = useState('excessive6');
  const [protein, setProtein] = useState('sufficient4');
  const [fibre, setFibre] = useState('excessive12');
  const [fat, setFat] = useState('lacking4');
  const [carbohydrate, setCarbohydrate] = useState('sufficient5');
  const [sugar, setSugar] = useState('lacking5');
  const [cholesterol, setCholesterol] = useState('excessive5');
  const [loading, setLoading] = useState(false);

  const mealNutrients = route?.params?.mealnutrientsParam;
  const imageUri = route?.params?.imageuriParam;
  const prediction = route?.params?.predictionParam;

  const updateNutrientBars = (RNI) => {
    (mealNutrients.calorie / RNI.calorie)
  };

  function rawToState() {
  
  }

  useEffect(() => {
    retrieveRNI()
    .then(
      (data) => { 
        const RNI = data;
        console.log(RNI);
        // updateNutrientBars(RNI);
      }
      );
    }, []);


  const testing = new Date();
  const dateTextWord = `${testing.getDate()}/${testing.getMonth()+1}/${testing.getFullYear()}`; 


  if (loading) {
    return <LoadingAnimation/>
  }

  return (

    <View style={styles.container}>
        <View name = "Top Icon" style = {styles.top}>
          
        <ImageBackground
        source = {require("../../assets/images/datebg.png")} style = {styles.dateBar}>
          <Text className="datetext" style = {styles.dateText}>{dateTextWord}</Text>     
        </ImageBackground>  
        <Pressable  onPress={()=>{navigation.navigate('Calendar')}}>
          <Image style={styles.calendar} source = {require("../../assets/images/calendar.png")}></Image>
        </Pressable>

      </View> 

      <View style={styles.middle}>
        <Pressable onPress={()=>{}}>
          <Image style={styles.foodphoto} source ={{uri: imageUri}} resizeMode='cover'/>
        </Pressable>

        <ImageBackground name = "Individual Icon" style = {styles.individual} source={require("../../assets/images/individualmealsbg.png")}>
          
          <Text style = {styles.individualMealsText}>Individual Meals</Text>

          <Text style = {styles.mealName}>{prediction}</Text>

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
    marginTop:10,
    height:370,
    width:370,
    alignItems:'center',
  },

  foodphoto:{
    height:150,
    width:350,
    borderRadius:55,
  },
  individual:{
    marginTop:30,
    height:450,
    width:360,
    alignItems:'center',
    marginBottom:100,
  },

  individualMealsText: {
    fontFamily: 'MinimalPixel',
    fontSize:37,
    marginTop:10
  },

  mealName: {
    fontFamily: 'PixeloidSan',
    marginTop:30,
    fontSize:15,
    textAlign: 'center'
  },

  nutrients:{
    justifyContent:'space-evenly',
    alignItems:'center',
    flexDirection:'column',
    marginTop:20

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

})