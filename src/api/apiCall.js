import axios from "axios";

import EcomContext from "../provider/DataProvider";
import { useContext, useEffect } from "react";

const API = axios.create({
  baseURL: `https://metafeapi.azurewebsites.net/api`,
  // timeout: 100,
  // headers: { Authorization: `bearer ${Token}` },
});

export default API;
