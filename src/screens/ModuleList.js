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

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

const ModuleList = ({ navigation, route }) => {
  const [index, setindex] = useState(0);
  const { id } = route.params;
  const { Token } = useContext(EcomContext);
  const [ArticalsofModules, setArticalsofModules] = useState([]);
  const [Articalprogress, setArticalprogress] = useState();
  const [selectedValue, setSelectedValue] = useState("All");
  const [ModuleName, setModuleName] = useState();

  //#region get

  const API = axios.create({
    baseURL: `https://metafeapi.azurewebsites.net/api`,
    // timeout: 100,
    // baseURL: "https://dietaapi.azurewebsites.net/api/FatSecret/Food",

    headers: { Authorization: `bearer ${Token}` },
  });

  const GetModules = async () => {
    try {
      const response = await API.get(
        `/Article/GetPublishedArticlesByModuleID?ID=${id}`
      );
      console.log("Get All ");
      if (response.data) {
        // console.log("Data", response.data.result.name);
        setModuleName(response.data.result.name);
        setArticalsofModules(response.data.result.articles);
        setArticalprogress(response.data.result.progress);
      }
    } catch (err) {
      //   alert(err);
      setArticalsofModules([]);
      // setErrorMessage("Api Call Failed");
    }
  };

  //#endregion

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
        /*    alignItems: "center",
        justifyContent: "center", */
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
            color="#4076CB"
            size={20}
            onPress={() => navigation.navigate("Home")}
          />
        </View>
        <View style={{ flex: 4, alignItems: "flex-start" }}>
          <Title>{ModuleName}</Title>
        </View>
        {/* 
        <View style={{ flex: 1 }}></View> */}
      </Animatable.View>

      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <Progress.Bar
          color={"#48eed7"}
          progress={Articalprogress}
          width={deviceWidth - 40}
        />
      </View>
      <View style={{ marginLeft: 20 }}>
        <Text style={{ fontWeight: "700" }}>Module Progress</Text>
      </View>

      <View style={{ flexDirection: "row", marginBottom: 0 }}>
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
            {/*    <TouchableOpacity
              onPress={() => navigation.navigate("ModuleDetails", { id: 7 })}
              style={{ flex: 1, alignItems: "flex-end" }}
            >
              <Text>Filter </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>

      <Divider
        orientation="horizontal"
        style={{ marginHorizontal: 10, marginBottom: 20 }}
        width={1}
      />
      <FlatList
        horizontal={false}
        data={ArticalsofModules}
        showsHorizontalScrollIndicator={true}
        keyExtractor={(ArticalsofModules) => ArticalsofModules.name}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ModuleDetails", {
                  id: item.id,
                  otherParam: id,
                })
              }
            >
              <View
                style={{
                  marginTop: 20,
                  paddingBottom: 10,
                  flexDirection: "row",
                  paddingLeft: 10,
                  alignItems: "flex-start",
                  //  justifyContent: "center",
                }}
              >
                <View>
                  <Icon
                    // name="circle"
                    name="check-circle"
                    type="feather"
                    color="green"
                    size={20}
                    onPress={() => navigation.navigate("MainAPp")}
                  />
                </View>

                <View style={{ marginLeft: 5 }}>
                  <Text numberOfLines={1}>{item.name}</Text>
                </View>
              </View>
              <Divider
                orientation="horizontal"
                style={{ marginHorizontal: 30 }}
                width={0.5}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 50,
  },
});

export default ModuleList;
