import { ScrollView, StyleSheet, Text, View,Image, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import { Entypo,Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { GradientText } from "@/components/GradientText";
import { Dropdown } from 'react-native-element-dropdown';

export default function SignUpscreen() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [buttonSpinner, setButtonSpinner] = useState(false);
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error,setError] = useState({
      password:"",
      confirmPassword: "",
       whatsAppNumber: ""
    });
    const [userName, setUserName] = useState({
        firstName:"",
        lastName:""
    });

    const data = [
        { label: '+91', value: '1',icon: require("@/assets/sign-in/india.png") },
        { label: '+222', value: '2' },
        { label: '+102', value: '3' },
        { label: '+100', value: '4' },
        { label: '+69', value: '5' },
        { label: '++100', value: '6' },
        { label: '+11', value: '7' },
        { label: '+12', value: '8' },
      ];

    const [numberValue,setNumberValue] = useState(data[0]?.value || null);

    const [whatsAppNumber, setWhatsAppNumber] = useState("");
    
    //handle password with specil conduction
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

    //when the pass word match to the userinfo.password means user password otherwise show password dont match
    const handleConfirmPasswordValidation = (value: string) => {
        setConfirmPassword(value);
        if (value !== userInfo.password) {
            setError({
                ...error,
                confirmPassword: "Passwords do not match"
            });
        } else {
            setError({
                ...error,
                confirmPassword: ""
            });
        }
    };

    //whatsapp number validate only when +91 has 10 numbers in further I add all numbers
    const handleWhatsAppNumberValidation = (value:string) => {
        const numericValue = value.replace(/[^0-9]/g, "");
        setWhatsAppNumber(numericValue);

        if (numberValue === '1' && numericValue.length !== 10) {
            setError({ ...error, whatsAppNumber: "Enter a valid 10-digit number" });
        } else {
            setError({ ...error, whatsAppNumber: "" });
        }
    };

    //safe email 
    const isEmailValid = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    // validate names when the are grater then 0
    const areNamesValid = () => {
        return userName.firstName.trim().length > 0 && userName.lastName.trim().length > 0;
      };
      

    //fromvalidate logic 
    const isFormValid = isEmailValid(userInfo.email) && !error.password && areNamesValid() && confirmPassword === userInfo.password && (!error.whatsAppNumber && whatsAppNumber.length > 0);

    
    const handleNext = ()=>{
   
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
            showsHorizontalScrollIndicator={false}
            >
            <View style={styles.container}>
            {/* starting banner */}
            <View style={styles.teams}>
              <Image style={styles.teamsImage} source={require("@/assets/sign-in/teamsLogo.png")} resizeMode="contain"/>
              <Text style={[styles.teamsText,{fontFamily:"Raleway_700Bold"}]}>Zapplo Teams</Text>
            </View>

            {/* middle banner */}
            <View style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12}}>
                <Text style={{color:"white",fontFamily:"Raleway_700Bold",fontSize:21}}>Let’s Get Started</Text>
                <Text style={{color:"white",fontWeight:"200",fontSize:12}}>Let's get started by filling out the form below.</Text>
            </View>

            {/* first name */}
            <View style={styles.input}>
              <Text style={[styles.baseName,{fontFamily:"Nunito_400Regular"}]}>First Name</Text>
              <TextInput 
              style={[styles.inputSome]}
              value={userName.firstName}
              onChangeText={(value)=>setUserName({...userName,firstName:value})}
              placeholder="First Name"
              placeholderTextColor="#787CA5"
              ></TextInput>
            </View>

            {/* last name */}
            <View style={styles.input}>
              <Text style={[styles.baseName,{fontFamily:"Nunito_400Regular"}]}>Last Name</Text>
              <TextInput 
              style={[styles.inputSome]}
              value={userName.lastName}
              onChangeText={(value)=>setUserName({...userName,lastName:value})}
              placeholder="Last Name"
              placeholderTextColor="#787CA5"
              ></TextInput>
            </View>
            
            {/* drop down numbers and phone numbers */}
            <View style={{width:"100%",gap:9,justifyContent:"center", display:"flex",alignItems:"center",flexDirection:"row"}}>
                {/* number DropDown  */}
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select item"
                    searchPlaceholder="Search..."
                    value={numberValue}
                    onChange={(item: any) => {
                        setNumberValue(item.value);
                    }}
                    renderLeftIcon={() => {
                        const selectedItem = data.find((item) => item.value === numberValue);
                        return (
                            <Image
                                source={selectedItem?.icon}
                                style={{ width: 15, height: 20, marginRight: 5 }}
                                resizeMode="contain"
                            />
                        );
                    }}    
                />

                {/* numbers */}
                <View style={styles.inputNum}>
                <Text style={[styles.baseName, { fontFamily: "Nunito_400Regular" }]}>
                    WhatsApp Number
                </Text>
                <TextInput 
                    style={[styles.inputSome]}
                    value={whatsAppNumber}
                    onChangeText={handleWhatsAppNumberValidation}
                    placeholder="7863983914"
                    keyboardType="numeric" 
                    placeholderTextColor="#787CA5"
                    maxLength={10}
                />
                </View>
            </View>

            {/* mail put */}
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

            {/* password put */}
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

            {/* when password error occurs then show red color */}

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
            
            {/* confirm password */}
            <View style={styles.input}>
              <Text style={[styles.baseName,{fontFamily:"Nunito_400Regular"}]}>Confirm Password</Text>
              <TextInput 
              style={styles.inputSome}
              keyboardType="default"
              secureTextEntry={!isPasswordVisible}
              defaultValue=""
              onChangeText={handleConfirmPasswordValidation}
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

            {/* when confirm password occurs  */}
            {error.confirmPassword && (
                            <View style={styles.errorPassword}>
                                <Entypo name="cross" size={18} color={"red"} />
                                <Text style={{ color: "red", fontSize: 10 }}>
                                    {error.confirmPassword}
                                </Text>
                            </View>
                        )}


            {/* button next */}
              <TouchableOpacity
              style={[styles.buttonContainer , {backgroundColor: isFormValid ? "#815BF5" : "#37384B"}]}
              onPress={()=> router.push("/(routes)/signUpTwo" as any)}
              >

                {
                  buttonSpinner ? (
                      <ActivityIndicator size="small" color={"white"}/>

                    ) : (
                      <Text style={{color:"white",textAlign:"center",fontSize:13,fontFamily:"Railway_700Bold"}}>
                        Next
                      </Text>
                    )
                }
              </TouchableOpacity>

                {/* go to the login page */}
                <View style={{display:"flex",flexDirection:"row", gap:2, justifyContent:"flex-end",marginTop:40,alignItems:"center"}}>
                  <Text style={{color:"white" , fontWeight:200, fontSize:12}}>Already a </Text>
                  <GradientText text="Zapllonian"/>
                  <Text style={{color:"white", fontSize:12}}>? </Text>
                  <TouchableOpacity onPress={()=> router.push("/(routes)/login" as any)}>
                  <Text style={{color:"white"}}>Log In Here</Text>
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

  teams:{
    display:"flex",
    flexDirection:"row",
    gap:5,
    alignItems:"center",
    marginBottom:17,
    marginTop:52,
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
    position:"relative",
    
  },
  inputNum:{
    borderWidth: 1,
    borderColor: '#37384B',
    padding: 10,
    marginTop: 25,
    borderRadius: 35,
    position:"relative",
    width:"60%"
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



    dropdown: {
        borderWidth: 1,
        borderColor: '#37384B',
        padding: 10,
        marginTop: 25,
        borderRadius: 35,
        position:"relative",
        width:"30%",
        height:52
        
    },

    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 10,
      color:"#787CA5",
      fontWeight:700
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      marginRight: 5,
    },


});
