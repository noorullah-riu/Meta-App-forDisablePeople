import React from "react";
import { Button, StyleSheet, View, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

export default class Lottieeg extends React.Component {
  componentDidMount() {
    this.animation.play();
    // Or set a specific startFrame and endFrame with:
    // this.animation.play(30, 120);
  }

  resetAnimation = () => {
    // this.animation.reset();
    // this.animation.play();
    this.animation.pause();
  };

  render() {
    return (
      <View style={styles.animationContainer}>
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={{
            width: deviceWidth - 100,
            height: deviceWidth - 100,
            backgroundColor: "#fff",
          }}
          source={require("../Assets/404.json")}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />
        {/*   <View style={styles.buttonContainer}>
          <Button title="Restart Animation" onPress={this.resetAnimation} />
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    //   flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
