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
import { Icon, Divider } from "react-native-elements";
import * as Progress from "react-native-progress";

import * as Animatable from "react-native-animatable";

import EcomContext from "../provider/DataProvider";
var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

const Pagination = ({ navigation }) => {
  const [index, setindex] = useState(0);

  //const { GetModules, Modules, setModules } = useContext(EcomContext);
  const [loading, setloading] = useState(true);
  const [randomUserData, setrandomUserData] = useState([]);
  const [loadingExtraData, setloadingExtraData] = useState(false);
  const [page, setpage] = useState(1);

  const LoadRandomData = () => {
    fetch(`https://randomuser.me/api/?results=10&page=${page}`)
      .then((response) => response.json())
      .then((responseJson) => {
        if (page === 1) {
          setrandomUserData(responseJson.results);
        } else {
          setrandomUserData([...randomUserData, ...responseJson.results]);
        }
      })
      .catch((error) => {
        console.log("Error selecting random data: " + error);
      });
  };
  const LoadMoreRandomData = () => {
    setpage(page + 1);

    LoadRandomData();
  };
  const keyExtractor = (item, index) => item.email;

  const renderCustomItem = ({ item, index }) => {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>{item.gender}</Text>
        <Text>
          {item.name["first"]} {item.name["last"]}
        </Text>
        <Image
          source={{ uri: item.picture["medium"] }}
          style={{ width: 200, height: 200 }}
        />
      </View>
    );
  };
  useEffect(() => {
    LoadRandomData();
  }, []);
  return (
    <FlatList
      data={randomUserData}
      renderItem={renderCustomItem}
      style={{ width: 350, height: 800 }}
      keyExtractor={keyExtractor}
      onEndReachedThreshold={0}
      onEndReached={LoadMoreRandomData}
    />
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 50,
  },
});

export default Pagination;
