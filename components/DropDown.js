import React from 'react';
import { StyleSheet, } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import colors from '../assets/colors/colors';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const DropdownComponent = ({data, dropdownlabel, icon, setValue, value, height=50,width=300,margin=10, alignSelf='center'}) => {

  return (
    <Dropdown
      style={{
        margin: margin,
        height: height,
        width:width,
        borderBottomColor: colors.textFieldColor,
        borderBottomWidth: 3,
        backgroundColor:colors.textFieldColor,
        alignSelf:alignSelf
      }}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      keyboardAvoiding={true}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={dropdownlabel}
      searchPlaceholder="Search..."
      value={value}
      autoScroll={false}
      onChange={item => {
        setValue(item.value);
      }}
      renderLeftIcon={() => (
        <FontAwesome5 style={styles.icon} color="black" name={icon} size={20} />
      )}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
    marginLeft:15
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'PixeloidSan',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'PixeloidSan',
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight:20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});