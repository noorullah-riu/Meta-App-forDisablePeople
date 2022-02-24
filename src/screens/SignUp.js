import React, { useState, useContext } from "react";
import {
  View,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
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
import { Icon } from "react-native-elements";
import axios from "axios";
import { useValidation } from "react-native-form-validator";
import * as Animatable from "react-native-animatable";

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

import EcomContext from "../provider/DataProvider";

const SignUp = ({ navigation }) => {
  const [index, setindex] = useState(0);

  const { Token } = useContext(EcomContext);

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Relationship, setRelationship] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [IsFieldFocuous, setIsFieldFocuous] = useState(false);

  const [Loading, setLoading] = useState(false);

  const {
    validate,
    isFieldInError,
    getErrorsInField,
    getErrorMessages,
    isFormValid,
  } = useValidation({
    state: { Email, Name, Phone, Relationship, Password, ConfirmPassword },
  });

  const _onPressButton = () => {
    validate({
      Name: { required: true },
      Email: { required: true, email: true },
      Phone: { required: true, numbers: true },
      Password: { minlength: 6, required: true },
      ConfirmPassword: { required: true, equalPassword: Password },

      // date: { date: "YYYY-MM-DD" },
      // Relationship: { required: true },
    });
    // const a = isFormValid();
    // alert(a);
    //  show();
    // setIsFieldFocuous(false);
    const a = isFormValid();
    if (a) {
      SignUp();
    }
  };

  const API = axios.create({
    baseURL: `https://metafeapi.azurewebsites.net/api`,
    // timeout: 100,
    // baseURL: "https://dietaapi.azurewebsites.net/api/FatSecret/Food",

    headers: { Authorization: `bearer ${Token}` },
  });

  function SignUp() {
    setLoading(true);
    API.post("/Users/registration", {
      FirstName: Name,
      LastName: "",
      Phone: Phone,
      Email: Email,
      Mobile: Phone,
      Password: Password,
      Gender: 1,
      Active: true,
      Admin: false,
      Deleted: false,
      RoleId: 3,
    })
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          setLoading(false);
          alert("Registration Success");
          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        console.log(error);
        //  alert(error.response.data.message);
        //   console.log(error.response.data.message);
        //   console.log(error.response.status);
        setLoading(false);
        //  console.log(error.response.headers);
      });
  }

  return (
    <View style={styles.MainDiv}>
      <Animatable.View animation="bounceInLeft" style={styles.HeaderDiv}>
        <Icon
          reverse
          name="chevron-left"
          type="feather"
          color="#bbb"
          backgroundColor="#111"
          size={20}
          onPress={() => navigation.navigate("Login")}
        />
      </Animatable.View>

      <Animatable.View
        animation="bounceInLeft"
        style={{
          flex: 0.5,
          //   justifyContent: "",
        }}
      >
        <Headline style={{ color: "#111", paddingHorizontal: 30 }}>
          Register
        </Headline>
      </Animatable.View>

      <Animatable.View
        animation="fadeInUpBig"
        style={{
          flex: 4,
          paddingHorizontal: 30,
          paddingVertical: 0, //30
        }}
      >
        <TextInput
          mode="outlined"
          dense={true}
          theme={{
            colors: { primary: "#21a9ff", underlineColor: "transparent" },
            roundness: 20,
          }}
          placeholder="JhonDoe..."
          label="Name"
          value={Name}
          onChangeText={(Name) => setName(Name)}
        />
        {isFieldInError("Name") &&
          getErrorsInField("Name").map((errorMessage) =>
            IsFieldFocuous === false ? (
              <Animatable.View animation="slideInLeft">
                <Text key={errorMessage} style={{ color: "red", fontSize: 10 }}>
                  {errorMessage}
                </Text>
              </Animatable.View>
            ) : (
              <></>
            )
          )}
        <TextInput
          mode="outlined"
          dense={true}
          theme={{
            colors: { primary: "#21a9ff", underlineColor: "transparent" },
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
              <Animatable.View animation="slideInLeft">
                <Text key={errorMessage} style={{ color: "red", fontSize: 10 }}>
                  {errorMessage}
                </Text>
              </Animatable.View>
            ) : (
              <></>
            )
          )}

        <View style={{ marginBottom: 0 }}>
          <TextInput
            mode="outlined"
            dense={true}
            keyboardType="numeric"
            theme={{
              colors: { primary: "#4076CB", underlineColor: "transparent" },
              roundness: 20,
            }}
            placeholder="+2******"
            label="Phone"
            value={Phone}
            onChangeText={(Phone) => setPhone(Phone)}
          />
          {isFieldInError("Phone") &&
            getErrorsInField("Phone").map((errorMessage) =>
              IsFieldFocuous === false ? (
                <Animatable.View animation="slideInLeft">
                  <Text
                    key={errorMessage}
                    style={{ color: "red", fontSize: 10 }}
                  >
                    {errorMessage}
                  </Text>
                </Animatable.View>
              ) : (
                <></>
              )
            )}
        </View>

        <View>
          <TextInput
            mode="outlined"
            dense={true}
            secureTextEntry={true}
            theme={{
              colors: { primary: "#4076CB", underlineColor: "transparent" },
              roundness: 20,
            }}
            placeholder="*********"
            label="Password"
            value={Password}
            onChangeText={(Password) => setPassword(Password)}
          />
          {isFieldInError("Password") &&
            getErrorsInField("Password").map((errorMessage) =>
              IsFieldFocuous === false ? (
                <Animatable.View animation="slideInLeft">
                  <Text
                    key={errorMessage}
                    style={{ color: "red", fontSize: 10 }}
                  >
                    {errorMessage}
                  </Text>
                </Animatable.View>
              ) : (
                <></>
              )
            )}
        </View>
        <View style={{ marginBottom: 20 }}>
          <TextInput
            mode="outlined"
            dense={true}
            secureTextEntry={true}
            theme={{
              colors: { primary: "#4076CB", underlineColor: "transparent" },
              roundness: 20,
            }}
            placeholder="*********"
            label="Confirm Password"
            value={ConfirmPassword}
            onChangeText={(ConfirmPassword) =>
              setConfirmPassword(ConfirmPassword)
            }
          />
          {isFieldInError("ConfirmPassword") &&
            getErrorsInField("ConfirmPassword").map((errorMessage) =>
              IsFieldFocuous === false ? (
                <Animatable.View animation="slideInLeft">
                  <Text
                    key={errorMessage}
                    style={{ color: "red", fontSize: 10 }}
                  >
                    {errorMessage}
                  </Text>
                </Animatable.View>
              ) : (
                <></>
              )
            )}
        </View>

        {/*         <View style={{ marginBottom: 20 }}>
          <TextInput
            mode="outlined"
            dense={true}
            theme={{
              colors: { primary: "#4076CB", underlineColor: "transparent" },
              roundness: 20,
            }}
            placeholder="Relationship"
            label="Relationship"
            value={Relationship}
            onChangeText={(Relationship) => setRelationship(Relationship)}
          />
          {isFieldInError("Relationship") &&
            getErrorsInField("Relationship").map((errorMessage) =>
              IsFieldFocuous === false ? (
                <Animatable.View animation="slideInLeft">
                  <Text
                    key={errorMessage}
                    style={{ color: "red", fontSize: 10 }}
                  >
                    {errorMessage}
                  </Text>
                </Animatable.View>
              ) : (
                <></>
              )
            )}
        </View> */}
        <Button
          loading={Loading}
          //  disabled={false}
          style={{ backgroundColor: "#21a9ff", padding: 5, borderRadius: 30 }}
          //  icon="chevron-right"
          mode="contained"
          onPress={() => _onPressButton()}
          // onPress={() => navigation.navigate("MainAPp")}
        >
          Register
        </Button>
      </Animatable.View>

      {/*     <Animatable.View animation="fadeInUpBig" style={styles.FooterDiv}>
        <TouchableOpacity
          style={{ marginBottom: 20 }}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={{ textAlign: "center", color: "#111" }}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
        <Button
          // loading={true}
          disabled={false}
          style={{ backgroundColor: "#4076CB", padding: 5, borderRadius: 30 }}
          icon="chevron-right"
          mode="contained"
          onPress={() => _onPressButton()}
        >
          Sign In
        </Button>
      </Animatable.View> */}
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
    paddingVertical: 0,

    /*     flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 20, */
  },

  PostHeaderDiv: {
    flex: 0.5,
    justifyContent: "flex-end",
  },
  BodyDiv: {
    flex: 2,
    paddingVertical: 0,
    paddingHorizontal: 30,
  },

  FooterDiv: {
    flex: 1,
    paddingHorizontal: 30,
  },
});
export default SignUp;
