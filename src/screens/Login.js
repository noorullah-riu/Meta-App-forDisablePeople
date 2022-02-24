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
  Alert,
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
import { Icon } from "react-native-elements";

import EcomContext from "../provider/DataProvider";

import { useValidation } from "react-native-form-validator";
import * as Animatable from "react-native-animatable";
import Lottieeg from "./Lottieeg";

import { colors } from "../provider/vars";

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

const Login = ({ navigation }) => {
  const [index, setindex] = useState(0);
  const [IsFieldFocuous, setIsFieldFocuous] = useState(false);

  const {
    Login,
    Email,
    Password,
    setEmail,
    setPassword,
    Token,
    Login_Loading,
  } = useContext(EcomContext);

  const {
    validate,
    isFieldInError,
    getErrorsInField,
    getErrorMessages,
    isFormValid,
  } = useValidation({
    state: { Email, Password },
  });

  const _onPressButton = async () => {
    validate({
      Email: { required: true, email: true },
      Password: { required: true },
    });

    const a = isFormValid();
    if (a) {
      Login();
    }
  };
  const NavigateToHomeConditionalFunction = () => {
    // alert("Before login condition");
    if (Token === "") {
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "MainAPp" }],
      });
      ///  navigation.navigate("MainAPp");
    }
  };
  const some = () => {
    setIsFieldFocuous(true);
  };
  useEffect(() => {
    // action on update of movies
    NavigateToHomeConditionalFunction();
  }, [Token]);
  return (
    <View style={styles.MainDiv}>
      <Animatable.View animation="bounceInLeft" style={styles.HeaderDiv}>
        {/*         <Icon
          reverse
          name="chevron-left"
          type="feather"
          color="#bbb"
          backgroundColor="#111"
          size={20}
          onPress={() => alert("Profile Function ")}
        /> */}
      </Animatable.View>

      <Animatable.View animation="bounceInLeft" style={styles.PostHeaderDiv}>
        <Headline style={{ color: "#111", paddingHorizontal: 30 }}>
          Sign In
        </Headline>
      </Animatable.View>

      <Animatable.View animation="fadeInUpBig" style={styles.BodyDiv}>
        <TextInput
          mode="outlined"
          dense={true}
          theme={{
            colors: { primary: "#4076CB", underlineColor: "transparent" },
            roundness: 20,
          }}
          placeholder="JhonDoe@gmail.com..."
          label="Email"
          value={Email}
          onChangeText={(Email) => setEmail(Email)}
        />
        {isFieldInError("Email") &&
          getErrorsInField("Email").map((errorMessage) =>
            IsFieldFocuous === false ? (
              <Text key={errorMessage} style={{ color: "red", fontSize: 10 }}>
                {errorMessage}
              </Text>
            ) : (
              <></>
            )
          )}

        <View style={{ marginBottom: 20, marginTop: 10 }}>
          <TextInput
            mode="outlined"
            dense={true}
            secureTextEntry={true}
            theme={{
              colors: { primary: "#4076CB", underlineColor: "transparent" },
              roundness: 20,
            }}
            /*     right={<TextInput.Icon name="eye" />} */
            placeholder="*********"
            label="Password"
            value={Password}
            onChangeText={(Password) => setPassword(Password)}
          />
          {/*           <Icon
            //   name={hidePass ? "eye-slash" : "eye"}
            name={"eye"}
            size={15}
            color="grey"
            //   onPress={() => setHidePass(!hidePass)}
          /> */}
          {isFieldInError("Password") &&
            getErrorsInField("Password").map((errorMessage) =>
              IsFieldFocuous === false ? (
                <Text key={errorMessage} style={{ color: "red", fontSize: 10 }}>
                  {errorMessage}
                </Text>
              ) : (
                <></>
              )
            )}
        </View>
      </Animatable.View>

      {/*   {Login_Loading ? (
        <Lottieeg />
      ) : ( */}
      <Animatable.View animation="fadeInUpBig" style={styles.FooterDiv}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 3, alignItems: "flex-end" }}>
            <TouchableOpacity
              style={{ marginBottom: 20 }}
              //    onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={{ textAlign: "center", color: "#111" }}>
                Don't have an account?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "flex-start", paddingLeft: 5 }}>
            <TouchableOpacity
              style={{ marginBottom: 20 }}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#111",
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <>
          <Button
            loading={Login_Loading}
            //  disabled={Login_Loading}
            style={styles.btnStyle}
            //   icon="chevron-right"
            mode="contained"
            onPress={() => _onPressButton()}
            //   onPress={() => navigation.navigate("MainAPp")}
          >
            Sign In
          </Button>
        </>
      </Animatable.View>
      {/*   )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  MainDiv: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 20,

    // flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  HeaderDiv: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 20,
  },

  PostHeaderDiv: {
    flex: 0.5,
    justifyContent: "flex-end",
  },
  BodyDiv: {
    flex: 2,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },

  FooterDiv: {
    flex: 1,
    paddingHorizontal: 30,
  },
  btnStyle: {
    backgroundColor: colors.ActiveColor, //"#21a9ff",
    padding: 5,
    borderRadius: 30,
  },
});

export default Login;
