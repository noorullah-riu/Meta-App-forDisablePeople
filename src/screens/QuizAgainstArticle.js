import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { colors } from "../provider/vars";

import EcomContext from "../provider/DataProvider";

import { Icon } from "react-native-elements";

import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import { ScrollView } from "react-native-gesture-handler";
import {
  View,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Animated,
  StyleSheet,
  Dimensions,
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

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

const QuizAgainstArticle = ({ navigation, route }) => {
  const { id } = route.params;
  const { Token, UserId } = useContext(EcomContext);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [eachQweightD, seteachQweightD] = useState(0);

  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  const [finalResult, setfinalResult] = useState(false);

  const [arr, setarr] = useState([]);
  const [choosedOptionBool, setchoosedOptionBool] = useState(false);
  const [optionID, setoptionID] = useState();

  const [lenghty, setlenghty] = useState(0);

  var ans = new Object();
  //var arr = [];

  const validateAnswer = (selectedOption, answer, optionID) => {
    // console.log(selectedOption);
    // console.log("Correct option", answer);

    setCurrentOptionSelected(selectedOption);
    // setIsOptionsDisabled(true);
    if (answer == true) {
      // Set Score
      setScore(score + 1);
      setchoosedOptionBool(true);
    } else {
      setchoosedOptionBool(false);
    }
    setoptionID(optionID);
    setShowNextButton(true);
  };

  const resultcalculator1 = () => {
    // find percentage for each question
    // total questions are lenghty
    // finding percentage from 100

    var eachQweight = 100 / lenghty; //100/4=25
    seteachQweightD(eachQweight);
    //  setScore(score * eachQweight);
  };
  const resultcalculator2 = () => {
    // find percentage for each question
    // total questions are lenghty
    // finding percentage from 100

    var eachQweight = 100 / lenghty; //100/4=25
    seteachQweightD(eachQweight);
    setScore(score * eachQweight);

    var localscore = score * eachQweight;

    if (localscore >= passingMarks) {
      setfinalResult(true);
      console.log("pass here");
    } else {
      console.log("fail here");
      setfinalResult(false);
    }
  };

  const handleNext = () => {
    resultcalculator1();
    ans = {
      ID: 0,
      QuizResultID: 0,
      QuizMappingID: QuizMappingID,
      ChoosedOption: optionID,
      AnswerIsCorrect: choosedOptionBool,
      TotalObtainedMarks: choosedOptionBool ? eachQweightD : 0,
      IsActive: true,
      CreatedDate: currentDate, //"2021-10-07T12:20:59.125Z",
    };

    setarr([...arr, ans]);
    if (currentQuestionIndex == lenghty - 1) {
      resultcalculator2();
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const modalclick = () => {
    setShowScoreModal(false);
    setCurrentQuestionIndex(0);

    QuizPost();
    navigation.navigate("Home");
  };

  const restartQuiz = () => {
    setShowScoreModal(false);

    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    setarr([]);

    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const getFormattedTime = (time) => {
    const currentTime = time;
    // console.log(time);
  };

  const renderQuestion = () => {
    return (
      <View
        style={{
          backgroundColor: colors.White,
        }}
      >
        <Subheading
          style={{
            color: "gray",
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          {Quizes[currentQuestionIndex]?.questionText}
        </Subheading>
      </View>
    );
  };
  const renderOptions = () => {
    return (
      <View style={{ paddingTop: 20 }}>
        {Quizes[currentQuestionIndex]?.questionOptions.map((option) => (
          <TouchableOpacity
            onPress={() =>
              validateAnswer(
                option.optionDescription,
                option.isCorrect,
                option.optionID
              )
            }
            //   disabled={isOptionsDisabled}
            key={option.optionID}
            style={{
              borderWidth: 3,
              borderColor:
                option.optionDescription == currentOptionSelected
                  ? colors.ActiveColor
                  : colors.Gray,

              //   borderColor:"#fff",
              height: 50,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              marginVertical: 5,
              marginHorizontal: 20,
            }}
          >
            <Text style={{ color: colors.Black }}>
              {option.optionDescription}
            </Text>

            {/* Show Check Or Cross Icon based on correct answer*/}
          </TouchableOpacity>
        ))}

        {renderNextButton()}
      </View>
    );
  };
  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <Button
          style={styles.btnStyle}
          //  icon="chevron-right"
          mode="contained"
          onPress={() => handleNext()}
          //   onPress={() => navigation.navigate("MainAPp")}
        >
          Next
        </Button>
      );
    } else {
      return null;
    }
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    /*   inputRange: [0, Quizes.length], */
    inputRange: [0, lenghty],
    outputRange: ["0%", "100%"],
  });
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 20,
          borderRadius: 20,
          backgroundColor: "#00000020",
        }}
      >
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: colors.ActiveColor,
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    );
  };

  const [Quizes, setQuizes] = useState([]);
  const [QuizeName, setQuizeName] = useState("");
  const [passingMarks, setpassingMarks] = useState(0);

  const [QuizMappingID, setQuizMappingID] = useState(0);
  const [IsPassed, setIsPassed] = useState(false);
  const [TotalObtainedMarks, setTotalObtainedMarks] = useState();
  const [CreatedDate, setCreatedDate] = useState();

  const [quizResultDetailArray, setquizResultDetailArray] = useState();

  const API = axios.create({
    baseURL: `https://metafeapi.azurewebsites.net/api`,
    // timeout: 100,
    // baseURL: "https://dietaapi.azurewebsites.net/api/FatSecret/Food",

    headers: { Authorization: `bearer ${Token}` },
  });

  const GetModules = async () => {
    try {
      const response = await API.get(
        `/Quiz/GetQuizDetailsByArticleID?ArticleID=${id}`
      );
      //   console.log("Get All Modules");
      if (response.data.result) {
        console.log("Get quize", response.data.result.questions.length);
        setlenghty(response.data.result.questions.length);
        setQuizeName(response.data.result.quizName);
        setpassingMarks(response.data.result.passingMarks);
        setQuizes(response.data.result.questions);

        setQuizMappingID(response.data.result.quizMappingID);
        //   setModulesprogress(response.data.progress);
      }
    } catch (err) {
      alert(err);
      setQuizes([]);
      // setErrorMessage("Api Call Failed");
    }
  };

  const [currentDate, setcurrentDate] = useState("");

  const todate = () => {
    var today = new Date();
    /*   var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    today = yyyy + "-" + mm + "-" + dd + "-" + time; */

    console.log(today.toISOString());
    setcurrentDate(today.toISOString());
  };

  function QuizPost() {
    API.post("/QuizResult/save", {
      ID: 0,
      QuizMappingID: QuizMappingID,
      UserID: UserId,
      IsPassed: finalResult,
      TotalObtainedMarks: score,
      TimeTaken: 20,
      IsActive: true,
      CreatedDate: currentDate, //"2021-10-07T12:20:59.125Z",

      quizResultDetail: arr,
    })
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          //     setLoading(false);
          alert("submit Success");

          restartQuiz();
          //   navigation.navigate("Login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    //  alert(id);
    GetModules();
    todate();
  }, [id]);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.lightGray,
        //  paddingTop: 20,
        //   marginBottom: 50,
      }}
    >
      <View
        style={{
          marginTop: 20,
          paddingBottom: 20,
          paddingTop: 10,
          paddingHorizontal: 20,
        }}
      >
        {/*       <View style={{ alignItems: "flex-end", paddingBottom: 20 }}>
          <Stopwatch
            laps
            handleFinish={(time) => console.log(time)}
            //   msecs
            start={true}
            //  reset={true}
            options={styles}
            getTime={getFormattedTime}
          />
        </View> */}
        <Headline>{QuizeName}</Headline>

        {renderProgressBar()}
        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          <View style={{ flex: 1 }}>
            <Text>Progress</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text>
              {currentQuestionIndex + 1}/{lenghty}
            </Text>
          </View>
        </View>
      </View>
      {/*     <StatusBar barStyle="light-content" backgroundColor={"blue"} /> */}
      <View
        style={{
          /*  paddingVertical: 40,
          paddingHorizontal: 16,
          backgroundColor: "gray",
          position: "relative", */

          //  marginTop: deviceHeight / 8,
          //   flexDirection: "row",
          //   paddingLeft: 10,
          // alignItems: "flex-start",
          //   height: deviceHeight / 1.5,
          flex: 1,
          width: deviceWidth - 40,
          marginHorizontal: 20,
          backgroundColor: colors.White,
          borderRadius: 20,
        }}
      >
        {/* Question */}
        {renderQuestion()}

        {/* Options */}
        {renderOptions()}

        {/* Next Button */}

        {/* Score Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showScoreModal}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                width: "90%",
                borderRadius: 20,
                padding: 20,
                alignItems: "center",
              }}
            >
              {/*    <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                {score > questions.length / 2 ? "Congratulations!" : "Oops!"}
              </Text> */}

              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                Passing Marks {passingMarks}
              </Text>

              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                Score is {score}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginVertical: 20,
                }}
              ></View>
              {/* Retry Quiz button */}
              {/*     <Text>here {arr.length}</Text> */}

              {/*          <FlatList
                horizontal={false}
                data={arr}
                showsHorizontalScrollIndicator={true}
                keyExtractor={(arr) => arr.ChoosedOption}
                renderItem={({ item }) => {
                  return (
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
                      <View style={{ marginLeft: 5 }}>
                        <Text numberOfLines={1}>{item.ChoosedOption}</Text>
                      </View>
                    </View>
                  );
                }}
              /> */}

              <TouchableOpacity
                //  onPress={() => navigation.navigate("Profile1")}
                // onPress={() => alert("pressed")}
                onPress={() => modalclick()}
                style={{
                  backgroundColor: colors.ActiveColor,
                  padding: 10,
                  width: "100%",
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 20,
                  }}
                >
                  Get Back To Home
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Background Image */}
        {/*       <Image
                source={require('../assets/images/DottedBG.png')}
                style={{
                    width: SIZES.width,
                    height: 130,
                    zIndex: -1,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    opacity: 0.5
                }}
                resizeMode={'contain'}
                /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: colors.ActiveColor, ///"#21a9ff",
    padding: 5,
    margin: 20,
    borderRadius: 0,
  },

  container: {
    backgroundColor: colors.ActiveColor,
    padding: 10,
    borderRadius: 10,

    //  borderRadius: 25,
    //  width: 220,
  },
  text: {
    fontSize: 20,
    color: "#FFF",
    marginLeft: 7,
  },
});

export default QuizAgainstArticle;
