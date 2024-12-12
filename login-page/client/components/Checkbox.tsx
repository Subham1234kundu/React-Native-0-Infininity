import { Entypo } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Animated } from 'react-native';


interface CheckboxProps {
  text: any;
  onPress: () => void;
  isChecked: boolean;
  containerStyle?: object;
  textStyle?: object;
  checkboxStyle?: object;
}

const Checkbox: React.FC<CheckboxProps> = ({
  text,
  onPress,
  isChecked,
  containerStyle,
  textStyle,
  checkboxStyle,
}) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    const toValue = isChecked ? 0 : 30;
    Animated.timing(animatedWidth, {
      toValue: toValue,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        onPress={() => {
          startAnimation();
          onPress();
        }}
        style={[
          styles.checkbox,
          isChecked && styles.checkboxSelected,
          checkboxStyle,
        ]}>
        <Animated.View style={{ width: animatedWidth }}>
          <Entypo name="check" size={25} style={{ color: '#815BF5' }} />
        </Animated.View>
      </TouchableOpacity>
      <Text style={[styles.checkboxText, textStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    backgroundColor:"#37384B",
    borderWidth: 1,
    borderRadius: 5,
    height: 25,
    width: 25,
  },
  checkboxSelected: {
    backgroundColor: '#37384B',
  },
  checkboxText: {
    fontSize: 11,
    marginLeft: 10,
    color:"white",
    fontWeight:"200",
    paddingLeft:5
  },
});

export default Checkbox;