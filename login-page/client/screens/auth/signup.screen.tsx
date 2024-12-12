import { ScrollView, StyleSheet, Text, View,Image, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { AntDesign, Entypo,Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import CheckBox from "@/components/Checkbox";
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
    const handleWhatsAppNumberValidation = (value:string) => {
        const numericValue = value.replace(/[^0-9]/g, "");
        setWhatsAppNumber(numericValue);

        if (numberValue === '1' && numericValue.length !== 10) {
            setError({ ...error, whatsAppNumber: "Enter a valid 10-digit number" });
        } else {
            setError({ ...error, whatsAppNumber: "" });
        }
    };
    const isEmailValid = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    const areNamesValid = () => {
        return userName.firstName.trim().length > 0 && userName.lastName.trim().length > 0;
      };
      

  const isFormValid = isEmailValid(userInfo.email) && !error.password && areNamesValid() && confirmPassword === userInfo.password && (!error.whatsAppNumber && whatsAppNumber.length > 0);  ;


    const handleSignIn = ()=>{
   //
    }



  return (
        <SafeAreaView style={{backgroundColor:"#05071E",height:"100%"}}>
        <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        >
        <View style={styles.container}>

        <View style={styles.teams}>
          <Image style={styles.teamsImage} source={require("@/assets/sign-in/teamsLogo.png")} resizeMode="contain"/>
          <Text style={[styles.teamsText,{fontFamily:"Raleway_700Bold"}]}>Zapplo Teams</Text>
        </View>

        <View style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12}}>
            <Text style={{color:"white",fontFamily:"Raleway_700Bold",fontSize:21}}>Let’s Get Started</Text>
            <Text style={{color:"white",fontWeight:"200",fontSize:12}}>Let's get started by filling out the form below.</Text>
        </View>

        <View style={styles.input}>
          <Text style={[styles.baseName,{fontFamily:"Nunito_400Regular"}]}>First Name</Text>
          <TextInput 
          style={[styles.inputSome]}
          value={userName.firstName}
          onChangeText={(value)=>setUserName({...userName,firstName:value})}
          placeholder="First Name"
          ></TextInput>
        </View>

        <View style={styles.input}>
          <Text style={[styles.baseName,{fontFamily:"Nunito_400Regular"}]}>Last Name</Text>
          <TextInput 
          style={[styles.inputSome]}
          value={userName.lastName}
          onChangeText={(value)=>setUserName({...userName,lastName:value})}
          placeholder="Last Name"
          ></TextInput>
        </View>
        
        <View style={{width:"100%",gap:9,justifyContent:"center", display:"flex",alignItems:"center",flexDirection:"row"}}>

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
                value={numberValue} // Set the initial value here
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

            <View style={styles.inputNum}>
            <Text style={[styles.baseName, { fontFamily: "Nunito_400Regular" }]}>
                WhatsApp Number
            </Text>
            <TextInput 
                style={[styles.inputSome]}
                value={whatsAppNumber}
                onChangeText={handleWhatsAppNumberValidation}
                placeholder="7863983914"
                keyboardType="numeric" // Numeric keypad
                maxLength={10} // Limit to 10 digits
            />
            </View>
        </View>


        <View style={styles.input}>
          <Text style={[styles.baseName,{fontFamily:"Nunito_400Regular"}]}>Email Address</Text>
          <TextInput 
          style={[styles.inputSome]}
          value={userInfo.email}
          onChangeText={(value)=>setUserInfo({...userInfo,email:value})}
          placeholder="Email Address"
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

        <View style={styles.input}>
          <Text style={[styles.baseName,{fontFamily:"Nunito_400Regular"}]}>Confirm Password</Text>
          <TextInput 
          style={styles.inputSome}
          keyboardType="default"
          secureTextEntry={!isPasswordVisible}
          defaultValue=""
          onChangeText={handleConfirmPasswordValidation}
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
        {error.confirmPassword && (
                        <View style={styles.errorPassword}>
                            <Entypo name="cross" size={18} color={"red"} />
                            <Text style={{ color: "red", fontSize: 10 }}>
                                {error.confirmPassword}
                            </Text>
                        </View>
                    )}




          <TouchableOpacity
           style={[styles.buttonContainer , {backgroundColor: isFormValid ? "#815BF5" : "#37384B"}]}
           onPress={handleSignIn}
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


            <View style={{display:"flex",flexDirection:"row", gap:2, justifyContent:"flex-end",marginTop:40,alignItems:"center"}}>
              <Text style={{color:"white" , fontWeight:200, fontSize:12}}>Already a </Text>
              <GradientText text="Zapllonian"/>
              <Text style={{color:"white", fontSize:12}}>? </Text>
              <TouchableOpacity onPress={()=> router.push("/(routes)/login" as any)}>
                <Text style={{color:"white"}}> LogIn Here</Text>
              </TouchableOpacity>
            </View>

        </View>
        
        </ScrollView>
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
    marginTop:49,
    marginBottom:65
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
  terms:{

  },
  checkBox:{
    height:100,
    marginBottom:30
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
    icon: {
      marginRight: 5,
      color:"white"
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
