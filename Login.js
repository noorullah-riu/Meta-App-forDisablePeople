import React, { useState, useEffect } from "react";
import { View, Dimensions, StyleSheet, LogBox } from "react-native";
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

import * as Animatable from "react-native-animatable";

import { useDispatch, useSelector } from "react-redux";
import { getcategories } from "../Redux/actions/index";

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

import "firebase/auth";
import "firebase/firestore";
import firebase from "firebase/app";

const Login = ({ navigation }) => {
  const [index, setindex] = useState(0);
  const [Email, setEmail] = useState("Noorullah.riuo@gmail.com");
  const [Password, setPassword] = useState("Oooooo");
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category);
  const getCategory = () => dispatch(getcategories());

  const LoginUser = async (email, password) => {
    setloading(true);
    const auth = firebase.auth();
    const firestore = firebase.firestore();

    try {
      const a = await auth
        .signInWithEmailAndPassword(Email, Password)
        .then(() => {
          navigation.navigate("MainAPp", { id: auth.currentUser.uid });
          console.log(auth.currentUser.uid);
          setloading(false);
        });
    } catch (e) {
      console.log(e);
      setloading(false);
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs(["Setting a timer"]);
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyCRYLmtMR9QNHiD5xD69rhLvkiYWQifSnQ",
  authDomain: "giftaiapp.firebaseapp.com",
  projectId: "giftaiapp",
  storageBucket: "giftaiapp.appspot.com",
  messagingSenderId: "751237987974",
  appId: "1:751237987974:web:857766e4ba16db32369b07",
      });
    } else {
      firebase.app(); // if already initialized, use that one
    }
  }, []);

  return (
    <View style={styles.MainContainer}>
      <View style={styles.HeaderContainer}>
        <Title style={{ color: "#fff" }}>Welcome Back!</Title>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.FooterContainer}>
        <TextInput
          mode="outlined"
          selectionColor="#F2AE1B"
          underlineColor="#F2AE1B"
          outlineColor="#F2AE1B"
          dense={true}
          placeholder="JhonDoe@gmail.com..."
          label="Email"
          value={Email}
          onChangeText={(Email) => setEmail(Email)}
        />

        <View>
          <TextInput
            mode="outlined"
            selectionColor="#F2AE1B"
            underlineColor="#F2AE1B"
            outlineColor="#F2AE1B"
            dense={true}
            placeholder="*********"
            label="Password"
            value={Password}
            onChangeText={(Password) => setPassword(Password)}
          />
        </View>
        <View style={{ marginBottom: 40, marginTop: 20 }}>
          <Text style={{ color: "#FFB22A" }}>Forgot Password?</Text>
        </View>

        <Button
          loading={loading}
          style={{ backgroundColor: "#F2AE1B", padding: 5 }}
          icon="chevron-right"
          mode="contained"
          onPress={() => LoginUser()}
          //  onPress={() => navigation.navigate("MainAPp")}
        >
          Login
        </Button>
        <View style={{ padding: 10 }}></View>
        <Button
          labelStyle={{ color: "#F2AE1B", padding: 5 }}
          icon="chevron-right"
          mode="outlined"
          onPress={() => navigation.navigate("SignUp")}
        >
          SignUp
        </Button>
        <View style={{ marginTop: 10 }}>
          <Text style={{ textAlign: "right", color: "#FFB22A" }}>
            Not Intrested
          </Text>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: "#FFB22A",
    flex: 1,
  },

  HeaderContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 20,
  },

  FooterContainer: {
    flex: 2,
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    marginTop: 0,
    borderTopLeftRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
});

export default Login;
