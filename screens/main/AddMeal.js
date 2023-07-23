import { StyleSheet, Text, View, Pressable, ImageBackground, TouchableOpacity } from 'react-native'
import {useRef, useState, useEffect} from 'react'
import colors from '../../assets/colors/colors';
import { Camera, CameraType } from 'expo-camera';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import LoadingAnimation from '../../components/LoadingAnimation';
import * as ImagePicker from 'expo-image-picker';
import * as tf from '@tensorflow/tfjs'
import { decodeJpeg} from '@tensorflow/tfjs-react-native'
import { getDownloadURL , getStorage, ref } from "firebase/storage";
import * as FileSystem from 'expo-file-system';
import { manipulateAsync } from 'expo-image-manipulator';


export default AddMeal = ({navigation}) => {

  const [model, setModel] = useState(null); // Gets and sets the locally saved Tensorflow.js model
  const [isTfReady, setIsTfReady] = useState(false);
  const [image, setImage] = useState(null);

  const [isLoading, setisLoading] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      if (!isTfReady) {
        await tf.ready(); // Wait for Tensorflow.js to get ready
        setIsTfReady(true);
        const storage = getStorage();
        const modelRef = ref(storage, 'gs://orbital-2af75.appspot.com/meal_detector/model.json');
        const weightsRef = ref(storage, 'gs://orbital-2af75.appspot.com/meal_detector/group1-shard1of1.bin');
        const modelJSON = await getDownloadURL(modelRef);
        const modelWeights = await getDownloadURL(weightsRef);
        const loadedModel = await tf.loadGraphModel(modelJSON, {weightPathPrefix:modelWeights}).catch((e) => {
          alert(e);
        });
        await loadedModel.predict(tf.zeros([1, 224, 224, 3]));
        setModel(loadedModel); // Load the model to the state
      }
    })();
  }, [isTfReady]);
  
  // Camera Helper Functions
  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  };

  const handlePickImage = async () => {
    // No permissions request is necessary for launching the image library
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!response.canceled) {
      const source = response.assets[0];
      setImage(source);
    }
  };

  const handleTakePicture = async () => {
    if (cameraRef) {
      try { 
        const picture = await cameraRef.current.takePictureAsync();
        // Calculate the cropped area
        const width = picture.width;
        const height = picture.height;
        const shorterSide = Math.min(width, height);
        const startingHeight = (height - shorterSide) / 2;
        const startingWidth = (width - shorterSide) / 2;
        // Cropping image
        const cropped_img = await manipulateAsync(
          picture.uri,
          [{crop: {height: shorterSide, originX: startingWidth , originY:startingHeight, width:shorterSide}}],
          );
        setImage(cropped_img);
      } catch (e) {
        alert(e)

      }
    }
  };

  // Image Recognition Helper Functions

   async function imageToTensor(source) {
    const img64 = await FileSystem.readAsStringAsync(source.uri, { encoding: FileSystem.EncodingType.Base64 });
    const imgBuffer = tf.util.encodeString(img64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer);
    let imgTensor = decodeJpeg(raw);
    //resize the image
    imgTensor = tf.image.resizeNearestNeighbor(imgTensor, [224, 224]);
    const img = tf.reshape(imgTensor, [1,224,224,3]);
    imgTensor.dispose();
    return img.toFloat();
  }
  
  const handleInference = async () => {
    setisLoading(true);

    const imageTensor = await imageToTensor(image); // prepare the image
    const predictions = await model.predict(imageTensor); // send the image to the model
    const probabilities = predictions.dataSync();
    const highestPredictionIdx = probabilities.indexOf(Math.max(...probabilities));
    const class_names = require('../../assets/model/class_names.json');
    const prediction = class_names[highestPredictionIdx];
    const probability = (probabilities[highestPredictionIdx]*100).toFixed(2);
    alert(`Likely to be ${prediction} with a ${probability}% probability.`);

    setisLoading(false);

    navigation.navigate('AddMealEntry', {predictionParam: prediction, imageParam:image});
    // Cleaning up the tensors/model to prevent memory leakage
    imageTensor.dispose();
    predictions.dispose();
    model.dispose();
    setIsTfReady(false); // Reset the state to retrigger the useEffect to reload the model if the user backtracks
    console.log(tf.memory());
  };

  // Control Flows
  if (!permission) {
    // Camera permissions are still loading
    return <View/>;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', margin:50, fontSize:12, fontFamily:'PixeloidSan' }}>
          {'We need your permission to show the camera.\n\nPlease also check your privacy settings if you denied the first time'}
          </Text>

        <View style={{flexDirection:'row', justifyContent:'center'}}>

          <TouchableOpacity onPress={requestPermission} style={{ textAlign: 'center', alignSelf:'center',marginHorizontal:10 }} activeOpacity={0.2} underlayColor='transparent'>
            <Text style={{fontFamily:'PixeloidSan'}}> Grant permission</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{navigation.navigate('DailyOverview')}} style={{ textAlign: 'center', alignSelf:'center', marginHorizontal:10}} activeOpacity={0.2} underlayColor='transparent'>
            <Text style={{fontFamily:'PixeloidSan' }}>Go back</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }

  if (isLoading) {
    return <LoadingAnimation caption='Analyzing. . .'/>
  }
  
  return (
    <View style={styles.container}>
      {image ? (
        // If image is set, show the image preview screen
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.backgroundColor }}>
          <ImageBackground source={{ uri: image.uri }} style={{ aspectRatio: 1 / 1, justifyContent: 'space-between' }}>

            <TouchableOpacity onPress={() => {setImage(null)}}>
              <Ionicons
                name="arrow-back-circle-outline"
                color="white"
                size={40}
                style={{ padding: 15, marginTop: 30, marginHorizontal: 10 }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={model ? handleInference : () => {alert('Model is loading. Please wait');}}>
              <FontAwesome5
              name="brain"
              color="white"
              size={35}
              style={{ padding: 15, marginLeft: 330, marginBottom: 30 }}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      ) : (
        // Else, show the camera view
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.topButtons}>
            <TouchableOpacity onPress={() => {navigation.navigate('MainTabs')}}>
              <Ionicons
                name="close-outline"
                color="white"
                size={40}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCameraType}>
              <Ionicons
                name="camera-reverse"
                color="white"
                size={40}
              />
            </TouchableOpacity>
          </View>
  
          <View style={styles.square} />
  
          <View style={styles.bottomButtons}>
            <TouchableOpacity onPress={handlePickImage}>
              <Ionicons
                name="albums"
                color="white"
                size={30}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleTakePicture}>
              <Ionicons
                name="radio-button-off"
                color="white"
                size={80}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1 , 
    justifyContent: 'center', 
    backgroundColor:colors.backgroundColor
  },
  camera: {
    flex:1,
    justifyContent: 'space-between',
    backgroundColor:'transparent'
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color:'transparent',
    padding:15,
    marginTop:40,
    marginHorizontal:10,
  },
  bottomButtons: {
    alignItems:'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft:40,
    marginRight:160,
    marginBottom: 40,

  },
  square: {
    height: 390,
    width: 390,
    borderWidth: 3,
    borderColor: colors.textFieldColor,
    backgroundColor: 'transparent',
    alignSelf:'center',

  },
  text: {
    fontSize: 24,
    fontFamily: 'PixeloidsSanBold',
    fontWeight: 'bold',
    color: 'black',
  },
});