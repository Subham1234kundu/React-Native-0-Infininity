import React, { useState } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, FlatList,ScrollView } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { router } from "expo-router";
import { GradientText } from "@/components/GradientText";


export default function SignUpTwoScreen() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [buttonSpinner, setButtonSpinner] = useState(false);
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({
        password: "",
        confirmPassword: "",
        whatsAppNumber: ""
    });
    const [companyName, setCompanyName] = useState("");
    const [description, setDescription] = useState("");

    const data = [
        { id: 1, item: "Sales", selected: false },
        { id: 2, item: "Marketing", selected: false },
        { id: 3, item: "HR/Admin", selected: false },
        { id: 4, item: "General", selected: false },
        { id: 5, item: "Operations", selected: false },
        { id: 6, item: "Automation", selected: false },
        { id: 7, item: "Admin", selected: false },
        { id: 8, item: "UI/UX", selected: false },

    ];
    const [selectedItem, setSelectedItem] = useState(data);

    const onSelect = (item: any) => {
        const newItem = selectedItem.map((val) => {
            if (val.id === item.id) {
                return { ...val, selected: !val.selected }; // Toggle selection
            } else {
                return val;
            }
        });
        setSelectedItem(newItem);
    };

    const industryData = [
        { label: 'Retail/E-Commerce', value: '1' },
        { label: 'Technology', value: '2' },
        { label: 'Service Provider', value: '3' },
        { label: 'Healthcare(Doctors/Clinics/Physicians/Hospital)', value: '4' },
        { label: 'Logistics', value: '5' },
        { label: 'Financial Consultants', value: '6' },
        { label: 'Trading', value: '7' },
        { label: 'Education', value: '8' },
        { label: 'Manufacturing', value: '9' },
        { label: 'Real Estate/Construction/Interior/Architects', value: '10' },
        { label: 'Others', value: '11' },
    ];

    const teamsData = [
        { label: '1-10', value: '1', icon: require("@/assets/sign-in/india.png") },
        { label: '11-20', value: '2' },
        { label: '21-30', value: '3' },
        { label: '31-50', value: '4' },
        { label: '51+', value: '5' },
    ];

    const [selectIndustry, setSelectIndustry] = useState(null);
    const [teamSize, setTeamSize] = useState(null);

    const isEmailValid = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isFormValid = 
    companyName.trim() !== "" && 
    selectIndustry !== null && 
    teamSize !== null;
    const handleNext = () => {
        // Handle next action
    };



    return (
        <SafeAreaView style={{ backgroundColor: "#05071E", height: "100%" }}>
            <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            >
            <View style={styles.container}>
                {/* starting banner */}
                <View style={styles.teams}>
                    <Image style={styles.teamsImage} source={require("@/assets/sign-in/teamsLogo.png")} resizeMode="contain" />
                    <Text style={[styles.teamsText, { fontFamily: "Raleway_700Bold" }]}>Zapplo Teams</Text>
                </View>

                {/* middle banner */}
                <View style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                    <Text style={{ color: "white", fontFamily: "Raleway_700Bold", fontSize: 21 }}>Create Your Workspace</Text>
                    <Text style={{ color: "white", fontWeight: "200", fontSize: 12 }}>Let's get started by filling out the form below.</Text>
                </View>

                {/* Company Name */}
                <View style={styles.input}>
                    <Text style={[styles.baseName, { fontFamily: "Nunito_400Regular" }]}>Company Name</Text>
                    <TextInput
                        style={[styles.inputSome]}
                        value={companyName}
                        onChangeText={(value) => setCompanyName(value)}
                        placeholder="Company Name"
                    ></TextInput>
                </View>

                {/* drop down Business Industry names */}
                <View style={styles.input}>
                    <Text style={[styles.baseName, { fontFamily: "Nunito_400Regular" }]}>Business Industry</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={industryData}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Business Industry"
                        searchPlaceholder="Search..."
                        value={selectIndustry}
                        onChange={(item: any) => {
                            setSelectIndustry(item.value);
                        }}
                    />
                </View>

                {/* drop down team size names */}
                <View style={styles.input}>
                    <Text style={[styles.baseName, { fontFamily: "Nunito_400Regular" }]}>Team Size</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={teamsData}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Team Size"
                        searchPlaceholder="Search..."
                        value={teamSize}
                        onChange={(item: any) => {
                            setTeamSize(item.value);
                        }}
                    />
                </View>

                {/* Description */}
                <View style={[styles.input, { height: 100, justifyContent: "flex-start", alignItems: "flex-start" }]}>
                    <TextInput
                        multiline
                        style={[styles.inputSome]}
                        value={description}
                        onChangeText={(value) => setDescription(value)}
                        placeholder="Description"
                    ></TextInput>
                </View>

                <View style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12,width:"90%" }}>
                <Text style={{ color: "white", fontWeight: "200", fontSize: 14, alignSelf: "center", padding: 4 }}>Select the categories that are relevant to your business</Text>
                </View>


             {/* Render buttons without scrolling */}
                     <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 1,width:"90%",marginTop:12 }}>
                        {selectedItem.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={{
                                    width: "26%",
                                    height: 40,
                                    margin: 5,
                                    borderRadius: 20,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: item.selected ? "#815BF5" : "#37384B",
                                }}
                                onPress={() => onSelect(item)}
                            >
                                <Text style={{ color: "white", fontSize: 12 }}>{item.item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12,width:"90%",marginTop:6 }}>
                    <Text style={{ color: "white", fontWeight: "200", fontSize: 11,alignSelf:"center" }}>Don't worry you can add more later in the Settings
                    panel</Text>
                    </View>

                
            {/* button sign up */}
            <TouchableOpacity
                style={[styles.buttonContainer, { backgroundColor: isFormValid ? "#815BF5" : "#37384B" }]}
                onPress={() => router.push("/(routes)/signUpTwo" as any)}
            >
                {
                    buttonSpinner ? (
                        <ActivityIndicator size="small" color={"white"} />
                    ) : (
                        <Text style={{ color: "white", textAlign: "center", fontSize: 13, fontFamily: "Railway_700Bold" }}>
                            Sign Up
                        </Text>
                    )
                }
            </TouchableOpacity>



            {/* go to the login page */}
            <View style={{ display: "flex", flexDirection: "row", gap: 2, justifyContent: "flex-end", marginTop: 40, alignItems: "center" }}>
                <Text style={{ color: "white", fontWeight: 200, fontSize: 12 }}>Already a </Text>
                <GradientText text="Zapllonian" />
                <Text style={{ color: "white", fontSize: 12 }}>? </Text>
                <TouchableOpacity onPress={() => router.push("/(routes)/login" as any)}>
                    <Text style={{ color: "white" }}>Log In Here</Text>
                </TouchableOpacity>
            </View>
            
            </View>



            </ScrollView>

        </SafeAreaView>
    );
}

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
        position:"absolute",
        width:"100%",
        height:52
        
    },

    placeholderStyle: {
      fontSize: 13,
      color:"#787CA5",
      fontWeight:300,
      paddingLeft:22,
    },
    selectedTextStyle: {
      fontSize: 13,
      color:"#787CA5",
      fontWeight:300,
      paddingLeft:22,
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
