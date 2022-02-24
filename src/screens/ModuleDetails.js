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
  /*  Picker, */
} from "react-native";
import {
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  Headline,
  Subheading,
  TextInput,
  Button,
} from "react-native-paper";
import { Icon, Divider } from "react-native-elements";
import * as Progress from "react-native-progress";
import * as Animatable from "react-native-animatable";
import axios from "axios";

import EcomContext from "../provider/DataProvider";
import Lottieeg from "./Lottieeg";
import { WebView } from "react-native-webview";

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

const ModuleDetails = ({ navigation, route }) => {
  const [DataObj, setDataObj] = useState({});

  const { id, otherParam } = route.params;
  const { Token } = useContext(EcomContext);

  //#region get

  const API = axios.create({
    baseURL: `https://metafeapi.azurewebsites.net/api`,
    // timeout: 100,
    // baseURL: "https://dietaapi.azurewebsites.net/api/FatSecret/Food",

    headers: { Authorization: `bearer ${Token}` },
  });

  const GetModules = async () => {
    try {
      const response = await API.get(`/Article/GetArticleByArticleID?ID=${id}`);
      console.log("Get module ");
      if (response.data) {
        //  console.log(" Data ", response.data);
        setDataObj(response.data);
        //   console.log(DataObj);
      }
    } catch (err) {
      alert(err);
      // setErrorMessage("Api Call Failed");
    }
  };

  //#endregion

  const slicefun = () => {
    //const a = Artical;
  };

  useEffect(() => {
    // action on update of movies
    //  NavigateToHomeConditionalFunction();
    GetModules();
  }, [id]);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        paddingTop: 30,
      }}
    >
      <Animatable.View
        animation="slideInLeft"
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "center",
            paddingLeft: 20,
          }}
        >
          <Icon
            reverse
            name="chevron-left"
            type="feather"
            color="#21a9ff"
            size={20}
            onPress={() => navigation.navigate("Home")}
          />
        </View>
        <View style={{ flex: 4, alignItems: "flex-start" }}>
          <Title style={{ fontWeight: "700" }}>{DataObj.name}</Title>
        </View>

        <View style={{}}></View>
      </Animatable.View>

      <View
        style={{
          //   borderColor: "#EEE",
          //  borderWidth: 1,
          height: deviceHeight / 1.5,
          //  backgroundColor: "#eee",
        }}
      >
        <WebView
          style={{ height: deviceHeight / 1.5, width: deviceWidth }}
          //    source={{ uri: "https://expo.dev" }}
          //   originWhitelist={["intent://"]}
          //   setSupportMultipleWindows={false}
          originWhitelist={["*"]}
          source={{ html: DataObj.content }}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("ModuleList", { id: otherParam })}
        style={{ alignItems: "center", paddingTop: 20, paddingBottom: 20 }}
      >
        <Text style={{ fontWeight: "bold" }}>Study Later</Text>
      </TouchableOpacity>

      {DataObj.isQuizAttached ? (
        <View style={{ paddingHorizontal: 30 }}>
          <Button
            //  loading={true}
            disabled={false}
            style={{
              backgroundColor: "#21a9ff",
              padding: 5,
              borderRadius: 30,
            }}
            //   icon="chevron-right"
            mode="contained"
            // onPress={() => _onPressButton()}
            /*        onPress={
              (() => navigation.navigate("QuizAgainstArticle"),
              { id: DataObj.id })
            } */
            onPress={() =>
              navigation.navigate("QuizAgainstArticle", { id: DataObj.id })
            }
          >
            Take Quiz
          </Button>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 50,
  },
});

export default ModuleDetails;
