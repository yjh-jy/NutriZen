import { StyleSheet, Text, View, Pressable, ImageBackground } from 'react-native'
import {useRef, useState, useEffect} from 'react'
import colors from '../assets/colors/colors'
import { Camera, CameraType } from 'expo-camera';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import LoadingAnimation from '../components/LoadingAnimation';
import * as ImagePicker from 'expo-image-picker';
import * as tf from '@tensorflow/tfjs'
import {bundleResourceIO, decodeJpeg} from '@tensorflow/tfjs-react-native'
import * as FileSystem from 'expo-file-system';
import { manipulateAsync } from 'expo-image-manipulator';
import {class_names} from '../assets/model/class_names';


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
        // Bundle the model files and load the model:
        const modelJSON = require('../assets/model/model.json');
        const modelWeights = require('../assets/model/group1-shard.bin');
        const loadedModel = await tf.loadGraphModel(
          bundleResourceIO(modelJSON, modelWeights)
        ).catch((e) => {
          console.log("Error:", e);
        });
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
        alert('Error:', e, 'Please re-check camera permissions.')
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
    const probabilities = await predictions.data();
    const highestPredictionIdx = await probabilities.indexOf(Math.max(...probabilities));
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
        <Text style={{ textAlign: 'center', margin:30, fontFamily:'PixeloidSan' }}>We need your permission to show the camera</Text>
        <Pressable onPress={requestPermission} style={{ textAlign: 'center', alignSelf:'center', }}>
          <Text style={{fontFamily:'PixeloidSan' }}>Press to grant permission</Text>
        </Pressable>
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
            <Ionicons
              name="arrow-back-circle-outline"
              color="white"
              size={40}
              onPress={() => {
                setImage(null);
              }}
              style={{ padding: 15, marginTop: 30, marginHorizontal: 10 }}
            />
  
            <FontAwesome5
              name="brain"
              color="white"
              size={35}
              style={{ padding: 15, marginLeft: 330, marginBottom: 30 }}
              onPress={model ? handleInference : () => {
                alert('Model is loading. Please wait');
              }}
            />
          </ImageBackground>
        </View>
      ) : (
        // Else, show the camera view
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.topButtons}>
            <Ionicons
              name="close-outline"
              color="white"
              size={40}
              onPress={() => {
                navigation.navigate('MainTabs');
              }}
              backgroundColor="transparent"
            />
  
            <Ionicons
              name="camera-reverse"
              color="white"
              size={40}
              onPress={toggleCameraType}
              backgroundColor="transparent"
            />
          </View>
  
          <View style={styles.square} />
  
          <View style={styles.bottomButtons}>
            <Ionicons
              name="albums"
              color="white"
              size={30}
              onPress={handlePickImage}
            />
  
            <Ionicons
              name="radio-button-off"
              color="white"
              size={80}
              onPress={handleTakePicture}
            />
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
    overlayColor:'transparent'
  },
  bottomButtons: {
    alignItems:'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft:40,
    marginRight:160,
    backgroundColor:'transparent',
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