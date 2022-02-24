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

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

const Home = ({ navigation }) => {
  const [index, setindex] = useState(0);
  const [selectedValue, setSelectedValue] = useState("All");

  const { Token } = useContext(EcomContext);
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const Details = [
    {
      type: "Blue",
      image: require("../Assets/blue.png"),
    },
    {
      type: "Gray",
      image: require("../Assets/gray.jpg"),
    },
    {
      type: "Red",
      image: require("../Assets/red.png"),
    },
  ];
  var Dtat1 = [
    {
      Id: "xyz897",
      Name: "Bitcoin I would suggest remvoving the horizontal ",
      number: 1,
    },

    {
      Id: "xyz898",
      Name: "Etherium I would suggest remvoving the horizontal ",
      number: 2,
    },

    {
      Id: "xyz899",
      Name: "Doge I would suggest remvoving the horizontal ",
      number: 3,
      IsComplete: true,
    },
    {
      Id: "xyz891",
      Name: "Bitcoin I would suggest remvoving the horizontal ",
      number: 4,
      IsComplete: false,
    },

    {
      Id: "xyz892",
      Name: "Etherium I would suggest remvoving the horizontal ",
      number: 5,
      IsComplete: false,
    },

    {
      Id: "xyz894",
      Name: "Doge I would suggest remvoving the horizontal ",
      number: 6,
      IsComplete: false,
    },
    {
      Id: "xyz8979",
      Name: "Doge I would suggest remvoving the horizontal ",
      number: 7,
      IsComplete: false,
    },
    {
      Id: "xyz8891",
      Name: "Bitcoin I would suggest remvoving the horizontal ",
      number: 8,
      IsComplete: false,
    },

    {
      Id: "xyz8992",
      Name: "Etherium I would suggest remvoving the horizontal ",
      number: 9,
      IsComplete: false,
    },

    {
      Id: "xyz8194",
      Name: "Doge I would suggest remvoving the horizontal ",
      number: 10,
      IsComplete: true,
    },
  ];

  //#region get

  const [Modules, setModules] = useState([]);
  const [Modulesprogress, setModulesprogress] = useState();
  const [ErrorModules, setErrorModules] = useState(false);

  const API = axios.create({
    baseURL: `https://metafeapi.azurewebsites.net/api`,
    // timeout: 100,
    // baseURL: "https://dietaapi.azurewebsites.net/api/FatSecret/Food",

    headers: { Authorization: `bearer ${Token}` },
  });

  const GetModules = async () => {
    try {
      const response = await API.get(
        `/Modules/GetAllPublishedModules?ID=0&PageNumber=1`
      );
      console.log("Get All Modules");
      if (response.data) {
        console.log("Module Data ", response.data.modules);
        setModules(response.data.modules);
        setModulesprogress(response.data.progress);
      }
    } catch (err) {
      console.log(err);
      setErrorModules(true);
      // setErrorMessage("Api Call Failed");
    }
  };

  //#endregion

  useEffect(() => {
    // action on update of movies
    //  NavigateToHomeConditionalFunction();
    GetModules();
    //    alert();
  }, []);
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 20,
        /*    alignItems: "center",
        justifyContent: "center", */
      }}
    >
      <Animatable.View
        animation="slideInDown"
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
          }}
        >
          {/*        <Avatar.Image
            size={50}
            source={{
              uri: "https://picsum.photos/200",
            }}
          /> */}
          <Headline style={{ color: "orange" }}>M E T A</Headline>
        </View>
        <View style={{ flex: 2 }}></View>

        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Icon
            raised
            name="align-left"
            type="feather"
            color="#4076CB"
            size={20}
            onPress={() => navigation.openDrawer()}
          />
        </View>
      </Animatable.View>

      <View
        style={{
          alignItems: "center",
          marginVertical: 20,
          //  paddingHorizontal: 40,
        }}
      >
        <Progress.Bar
          color={"#48eed7"}
          progress={Modulesprogress}
          width={deviceWidth - 40}
        />
      </View>
      <View>
        <Text style={{ fontWeight: "700" }}>Current Progress</Text>
      </View>
      {/* 
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ flexWrap: "wrap", alignItems: "flex-start" }}>
              <Text>Filter </Text>
            </View>
            <View style={{ flexWrap: "wrap", alignItems: "flex-start" }}>
              <Text style={{ fontWeight: "bold" }}>{selectedValue} </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Icon
                raised
                name="filter"
                type="feather"
                color="#4076CB"
                size={20}
                onPress={() => toggleOverlay()}
              />
            </View>
          </View>
        </View>
      </View> */}

      <Comp1 Modules={Modules} navigation={navigation} />

      {/*      <Overlay
        overlayStyle={{ height: deviceHeight / 2, width: deviceWidth - 20 }}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <Subheading style={{ textAlign: "center" }}>
          Select Appropiate Filter
        </Subheading>

        <Button
          //   loading={Login_Loading}
          //  disabled={Login_Loading}
          style={styles.btnStyle}
          //  icon="chevron-right"
          mode="contained"
          onPress={() => setSelectedValue("All")}
          //   onPress={() => navigation.navigate("MainAPp")}
        >
          All
        </Button>

        <Button
          //   loading={Login_Loading}
          //  disabled={Login_Loading}
          style={styles.btnStyle}
          //  icon="chevron-right"
          mode="contained"
          onPress={() => setSelectedValue("Completed")}
          //   onPress={() => navigation.navigate("MainAPp")}
        >
          Completed
        </Button>

        <Button
          //   loading={Login_Loading}
          //  disabled={Login_Loading}
          style={styles.btnStyle}
          //   icon="chevron-right"
          mode="contained"
          onPress={() => setSelectedValue("InCompleted")}
          //   onPress={() => navigation.navigate("MainAPp")}
        >
          InCompleted
        </Button>
      </Overlay> */}
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 50,
  },

  btnStyle: {
    backgroundColor: "#21a9ff",
    padding: 5,
    // borderRadius: 30,
    marginVertical: 20,
  },
});

export default Home;
