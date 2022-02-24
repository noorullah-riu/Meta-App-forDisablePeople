import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useContext } from "react";
import EcomContext from "./src/provider/DataProvider";
import { EcomProvider } from "./src/provider/DataProvider";

//#region  Drawer Tab
import { DrawerContent } from "./src/screens/DrawerContent";
import { createDrawerNavigator } from "@react-navigation/drawer";

//#endregion
import Login from "./src/screens/Login";
import SignUp from "./src/screens/SignUp";

import Home from "./src/screens/Home";
import ModuleList from "./src/screens/ModuleList";
import Profile1 from "./src/screens/Profile1";
import ModuleDetails from "./src/screens/ModuleDetails";
import QuizAgainstArticle from "./src/screens/QuizAgainstArticle";

import paginationtest from "./src/screens/paginationtest";

import lottieeg from "./src/screens/Lottieeg";

const Drawer = createDrawerNavigator();

function Apolo(props) {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: "right",
        drawerType: "back",
        drawerStyle: { width: "60%" },

        //   drawerType: "slide",
      }}
      drawerStyle={{
        backgroundColor: "#12142b",
        //  width: 240,
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="ModuleList"
        component={ModuleList}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name="ModuleDetails"
        component={ModuleDetails}
      />

      <Drawer.Screen
        options={{ headerShown: false }}
        name="QuizAgainstArticle"
        component={QuizAgainstArticle}
      />

      <Drawer.Screen
        options={{ headerShown: false }}
        name="Profile1"
        component={Profile1}
      />

      {/* 
      <Drawer.Screen name="Drawer1" component={Drawer1} /> */}
      {/*    <Drawer.Screen name="Drawer2" component={Drawer2} />
      <Drawer.Screen
        options={{
          headerShown: true,
          title: "Shipping Details",
          headerTintColor: "#FFB22A",
          headerTitleStyle: {
            fontSize: 16,
          },
        }}
        name="ShippingDetail"
        component={ShippingDetail}
      /> */}
      {/*       <Drawer.Screen
        options={{
          headerShown: true,
          title: "My Favourite",
          headerTintColor: "#FFB22A",
          headerTitleStyle: {
            fontSize: 16,
          },
        }}
        name="Favourite"
        component={Favourite}
      />
      <Drawer.Screen
        options={{
          headerShown: true,
          title: "Personal Details",
          headerTintColor: "#FFB22A",
          headerTitleStyle: {
            fontSize: 16,
          },
        }}
        name="PersonalDetails"
        component={PersonalDetails}
      /> */}
    </Drawer.Navigator>
  );
}

const LoginStack = createStackNavigator();

const LoginStackFunctionc = () => {
  return (
    <NavigationContainer independent="true">
      <LoginStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <LoginStack.Screen name="Login" component={Login} />
        <LoginStack.Screen name="SignUp" component={SignUp} />

        <LoginStack.Screen name="MainAPp" component={Apolo} />
      </LoginStack.Navigator>
    </NavigationContainer>
    /*   </PaperProvider> */
  );
};

/* const AppFlow = createStackNavigator();

const AppFlowStackScreen = () => {
  return (
    <NavigationContainer independent="true">
      <AppFlow.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >

        <AppFlow.Screen name="ChooseRole" component={ChooseRoleScreen} />

        <AppFlow.Screen
          name="AuthFlowFreeUser"
          component={AuthFlowFreeUserScreen}
        />
        <AppFlow.Screen name="AuthFlowUser" component={AuthFlowUserScreen} />
        <AppFlow.Screen
          name="AuthFlowTrainer"
          component={AuthFlowTrainerScreen}
        />
        <AppFlow.Screen
          name="AuthFlowNutritionist"
          component={AuthFlowNutritionistScreen}
        />

      </AppFlow.Navigator>
    </NavigationContainer>
  );
}; */

export default () => {
  return (
    <EcomProvider>
      <LoginStackFunctionc />
    </EcomProvider>
  );
};
