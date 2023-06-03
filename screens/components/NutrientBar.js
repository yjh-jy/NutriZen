import { StyleSheet, Text, View, Image } from 'react-native'

export default function NutrientBar({name, tier}) {
    let src = require('../../assets/gifs/lacking/lacking1.gif');
    switch(tier) {
      case 'lacking1':
      src = require('../../assets/gifs/lacking/lacking1.gif');
      break
      case 'lacking2':
      src = require('../../assets/gifs/lacking/lacking2.gif');
      break
      case 'lacking3':
      src = require('../../assets/gifs/lacking/lacking3.gif');
      break
      case 'lacking4':
      src = require('../../assets/gifs/lacking/lacking4.gif');
      break
      case 'lacking5':
      src = require('../../assets/gifs/lacking/lacking5.gif');
      break
      case 'lacking6':
      src = require('../../assets/gifs/lacking/lacking6.gif');
      break
      case 'lacking7':
      src = require('../../assets/gifs/lacking/lacking7.gif');
      break
      case 'lacking8':
      src = require('../../assets/gifs/lacking/lacking8.gif');
      break
      case 'lacking9':
      src = require('../../assets/gifs/lacking/lacking9.gif');
      break
      case 'lacking10':
      src = require('../../assets/gifs/lacking/lacking10.gif');
      break
      case 'lacking11':
      src = require('../../assets/gifs/lacking/lacking11.gif');
      break
  
      case 'sufficient1':
      src = require('../../assets/gifs/sufficient/sufficient1.gif');
      break
      case 'sufficient2':
      src = require('../../assets/gifs/sufficient/sufficient2.gif');
      break
      case 'sufficient3':
      src = require('../../assets/gifs/sufficient/sufficient3.gif');
      break
      case 'sufficient4':
      src = require('../../assets/gifs/sufficient/sufficient4.gif');
      break
      case 'sufficient5':
      src = require('../../assets/gifs/sufficient/sufficient5.gif');
      break
      case 'sufficient6':
      src = require('../../assets/gifs/sufficient/sufficient6.gif');
      break
      case 'sufficient7':
      src = require('../../assets/gifs/sufficient/sufficient7.gif');
      break
      case 'sufficient8':
      src = require('../../assets/gifs/sufficient/sufficient8.gif');
      break
      case 'sufficient9':
      src = require('../../assets/gifs/sufficient/sufficient9.gif');
      break
      case 'sufficient10':
      src = require('../../assets/gifs/sufficient/sufficient10.gif');
      break
      case 'sufficient11':
      src = require('../../assets/gifs/sufficient/sufficient11.gif');
      break
      case 'sufficient12':
      src = require('../../assets/gifs/sufficient/sufficient12.gif');
      break
        
      case 'excessive1':
      src = require('../../assets/gifs/excessive/excessive1.gif');
      break
      case 'excessive2':
      src = require('../../assets/gifs/excessive/excessive2.gif');
      break
      case 'excessive3':
      src = require('../../assets/gifs/excessive/excessive3.gif');
      break
      case 'excessive4':
      src = require('../../assets/gifs/excessive/excessive4.gif');
      break
      case 'excessive5':
      src = require('../../assets/gifs/excessive/excessive5.gif');
      break
      case 'excessive6':
      src = require('../../assets/gifs/excessive/excessive6.gif');
      break
      case 'excessive7':
      src = require('../../assets/gifs/excessive/excessive7.gif');
      break
      case 'excessive8':
      src = require('../../assets/gifs/excessive/excessive8.gif');
      break
      case 'excessive9':
        src = require('../../assets/gifs/excessive/excessive9.gif');
        break
      case 'excessive10':
      src = require('../../assets/gifs/excessive/excessive10.gif');
      break
      case 'excessive11':
      src = require('../../assets/gifs/excessive/excessive11.gif');
      break
      case 'excessive12':
      src = require('../../assets/gifs/excessive/excessive12.gif');
      break
    }
  
    return (
      <View style= {styles.nutrientBar}>
        <Image style = {styles.gif} source = {src}></Image>
      <Text style = {styles.nutrientName}>{name}</Text>
    </View>
    )
  }

const styles = StyleSheet.create({
  nutrientBar:{
    flexDirection:'column',
    alignItems:'center',
  },
  gif: {
    height:67,
    width: 130,
  },
  nutrientName: {
    fontFamily: 'PixeloidSan',
    position:'absolute',
    marginTop:45,
    fontSize:10
  },
})