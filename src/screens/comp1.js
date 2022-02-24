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

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

const Comp1 = ({ navigation, Modules }) => {
  const [index, setindex] = useState(0);
  const [selectedValue, setSelectedValue] = useState("All");

  const Details = [
    {
      type: "Blue",
      image: require("../Assets/blue.png"),
    },
    {
      type: "Gray",
      image: require("../Assets/a.png"),
    },
    {
      type: "Red",
      image: require("../Assets/red.png"),
    },
  ];

  useEffect(() => {
    // action on update of movies
    //    alert();
  }, []);
  return (
    <FlatList
      horizontal={false}
      numColumns={2}
      data={Modules}
      showsHorizontalScrollIndicator={true}
      keyExtractor={(Modules) => Modules.id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            //  onPress={() => alert(item.id)}
            onPress={() => navigation.navigate("ModuleList", { id: item.id })}
            style={styles.Container}
          >
            <>
              <ImageBackground
                source={item.isCompleted ? Details[0].image : Details[1].image}
                style={styles.carouselContainer}
                resizeMode="contain"
              >
                <View>
                  <Subheading numberOfLines={1} style={styles.TextHeadline}>
                    {item.name}
                  </Subheading>
                </View>
                {/*   <Subheading style={styles.TextSubheading}>{item.id}</Subheading> */}
              </ImageBackground>
            </>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    //  flexWrap: "wrap",
    marginBottom: 5,
    //  width: deviceWidth - 10,
    marginRight: 10,
    // height: deviceHeight / 5,
  },
  carouselContainer: {
    justifyContent: "center",
    //alignSelf: "flex-start",
    //  alignItems: "flex-start",

    height: deviceHeight / 5,
  },
  TextHeadline: {
    // textAlign: "left",
    paddingLeft: 20,
    //  paddingTop: 40,
    color: "#fff",
  },
  TextSubheading: {
    textAlign: "right",
    paddingRight: 20,
    color: "#fff",
  },
});

export default Comp1;
