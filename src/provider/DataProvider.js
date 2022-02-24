import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
//import API from "../api/apiCall";
//import AsyncStorage from "@react-native-async-storage/async-storage";

//#region something

const _0x2937 = [
  "228qGwqcK",
  "2034732ePRSjq",
  "234NFTYea",
  "152hPDTFC",
  "createContext",
  "1711DMvwJo",
  "4101LWyZTB",
  "373MHoqfG",
  "313884Xxdabe",
  "625132FNhWeO",
  "41670vtuiRw",
];
const _0x2acd = function (_0x1bb1c1, _0x3914ba) {
  _0x1bb1c1 = _0x1bb1c1 - 0xdc;
  let _0x29378b = _0x2937[_0x1bb1c1];
  return _0x29378b;
};
const _0x1ef3f6 = _0x2acd;
(function (_0x13b69c, _0x4189d0) {
  const _0x533e89 = _0x2acd;
  while (!![]) {
    try {
      const _0x1b9c84 =
        -parseInt(_0x533e89(0xe4)) +
        -parseInt(_0x533e89(0xe0)) * parseInt(_0x533e89(0xe2)) +
        -parseInt(_0x533e89(0xe6)) * parseInt(_0x533e89(0xdd)) +
        -parseInt(_0x533e89(0xe5)) +
        -parseInt(_0x533e89(0xe1)) * parseInt(_0x533e89(0xde)) +
        parseInt(_0x533e89(0xe3)) +
        parseInt(_0x533e89(0xdc));
      if (_0x1b9c84 === _0x4189d0) break;
      else _0x13b69c["push"](_0x13b69c["shift"]());
    } catch (_0x5d36e9) {
      _0x13b69c["push"](_0x13b69c["shift"]());
    }
  }
})(_0x2937, 0x5993b);
const EcomContext = React[_0x1ef3f6(0xdf)]();

//#endregion

export const EcomProvider = ({ children }) => {
  const [Token, setToken] = useState("");
  const [UserId, setUserId] = useState();

  const APILogin = axios.create({
    baseURL: `https://metafeapi.azurewebsites.net/api`,
    //  timeout: 5000,
    // baseURL: "https://dietaapi.azurewebsites.net/api/FatSecret/Food",

    // headers: { Authorizaton: `bareer ${Token}` },
  });

  const API = axios.create({
    baseURL: `https://metafeapi.azurewebsites.net/api`,
    // timeout: 100,
    // baseURL: "https://dietaapi.azurewebsites.net/api/FatSecret/Food",

    headers: { Authorization: `bearer ${Token}` },
  });

  //#region Login
  const [Email, setEmail] = useState("string7@gmail.com");
  const [Password, setPassword] = useState("pass");
  const [Return_Email, setReturn_Email] = useState("");
  const [Return_Fname, setReturn_Fname] = useState("");
  const [Return_Lname, setReturn_Lname] = useState("");

  const [Login_Loading, setLogin_Loading] = useState(false);

  function Login() {
    setLogin_Loading(true);
    APILogin.post("/Auth/MobileAuthenticate", {
      Username: Email,
      Password: Password,
    })
      .then((response) => {
        //   console.log(response);
        if (response.data) {
          console.log(response.data);
          //    alert("Case Success");
          setToken(response.data.result.accessToken);
          setUserId(response.data.result.user.id);
          setReturn_Email(response.data.result.user.email);
          setReturn_Fname(response.data.result.user.firstName);
          setReturn_Lname(response.data.result.user.lastName);

          setLogin_Loading(false);
          //  return "true";
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
        //   console.log(error.response.data.message);
        //   console.log(error.response.status);
        setLogin_Loading(false);
        //  console.log(error.response.headers);
      });
  }

  //#endregion

  //#region get

  const [Modules, setModules] = useState([]);
  const [Modulesprogress, setModulesprogress] = useState();

  const GetModules = async () => {
    try {
      const response = await API.get(
        `/Modules/GetAllModules?ID=0&PageNumber=1`
      );
      console.log("Get All Modules");
      if (response) {
        console.log(response);
        //  setModules(response.data.modules.$values);
        //  setModulesprogress(response.data.progress);
      }
    } catch (err) {
      alert(err);
      // setErrorMessage("Api Call Failed");
    }
  };

  //#endregion

  useEffect(() => {}, []);

  return (
    <EcomContext.Provider
      value={{
        Login,
        Login_Loading,
        Email,
        Password,
        setEmail,
        setPassword,

        GetModules,
        Token,
        setToken,
        UserId,
        Return_Email,
        Return_Fname,
        Return_Lname,

        Modules,
        setModules,

        Modulesprogress,
      }}
    >
      {children}
    </EcomContext.Provider>
  );
};

export default EcomContext;
