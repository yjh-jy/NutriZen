import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, ImageBackground } from 'react-native'
import {useCallback, useRef, useState} from 'react'
import colors from '../assets/colors/colors'
import { Camera, CameraType } from 'expo-camera';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import LoadingAnimation from './LoadingAnimation';

import * as ImagePicker from 'expo-image-picker';


export default AddMeal = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Pressable onPress={requestPermission} style={{ textAlign: 'center' }}>
          <Text>grant permissions</Text>
        </Pressable>
      </View>
    );
  }
  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  };

  const handlePickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1/1],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleTakePicture = async () => {
    if (cameraRef) {
      try { 
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri)
      } catch (e) {
        console.log(e)
      }
    }
  };
  const handleInference = () => {
    
  };

  if (loading) {
    return <LoadingAnimation/>
  }
  
  return (
    <View style={styles.container}> 
    {!image ?
      <Camera style={styles.camera} type={type} ref={cameraRef}>    
        <View style= {styles.topButtons}>
            <Ionicons name="close-outline" 
            color='white'
            size={40}
            onPress={()=> {navigation.navigate('MainTabs')}} 
            backgroundColor='transparent'
            >
            </Ionicons>

            <Ionicons name="camera-reverse" 
            color='white'
            size={40}
            onPress={toggleCameraType}
            backgroundColor='transparent'
            >
            </Ionicons>
      </View>
      
      <View style={styles.square}/>
      
      <View style= {styles.bottomButtons}>
            <Ionicons name="albums" 
              color='white'
              size={30}
              onPress={handlePickImage}
              >
            </Ionicons>
            <Ionicons name="radio-button-off" 
              color='white'
              size={80}
              onPress={handleTakePicture}
              >
            </Ionicons>
      </View>
    </Camera>
      :
      <View style={{ flex:1 , justifyContent: 'center', backgroundColor:colors.backgroundColor }}>

        <ImageBackground source={{uri : image}}style={{aspectRatio:1/1, justifyContent:'space-between'}}>
        <Ionicons
        name = 'arrow-back-circle-outline'
        color='white'
        size={40}
        onPress={()=>{setImage(null)}}
        style={{padding:15, marginTop:30,marginHorizontal:10}}
        />
        <Ionicons name='hardware-chip-outline'
        color = 'white'
        size={40}
        style={{padding:15, marginLeft:330, marginBottom:30}}
        onPress={handleInference}
        />
        </ImageBackground>
    </View>

    }
    </View>
  )
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
    height: 410,
    width: 415,
    borderWidth: 3,
    borderColor: colors.textFieldColor,
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 24,
    fontFamily: 'PixeloidsSanBold',
    fontWeight: 'bold',
    color: 'black',
  },
});