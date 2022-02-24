import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  Title,
  Caption,
  Avatar,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  Headline,
  Subheading,
  Divider,
} from "react-native-paper";
import { Icon } from "react-native-elements";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

export function DrawerContent(props) {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  function show() {
    alert("Something");
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
      }}
    >
      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
        {/*         <View
          style={{
            flexDirection: "row",
            paddingRight: 10,
            paddingTop: 0,
            alignItems: "center",
          }}
        >
          <View style={{ flex: 2, alignItems: "center" }}>
            <Title>
              {Return_Fname} {Return_Lname}
            </Title>
            <Caption>{Return_Email}</Caption>
          </View>
          <View style={{ flex: 1 }}>
            <Avatar.Image
              size={70}
              source={{
                uri: "https://picsum.photos/200",
              }}
            />
          </View>
        </View>
        <Divider orientation="horizontal" style={{ marginTop: 20 }} /> */}

        <TouchableOpacity /* onPress={() => props.navigation.navigate("Home")} */
        >
          <View
            style={{
              flexDirection: "row",
              paddingTop: 20,
              paddingBottom: 10,
              alignItems: "center",
            }}
          >
            <View style={{ flex: 2 }}>
              <Icon
                name="align-left"
                type="feather"
                color="#4076CB"
                size={20}
              />
            </View>
            <View style={{ flex: 4, alignItems: "flex-start" }}>
              <Text style={{ fontWeight: "bold" }}>Track progress</Text>
            </View>
            <View style={{ flex: 1 }}></View>
          </View>
        </TouchableOpacity>
        <Divider orientation="horizontal" style={{ marginLeft: 40 }} />

        <TouchableOpacity /* onPress={() => props.navigation.navigate("Home")} */
        >
          <View
            style={{
              flexDirection: "row",
              paddingTop: 20,
              paddingBottom: 10,
              alignItems: "center",
            }}
          >
            <View style={{ flex: 2 }}>
              <Icon name="calendar" type="feather" color="#4076CB" size={20} />
            </View>
            <View style={{ flex: 4, alignItems: "flex-start" }}>
              <Text style={{ fontWeight: "bold" }}>Tele-Advocacy</Text>
            </View>
            <View style={{ flex: 1 }}></View>
          </View>
        </TouchableOpacity>
        <Divider orientation="horizontal" style={{ marginLeft: 40 }} />

        <TouchableOpacity /* onPress={() => props.navigation.navigate("Home")} */
        >
          <View
            style={{
              flexDirection: "row",
              paddingTop: 20,
              paddingBottom: 10,
              alignItems: "center",
            }}
          >
            <View style={{ flex: 2 }}>
              <Icon name="award" type="feather" color="#4076CB" size={20} />
            </View>
            <View style={{ flex: 4, alignItems: "flex-start" }}>
              <Text style={{ fontWeight: "bold" }}>Certificates</Text>
            </View>
            <View style={{ flex: 1 }}></View>
          </View>
        </TouchableOpacity>
        <Divider orientation="horizontal" style={{ marginLeft: 40 }} />

        <TouchableOpacity onPress={() => props.navigation.navigate("Profile1")}>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 20,
              paddingBottom: 10,
              alignItems: "center",
            }}
          >
            <View style={{ flex: 2 }}>
              <Icon name="settings" type="feather" color="#4076CB" size={20} />
            </View>
            <View style={{ flex: 4, alignItems: "flex-start" }}>
              <Text style={{ fontWeight: "bold" }}>Settings</Text>
            </View>
            <View style={{ flex: 1 }}></View>
          </View>
        </TouchableOpacity>
        <Divider orientation="horizontal" style={{ marginLeft: 40 }} />
        <TouchableOpacity /* onPress={() => props.navigation.navigate("Home")} */
        >
          <View
            style={{
              flexDirection: "row",
              paddingTop: 20,
              paddingBottom: 10,
              alignItems: "center",
            }}
          >
            <View style={{ flex: 2 }}>
              <Icon
                name="help-circle"
                type="feather"
                color="#4076CB"
                size={20}
              />
            </View>
            <View style={{ flex: 4, alignItems: "flex-start" }}>
              <Text style={{ fontWeight: "bold" }}>Help</Text>
            </View>
            <View style={{ flex: 1 }}></View>
          </View>
        </TouchableOpacity>

        <Divider orientation="horizontal" style={{ marginLeft: 40 }} />
      </DrawerContentScrollView>

      <Drawer.Section>
        <DrawerItem
          //  onPress={() => props.navigation.navigate("Login")}
          style={{ backgroundColor: "#fff" }}
          icon={({}) => (
            <Icon
              name="log-out"
              type="feather"
              color="#4076CB"
              size={20}
              onPress={() => props.navigation.navigate("Login")}
            />
          )}
          label="LogOut"
          labelStyle={{ color: "#7a7ea3" }}
        />
      </Drawer.Section>
      <Text style={{ color: "#aaa", textAlign: "center" }}>version 1.2.0</Text>
    </View>
  );
}
