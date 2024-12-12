import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

interface gradientProps {
    text:string;
    textStyle?:object
}

export const GradientText: React.FC<gradientProps> =   ({text,textStyle}) => {
  return (
    <MaskedView maskElement={<Text style={[textStyle,{backgroundColor:"trasparent"}]}>{text}</Text>}>
      <LinearGradient
        start={{x:0,y:0}}
        end={{x:1,y:1}}
        colors={["#815BF5","#FC8929"]}
      >
        <Text style={[textStyle,{opacity:0}]}>{text}</Text>

      </LinearGradient>
    </MaskedView>

    
  );
}

const styles = StyleSheet.create({});
