import { StyleSheet, Text, View, Pressable, Image, ImageBackground, Alert, FlatList , Modal, TouchableOpacity} from 'react-native'
import {useState, useEffect, useCallback} from 'react'
import colors from '../../assets/colors/colors'
import NutrientBar from '../../components/NutrientBar';
import { retrieveRNI } from '../../hooks/retrieveRNI';
import { retrieveMeals } from '../../hooks/retrieveMeals';
import { updateNutrientBars } from '../../hooks/updateNutrientBars';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Filesystem from 'expo-file-system';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../firebase';

export default IndividualMeals = ({navigation, route}) => {
  const insets = useSafeAreaInsets(); // safearea view
  const [mealsData, setMealsData] = useState(null); //flatlist data
  const [expandImage, setExpandImage] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused(); // hook that returns a boolean when screen focus changes

  const dateArray = route?.params?.dateParams // Prop from Calendar
  const date = dateArray // checks if user is entering from DailyOveriew or from Calendar 
    ? new Date(+dateArray[2], +dateArray[1] -1, +dateArray[0]) 
    : new Date();
  const todayDateString = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
  
  useEffect(() => {
    if (refreshing || isFocused) { // only queries the backend when necessary
    const fetchData = async () => {
      let [retrievedRNI, retrievedMeal] = await Promise.all([retrieveRNI(), retrieveMeals(date)]);
      const mealsDataContainer = [];
      retrievedMeal.forEach((meal) => {
          const calories = updateNutrientBars(retrievedRNI, 'calories', meal?.nutrients.calories);
          const sodium = updateNutrientBars(retrievedRNI, 'sodium', meal?.nutrients.sodium_mg /1000);
          const protein = updateNutrientBars(retrievedRNI, 'protein', meal?.nutrients.protein_g);
          const fibre = updateNutrientBars(retrievedRNI, 'fibre', meal?.nutrients.fiber_g);
          const fat = updateNutrientBars(retrievedRNI, 'fat', meal?.nutrients.fat_total_g);
          const carbohydrate = updateNutrientBars(retrievedRNI, 'carbohydrate', meal?.nutrients.carbohydrates_total_g);
          const sugar = updateNutrientBars(retrievedRNI, 'sugar', meal?.nutrients.sugar_g);
          const cholesterol = updateNutrientBars(retrievedRNI, 'cholesterol', meal?.nutrients.cholesterol_mg /1000);
          const imageUri = meal?.imageuri;
          const prediction = meal?.name;
          mealsDataContainer.push(
            {
              calories: calories,
              sodium: sodium,
              protein: protein,
              fibre: fibre,
              fat: fat,
              carbohydrate: carbohydrate,
              sugar: sugar,
              cholesterol: cholesterol,
              prediction: prediction,
              mealNutrients: meal.nutrients,
              imageuri: imageUri
            }
          );
        });
      mealsDataContainer.reverse()
      setMealsData(mealsDataContainer);
    };
    fetchData();
  }
  
  }, [refreshing, isFocused]); // dependecies array ensures that useEffet triggers whenever there is a change in BOTH state variables

  // shows a haiku when there is no meals logged to motivate user
  const handleEmptyList = () => {
    return(
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <ImageBackground name="Individual Icon" style={styles.individualMealsScroll} source={require("../../assets/images/individualmealsbg.png")}>
          <Text style={{fontFamily:'MinimalPixel', fontSize:30, textAlign:'center', marginTop:110}}>
            {'Capture each meal,\n\n\n\nForge your path to victory,\n\n\n\n Nutrition conquers.'}
          </Text>
        </ImageBackground>
      </View>
    )
  };

  const renderIndividualMeal = useCallback(({item}) => {

    const calories = (item.calories);
    const sodium = (item.sodium);
    const protein = (item.protein);
    const fibre = (item.fibre);
    const fat = (item.fat);
    const carbohydrate = (item.carbohydrate);
    const sugar = (item.sugar);
    const cholesterol = (item.cholesterol);
    const mealNutrients = (item.mealNutrients);
    const imageUri = (item.imageuri);
    const prediction = (item.prediction);

    const handleDeleteMeal = () =>
      Alert.alert('Delete Meal ?', 'This action is IRREVERSIBLE', [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'Delete', onPress: () => {
          (async () => {
          const user = auth.currentUser;
          const mealsRef = collection(db, "users", user.uid, "meals");
          const mealsQuery = query(mealsRef, where('imageuri', '==', imageUri));
          const querySnapshot = await getDocs(mealsQuery);
          querySnapshot.forEach(async (docu) => {
            await deleteDoc(doc(db, "users", user.uid, "meals", docu.id));
            await Filesystem.deleteAsync(imageUri);
          });
          setRefreshing(!refreshing);
          })();
        }
      },
      ]);
    // returns a modal view of the full-size image when the image is pressed
    if (expandImage) {
      return (
        <Modal 
        animationType = 'fade'
        style={{justifyContent:'center', alignItems:'center', flex:1}}
        transparent={true}
        >
          <Pressable onPress={()=>{setExpandImage(false)}}>
            <Image
            source={{uri: imageUri}}
            style={{height: 440, width:440, marginVertical:'50%', alignSelf:'center'}}
            />
          </Pressable>
            
        </Modal>
      )
    }
      
    return (
      <View style={styles.middleIconsWrapper}>
        <TouchableOpacity onPress={()=>{setExpandImage(true)}} activeOpacity={0.7}>
          <Image style={styles.foodPhoto} source={{ uri: imageUri }} resizeMode="cover" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDeleteMeal}>
            <Image
            source={require('../../assets/images/deletemealbutton.png')}
            style={styles.deleteButton} 
            />
          </TouchableOpacity>

        <ImageBackground name="Individual Icon" style={styles.individualMealsScroll} source={require("../../assets/images/individualmealsbg.png")}>
          
          <Text style={styles.individualMealsText}>Individual Meals</Text>

          <Text style={styles.mealName}>{prediction}</Text>

          <View name="Nutrient Bars" style={styles.nutrients}>
            <View name="Row1" style={styles.nutrientRow}>
              <NutrientBar name={`calories: ${mealNutrients?.calories.toFixed(1)}`} tier={calories} />
              <NutrientBar name={`sodium: ${(mealNutrients?.sodium_mg).toFixed(1)}mg`} tier={sodium} />
            </View>
            <View name="Row2" style={styles.nutrientRow}>
              <NutrientBar name={`protein: ${mealNutrients?.protein_g.toFixed(1)}g`} tier={protein} />
              <NutrientBar name={`fibre: ${mealNutrients?.fiber_g.toFixed(1)}g`} tier={fibre} />
            </View>
            <View name="Row3" style={styles.nutrientRow}>
              <NutrientBar name={`fat: ${mealNutrients?.fat_total_g.toFixed(1)}g`} tier={fat} />
              <NutrientBar name={`carbohydrate: ${mealNutrients?.carbohydrates_total_g.toFixed(1)}g`} tier={carbohydrate} />
            </View>
            <View name="Row4" style={styles.nutrientRow}>
              <NutrientBar name={`sugar: ${mealNutrients?.sugar_g.toFixed(1)}g`} tier={sugar} />
              <NutrientBar name={`cholesterol: ${mealNutrients?.cholesterol_mg.toFixed(1)}mg`} tier={cholesterol} />
            </View>
          </View>
        </ImageBackground>
      </View>

    )
  });
  

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.backgroundColor,
      alignItems:'center',
      paddingTop: insets.top,
      }}>
        <View name = "Top Icons" style = {styles.topIconsWrapper}>
          <ImageBackground
          source = {require("../../assets/images/datebg.png")} style = {styles.dateBar}>
            <Text className="datetext" style = {styles.dateText}>{todayDateString}</Text>     
          </ImageBackground>
          
          <TouchableOpacity  onPress={()=>{navigation.navigate('Calendar')}}>
            <Image style={styles.calendar} source = {require("../../assets/images/calendar.png")}></Image>
          </TouchableOpacity>
        </View>
        
        <FlatList
        data={mealsData}
        horizontal={true}
        renderItem={renderIndividualMeal}
        ListEmptyComponent={handleEmptyList}
        maxToRenderPerBatch={2}
        style={{marginHorizontal:17}}
        />
      
    </View>
  )
}

const styles = StyleSheet.create({

  topIconsWrapper:{
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
  deleteButton: {
    marginTop:10,
    height:30,
    width:30,
    marginLeft:300,
    
  },

  middleIconsWrapper:{
    marginTop:10,
    paddingHorizontal:10,
  },

  foodPhoto:{
    height:150,
    width:350,
    borderRadius:55,
  },
  individualMealsScroll:{
    marginTop:-11,
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
    flexDirection:'row',
    marginTop:4
  }

})