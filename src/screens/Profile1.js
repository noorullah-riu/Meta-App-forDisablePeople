import React, { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import {
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  Avatar,
  Headline,
  Subheading,
  TextInput,
  Button,
} from "react-native-paper";

import { Icon, Divider, Overlay } from "react-native-elements";
import * as Progress from "react-native-progress";
import Comp1 from "./comp1";
import Lottieeg from "./Lottieeg";

import * as Animatable from "react-native-animatable";

import EcomContext from "../provider/DataProvider";
//import API from "../api/apiCall";
import axios from "axios";
import { colors } from "../provider/vars";

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

const Profile1 = ({ navigation }) => {
  const [index, setindex] = useState(0);

  const { Token, UserId } = useContext(EcomContext);

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  //#region get

  const [ProfileData, setProfileData] = useState({});
  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");

  const API = axios.create({
    baseURL: `https://metafeapi.azurewebsites.net/api`,
    // timeout: 100,
    // baseURL: "https://dietaapi.azurewebsites.net/api/FatSecret/Food",

    headers: { Authorization: `bearer ${Token}` },
  });

  const GetModules = async () => {
    try {
      const response = await API.get(`/users/getbyid?ID=${UserId}`);
      console.log("Get profile");
      if (response.data) {
        console.log("Profile Data ", response.data);
        setProfileData(response.data);
        //  setModulesprogress(response.data.progress);
      }
    } catch (err) {
      console.log(err);
      setErrorModules(true);
      // setErrorMessage("Api Call Failed");
    }
  };

  function UpdateProfile() {
    // setLogin_Loading(true);
    APILogin.post("/Users/UpdateUser", {
      FirstName: "string",
      LastName: "string",
      Phone: "string",
      Email: ProfileData.email,
      Mobile: ProfileData.phone,
      // Password: "string",
      // ProfilePictureUrl: "string",
      Gender: 1,
      Admin: false,
      RoleId: 3,
      id: UserId,
    })
      .then((response) => {
        //   console.log(response);
        if (response.data) {
          console.log(response.data);
          //    alert("Case Success");
          //    setToken(response.data.result.accessToken);
          //  setUserId(response.data.result.user.id);
          //  setLogin_Loading(false);
          //  return "true";
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
        //   console.log(error.response.data.message);
        //   console.log(error.response.status);
        //   setLogin_Loading(false);
        //  console.log(error.response.headers);
      });
  }

  //#endregion

  useEffect(() => {
    // action on update of movies
    //  NavigateToHomeConditionalFunction();
    GetModules();
    //    alert();
  }, []);
  return (
    <View style={styles.Container}>
      <Animatable.View animation="slideInDown" style={styles.HeaderDiv}>
        {/*     <View style={{ flex: 1, paddingVertical: 20 }}>
          <Avatar.Image
            size={100}
            source={{
              uri: "https://picsum.photos/200",
            }}
          />
        </View> */}
        <View style={{ flex: 1, paddingVertical: 40 }}>
          <Title style={{ textAlign: "center" }}>
            {ProfileData.firstName}
            {ProfileData.lastName}
          </Title>
          <Caption style={{ textAlign: "center" }}>{ProfileData.email}</Caption>
        </View>
      </Animatable.View>

      <Animatable.View animation="slideInDown" style={styles.BodyDiv}>
        <Animatable.View style={styles.Bodyhead}>
          <Subheading style={{ padding: 5 }}>Profile</Subheading>
        </Animatable.View>
        <View style={styles.contentDiv}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Icon
              name="message-square"
              type="feather"
              color={colors.InActiveColor}
              // backgroundColor="#111"
              size={20}
              //   onPress={() => navigation.navigate("Home")}
            />
          </View>

          <View style={{ flex: 4 }}>
            <Text style={{ textAlign: "left" }}>Update Email Address</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Icon
              name="chevron-right"
              type="feather"
              color={colors.InActiveColor}
              size={20}
              //  onPress={() => navigation.navigate("Home")}
              onPress={() => toggleOverlay()}
            />
          </View>
        </View>

        <View style={styles.contentDiv}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Icon
              name="eye"
              type="feather"
              color={colors.InActiveColor}
              // backgroundColor="#111"
              size={20}
              //   onPress={() => navigation.navigate("Home")}
            />
          </View>

          <View style={{ flex: 4 }}>
            <Text style={{ textAlign: "left" }}>Change Password</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Icon
              name="chevron-right"
              type="feather"
              color={colors.InActiveColor}
              size={20}
              //   onPress={() => navigation.navigate("Home")}
            />
          </View>
        </View>
      </Animatable.View>

      <Animatable.View animation="slideInUp" style={styles.FooterDiv}>
        <Animatable.View style={styles.Bodyhead}>
          <Subheading style={{ padding: 5 }}>Prefrences</Subheading>
        </Animatable.View>

        <View style={styles.contentDiv}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Icon
              name="globe"
              type="feather"
              color={colors.InActiveColor}
              // backgroundColor="#111"
              size={20}
              //   onPress={() => navigation.navigate("Home")}
            />
          </View>

          <View style={{ flex: 4 }}>
            <Text style={{ textAlign: "left" }}>Language</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Icon
              name="chevron-right"
              type="feather"
              color={colors.InActiveColor}
              size={20}
              //   onPress={() => navigation.navigate("Home")}
            />
          </View>
        </View>

        <View style={styles.contentDiv}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Icon
              name="bell"
              type="feather"
              color={colors.InActiveColor}
              // backgroundColor="#111"
              size={20}
              //   onPress={() => navigation.navigate("Home")}
            />
          </View>

          <View style={{ flex: 4 }}>
            <Text style={{ textAlign: "left" }}>Notifications</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Icon
              name="chevron-right"
              type="feather"
              color={colors.InActiveColor}
              size={20}
              //   onPress={() => navigation.navigate("Home")}
            />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            //   alignItems: "flex-start",
            justifyContent: "flex-end",
            padding: 20,
          }}
        >
          <Icon
            reverse
            name="chevron-left"
            type="feather"
            color={colors.ActiveColor}
            // backgroundColor="#111"
            size={20}
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </Animatable.View>

      <Overlay
        overlayStyle={{ height: deviceHeight / 2, width: deviceWidth - 20 }}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <TextInput
          mode="outlined"
          dense={true}
          secureTextEntry={true}
          theme={{
            colors: { primary: "#4076CB", underlineColor: "transparent" },
            // roundness: 20,
          }}
          placeholder="First Name....."
          label="First Name"
          value={FName}
          onChangeText={(FName) => setFName(FName)}
        />

        <TextInput
          mode="outlined"
          dense={true}
          secureTextEntry={true}
          theme={{
            colors: { primary: "#4076CB", underlineColor: "transparent" },
            //  roundness: 20,
          }}
          placeholder="Last Name"
          label="Last Name"
          value={LName}
          onChangeText={(LName) => setLName(LName)}
        />

        <Button
          //   loading={Login_Loading}
          //  disabled={Login_Loading}
          style={styles.btnStyle}
          icon="chevron-right"
          mode="contained"
          //   onPress={() => UpdateProfile()}
          //   onPress={() => navigation.navigate("MainAPp")}
        >
          Update
        </Button>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    // backgroundColor: "red",
    flex: 1,
    // flexDirection: "row",
    paddingTop: 30,
    paddingHorizontal: 20,
    /*    alignItems: "center",
    justifyContent: "center", */
  },
  HeaderDiv: {
    alignItems: "center",
    justifyContent: "center",
    flex: 5,
    //  borderColor: "#000",
    //  borderWidth: 1,
  },
  BodyDiv: {
    flex: 4,
    // backgroundColor: "red",
    // borderColor: "#000",
    // borderWidth: 1,
  },
  Bodyhead: {
    //  flex: 3,
    backgroundColor: "#ddd",

    //    borderColor: "#000",
    //   borderWidth: 1,
  },
  FooterDiv: {
    // alignItems: "center",
    flex: 8,
    // borderColor: "#000",
    //  borderWidth: 1,
  },
  contentDiv: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },

  btnStyle: {
    backgroundColor: "#21a9ff",
    padding: 5,
    // borderRadius: 30,
    marginVertical: 20,
  },
});

export default Profile1;
