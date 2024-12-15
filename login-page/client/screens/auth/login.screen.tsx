import { ScrollView, StyleSheet, Text, View,Image, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import { Entypo,Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import CheckBox from "@/components/Checkbox";
import { GradientText } from "@/components/GradientText";

export default function Loginscreen() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [buttonSpinner, setButtonSpinner] = useState(false);
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });
    const [required, setRequired] = useState("");
    const [error,setError] = useState({
      password:"",
    });
    const [isChecked, setIsChecked] = useState(false);
    
    const handlePasswordValidation = (value:string)=>{
      const password = value;
      const passwordSpecialCharecter = /(?=.*[!@#$&*])/;
      const passwordOneNumber = /(?=.*[0-9])/;
      const passwordSixValue = /(?=.{6,})/;

      if(!passwordSpecialCharecter.test(password)){
        setError({
          ...error,
          password:"Write at least one special charecter"
        });
        setUserInfo({...userInfo,password:""});

      }else if(!passwordOneNumber.test(password)){
        setError({
          ...error,
          password:"write atleast one number"
        });
        setUserInfo({...userInfo,password:""});
      }else if(!passwordSixValue.test(password)){
        setError({
          ...error,
          password:"write at least 6 charecters "
        });
        setUserInfo({...userInfo,password:""});
      }else{
        setError({
          ...error,
          password:""
        });
        setUserInfo({...userInfo,password:value})
      }
    };
    const isEmailValid = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  };

  const isFormValid = isEmailValid(userInfo.email) && !error.password && isChecked;
    const handleSignIn = ()=>{
   
    }



  return (
        <SafeAreaView style={{backgroundColor:"#05071E",height:"100%"}}>
          <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={{ flex: 1 }}
              >          
            <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
            <Image style={styles.signInImage} source={require("@/assets/sign-in/sign_in.png")} resizeMode="contain"/>

            <View style={styles.teams}>
              <Image style={styles.teamsImage} source={require("@/assets/sign-in/teamsLogo.png")} resizeMode="contain"/>
              <Text style={[styles.teamsText,{fontFamily:"Raleway_700Bold"}]}>Zapplo Teams</Text>
            </View>

            <View style={styles.input}>
              <Text style={[styles.baseName,{fontFamily:"Nunito_400Regular"}]}>Email Address</Text>
              <TextInput 
              style={[styles.inputSome]}
              value={userInfo.email}
              onChangeText={(value)=>setUserInfo({...userInfo,email:value})}
              placeholder="Email Address"
              placeholderTextColor="#787CA5"
              ></TextInput>
            </View>

            <View style={styles.input}>
              <Text style={[styles.baseName,{fontFamily:"Nunito_400Regular"}]}>Password</Text>
              <TextInput 
              style={styles.inputSome}
              keyboardType="default"
              secureTextEntry={!isPasswordVisible}
              defaultValue=""
              onChangeText={handlePasswordValidation}
              placeholderTextColor="#787CA5"
              placeholder="**********"
              ></TextInput>

              <TouchableOpacity 
              style={styles.visibleIcon}
              onPress={()=>setIsPasswordVisible(!isPasswordVisible)}
              >
              {
                isPasswordVisible ? (
                  <Ionicons  name="eye-off-outline" size={23} color={"#FFFFFF"}/>
                ) : (
                  <Ionicons  name="eye-outline" size={23} color={"#FFFFFF"}/>
                )
              }
              </TouchableOpacity>
            
            </View>

            <TouchableOpacity 
            style={{alignSelf:"flex-end", marginRight:"5%",marginTop:7}}
            onPress={()=>router.push("forgot-password" as any)}
            >
              <Text style={{color:"#FFFFFF",fontSize:10,fontWeight:200}}>Forgot password?</Text>
            </TouchableOpacity>


              {
                error.password && (
                  <View style={styles.errorPassword}>
                    <Entypo name="cross" size={18} color={"red"}/>
                    <Text style={{color:"red",fontSize:10}}>
                      {error.password}
                    </Text>
                    
                  </View>
                )
              }

              <TouchableOpacity
              style={[styles.buttonContainer , {backgroundColor: isFormValid ? "#815BF5" : "#37384B"}]}
              onPress={handleSignIn}
              >

                {
                  buttonSpinner ? (
                      <ActivityIndicator size="small" color={"white"}/>
                    ) : (
                      <Text style={{color:"white",textAlign:"center",fontSize:13,fontFamily:"Railway_700Bold"}}>
                        Login
                      </Text>
                    )
                }
              </TouchableOpacity>

                <View style={styles.terms}>
                  <CheckBox
                  text="By clicking continue, you agree to our Terms of Service and Privacy Policy."
                  isChecked = {isChecked}
                  onPress={()=>setIsChecked(!isChecked)}
                  containerStyle={styles.checkBox}
                  ></CheckBox>
                </View>

                <View style={{display:"flex",flexDirection:"row", gap:2, justifyContent:"flex-end",marginTop:40,alignItems:"center"}}>
                  <Text style={{color:"white" , fontWeight:200, fontSize:12}}>Not a</Text>
                  <GradientText text="Zapllonian"/>
                  <Text style={{color:"white", fontSize:12}}>? </Text>
                  <TouchableOpacity onPress={()=> router.push("/(routes)/signUp" as any)}>
                    <Text style={{color:"white"}}>Register Here</Text>
                  </TouchableOpacity>
                </View>

            </View>
            
            </ScrollView>
          </KeyboardAvoidingView> 
        </SafeAreaView>
        
  );
};

const styles = StyleSheet.create({
  container:{
    width:"100%",
    alignItems:"center",
    height:"100%",
    
  },
  signInImage:{
    height:84,
    width:"55%",
    marginTop:52,
    marginBottom:65
  },
  teams:{
    display:"flex",
    flexDirection:"row",
    gap:5,
    alignItems:"center",
    marginBottom:17,
  },
  teamsImage:{
    height:25
  },
  teamsText:{
    color:"#FFF",
    textAlign:"center",
    fontSize:17
  },
  input:{
    borderWidth: 1,
    borderColor: '#37384B',
    padding: 10,
    marginTop: 25,
    
    borderRadius: 35,
    width:"90%",
    height:57,
    position:"relative"
  },
  baseName:{
    color:"white",
    position:"absolute",
    top:-9,
    left:25,
    backgroundColor:"#05071E",
    paddingRight:5,
    paddingLeft:5,
    fontSize:10,
    fontWeight:200
  },
  inputSome:{
    flex:1,
    padding:8,
    color:"#787CA5",
    fontSize:12
  },
  visibleIcon:{
  
    position:"absolute",
    right:3,
    paddingRight:10,
    top:15
  },

  errorPassword:{
    display:"flex",
    flexDirection:"row",
    gap:2,
    justifyContent:"flex-start",
    alignSelf:"flex-start",
    marginTop:10,
    marginLeft:12
  },

  buttonContainer:{
   
    padding: 10,
    marginTop: 30,
    borderRadius: 35,
    width:"90%",
    height:57,
    alignItems:"center",
    display:"flex",
    justifyContent:"center"

  },
  terms:{

  },
  checkBox:{
    height:100,
    marginBottom:30
  }



});
