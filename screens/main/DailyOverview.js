import { StyleSheet, Text, View, Pressable, Image, ImageBackground, FlatList, SafeAreaView, TouchableHighlight, TouchableOpacity } from 'react-native'
import {useCallback, useEffect, useState} from 'react'
import colors from '../../assets/colors/colors'
import NutrientBar from '../../components/NutrientBar';
import { retrieveRNI } from '../../hooks/retrieveRNI';
import { retrieveMeals } from '../../hooks/retrieveMeals';
import { updateNutrientBars } from '../../hooks/updateNutrientBars';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default DailyOverview = ({navigation}) => {
  const insets = useSafeAreaInsets(); // safearea view
  // nutrient bar states
  const [calorie, setCalorie] = useState('lacking1');
  const [sodium, setSodium] = useState('lacking1');
  const [protein, setProtein] = useState('lacking1');
  const [fibre, setFibre] = useState('lacking1');
  const [fat, setFat] = useState('lacking1');
  const [carbohydrate, setCarbohydrate] = useState('lacking1');
  const [sugar, setSugar] = useState('lacking1');
  const [cholesterol, setCholesterol] = useState('lacking1');

  const date = new Date();
  const todayDateString = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
  const [refreshing, setRefreshing] = useState(false);

  // Pull to refresh and updates the nutrient bars for DailyOverview
  useEffect(() => {
    if (refreshing) {
      const fetchData = async () =>  {
        const [retrievedRNI, retrievedMeal] = await Promise.all([retrieveRNI(), retrieveMeals(date)]);

        let calories = 0;
        let sodium = 0;
        let protein = 0;
        let fiber = 0;
        let fat = 0;
        let carbohydrate = 0;
        let sugar = 0;
        let cholesterol = 0;
        retrievedMeal.forEach((meal) => {
          calories += meal?.nutrients.calories;
          sodium += meal?.nutrients.sodium_mg;
          protein += meal?.nutrients.protein_g;
          fiber += meal?.nutrients.fiber_g;
          fat += meal?.nutrients.fat_total_g;
          carbohydrate += meal?.nutrients.carbohydrates_total_g;
          sugar += meal?.nutrients.sugar_g;
          cholesterol += meal?.nutrients.cholesterol_mg
          });
        setCalorie(updateNutrientBars(retrievedRNI, 'calories',calories));
        setSodium(updateNutrientBars(retrievedRNI, 'sodium', sodium/1000));
        setProtein(updateNutrientBars(retrievedRNI, 'protein', protein));
        setFibre(updateNutrientBars(retrievedRNI, 'fibre', fibre));
        setFat(updateNutrientBars(retrievedRNI, 'fat',fat));
        setCarbohydrate(updateNutrientBars(retrievedRNI, 'carbohydrate',carbohydrate));
        setSugar(updateNutrientBars(retrievedRNI, 'sugar', sugar));
        setCholesterol(updateNutrientBars(retrievedRNI, 'cholesterol', cholesterol /1000));
        // set the refreshing back to false
        setRefreshing(false);
      };
      fetchData();
    }
  }, [refreshing]);

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    },
  ];

  const renderDailyOverview = useCallback(() => {
    return (
    <View style={{
      flex: 1,
      backgroundColor: colors.backgroundColor,
      alignItems:'center',
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right
      }}>
        <View name="Top Icon" style={styles.top}>
          <ImageBackground source={require("../../assets/images/datebg.png")} style={styles.dateBar}>
            <Text className="datetext" style={styles.dateText}>
              {todayDateString}
            </Text>
          </ImageBackground>
          <TouchableOpacity onPress={() => { navigation.navigate('Calendar') }}>
            <Image style={styles.calendar} source={require("../../assets/images/calendar.png")} />
          </TouchableOpacity>
        </View>
    
      <ImageBackground name="Middle Icon" style={styles.middle} source={require("../../assets/images/dailyoverviewbg.png")}>
        <Text style={styles.dailyOverviewText}>Daily Overview</Text>
    
        <View name="Nutrient Bars" style={styles.nutrients}>
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
            <NutrientBar name='carbohydrate' tier={carbohydrate}/>
          </View>
          <View name = "Row4" style= {styles.nutrientRow}>
            <NutrientBar name='Sugar' tier={sugar}/>
            <NutrientBar name='Cholesterol' tier={cholesterol}/>
          </View>
        </View>
      </ImageBackground>
    
      <View name="Bottom Icon" style={styles.bottom}>
        <TouchableOpacity onPress={()=>{navigation.navigate('IndividualMeals')}} activeOpacity={0.6}>
        <Image style={styles.creature} source={require("../../assets/images/creature.png")} />
        </TouchableOpacity>
        <ImageBackground style={styles.textbox} source={require("../../assets/images/advicebg.png")}>
          <Text style={styles.adviceText}>
            High on Cholesterol{'\n'}
            Cut down on fried food. Eat more omega-3 foods{'\n'}
            High on Protein{'\n'}
            Cut down on meat or beans. Eat more fruits/vegetable
          </Text>
        </ImageBackground>
      </View>
    </View>
    )});


  return (
    <FlatList
    data={DATA}
    renderItem={renderDailyOverview}
    refreshing={refreshing}
    onRefresh={() => setRefreshing(true)}
    style={{backgroundColor:colors.backgroundColor}}
    />

  )
}

const styles = StyleSheet.create({
  top:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',    
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
  adviceText:{
    marginTop:'10%',
    fontFamily:'PixeloidSan',
    fontSize:12,
    textAlign:'center',
    width:'75%',
    height:'70%',
  },

})