import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  LogBox,
  StyleSheet,
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

import * as Animatable from "react-native-animatable";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { useValidation } from "react-native-form-validator";
//import customValidationMessages from "./customValidationMessages";

import Toast from "react-native-toast-message";

import { useDispatch, useSelector } from "react-redux";
import { getcategories } from "../Redux/actions/index";

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

//import auth from "@react-native-firebase/auth";
//import firestore from "@react-native-firebase/app";

import "firebase/auth";
import "firebase/firestore";
import firebase from "firebase/app";

const SignUp = ({ navigation }) => {
  const [index, setindex] = useState(0);
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [IsFieldFocuous, setIsFieldFocuous] = useState(false);
  const [UserID, setUserID] = useState();

  const registerUser = async (email, password) => {
    const auth = firebase.auth();
    const firestore = firebase.firestore();
    try {
      await auth
        .createUserWithEmailAndPassword(Email, Password)
        .then(() => {
          navigation.navigate("Login");
          //Once the user creation has happened successfully, we can add the currentUser into firestore
          //with the appropriate details.
          firestore
            .collection("users")
            .doc(auth.currentUser.uid)
            .set({
              fname: "New User",
              lname: "New User",
              email: Email,
              // createdAt: firestore.Timestamp.fromDate(new Date()),
              userImg: null,
            })
            // setUserID(auth.currentUser.uid);
            //ensure we catch any errors at this stage to advise us if something does go wrong
            .catch((error) => {
              console.log(
                "Something went wrong with added user to firestore: ",
                error
              );
            });
        })
        //we need to catch the whole sign up process if it fails too.
        .catch((error) => {
          console.log("Something went wrong with sign up: ", error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs(["Setting a timer"]);
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyAcHD_NDperRlbrOwlL6_fEDW5otLkiMp0",
        authDomain: "ecomerceapp-8d0d2.firebaseapp.com",
        projectId: "ecomerceapp-8d0d2",
        storageBucket: "ecomerceapp-8d0d2.appspot.com",
        messagingSenderId: "138753126316",
        appId: "1:138753126316:web:629dc90fccbb9345fb1409",
      });
    } else {
      firebase.app(); // if already initialized, use that one
    }
  }, []);
  const _onPressButton = () => {
    validate({
      //  name: { minlength: 3, maxlength: 7, required: true },
      Name: { required: true },
      Email: { required: true, email: true },
      Password: { minlength: 3, maxlength: 7, required: true },
      //  number: { numbers: true },
      // date: { date: "YYYY-MM-DD" },
      // confirmPassword: { equalPassword: newPassword },
    });
    const a = isFormValid();
    // alert(a);
    show();
    setIsFieldFocuous(false);
  };

  const {
    validate,
    isFieldInError,
    getErrorsInField,
    getErrorMessages,
    isFormValid,
  } = useValidation({
    state: { Name, Email, Password },
  });
  const some = () => {
    setIsFieldFocuous(true);
  };

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category);
  const getCategory = () => dispatch(getcategories());

  function show() {
    Toast.show({
      type: "info",
      autoHide: false,
      position: "top",
      text1: "Hello",
      text2: "some Info",
    });
  }

  return (
    <View style={styles.MainContainer}>
      <View style={styles.HeaderContainer}>
        <Title style={{ color: "#fff" }}>Create An Account</Title>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.FooterContainer}>
        <View>
          <TextInput
            mode="outlined"
            selectionColor="#F2AE1B"
            underlineColor="#F2AE1B"
            outlineColor="#F2AE1B"
            placeholder="JhonDoe..."
            dense={true}
            label="Name"
            onFocus={() => some()}
            value={Name}
            onChangeText={(Name) => setName(Name)}
          />

          {isFieldInError("Name") &&
            getErrorsInField("Name").map((errorMessage) =>
              IsFieldFocuous === false ? (
                <Text key={errorMessage} style={styles.TextEr}>
                  {errorMessage}
                </Text>
              ) : (
                <></>
              )
            )}
        </View>

        <View style={{ marginTop: 10 }}>
          <TextInput
            mode="outlined"
            selectionColor="#F2AE1B"
            underlineColor="#F2AE1B"
            outlineColor="#F2AE1B"
            placeholder="JhonDoe@gmail.com..."
            dense={true}
            label="Email"
            onFocus={() => some()}
            value={Email}
            onChangeText={(Email) => setEmail(Email)}
          />
          {isFieldInError("Email") &&
            getErrorsInField("Email").map((errorMessage) =>
              IsFieldFocuous === false ? (
                <Text key={errorMessage} style={styles.TextEr}>
                  {errorMessage}
                </Text>
              ) : (
                <></>
              )
            )}
        </View>
        <View style={{ marginTop: 10 }}>
          <TextInput
            mode="outlined"
            //   theme={{ colors.label.pink600 }}
            selectionColor="#F2AE1B"
            underlineColor="#F2AE1B"
            outlineColor="#F2AE1B"
            dense={true}
            onFocus={() => some()}
            placeholder="*********"
            label="Password"
            value={Password}
            onChangeText={(Password) => setPassword(Password)}
          />
          {isFieldInError("Password") &&
            getErrorsInField("Password").map((errorMessage) =>
              IsFieldFocuous === false ? (
                <Text key={errorMessage} style={styles.TextEr}>
                  {errorMessage}
                </Text>
              ) : (
                <></>
              )
            )}
        </View>

        <View style={{ marginBottom: 10, marginTop: 40 }}>
          <Button
            style={{ backgroundColor: "#F2AE1B", padding: 5 }}
            icon="chevron-right"
            mode="contained"
            onPress={() => registerUser()}
            //   onPress={() => _onPressButton()}
          >
            SignUp
          </Button>
        </View>
        <Button
          //  loading={true}
          labelStyle={{ color: "#F2AE1B", padding: 5, fontWeight: "bold" }}
          icon="chevron-right"
          mode="outlined"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Button>
        <View style={{ marginTop: 10 }}>
          <Text style={{ textAlign: "right", color: "#FFB22A" }}>
            Not-Intrested
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
    flex: 3,
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    marginTop: 0,
    borderTopLeftRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  TextEr: {
    color: "#ff8e8e",
    fontSize: 10,
  },
});

export default SignUp;
