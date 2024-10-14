import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { UserLog } from "../model/UserLog";
import firebase from "firebase/compat/app";
import Cookies from "js-cookie";
import axios from "axios";

//Create
export const createLog = async (action: string) => {
  try {
    const accountCookie = Cookies.get("userInfo");
    let username;
    if (accountCookie) {
      const parsedAccount = JSON.parse(accountCookie);
      username = parsedAccount.username;
    }

    const response = await axios.get("https://api.ipify.org?format=json");
    console.log(response.data.ip); // Lưu địa chỉ IP vào state

    const data = {
      username: username,
      ipAddress: response.data.ip,
      timestamp: Timestamp.now(),
      action: action,
    };
    await addDoc(collection(db, "userlog"), data);
  } catch (error) {
    console.log(error);
  }
};

//Read
export const getAllUserLog = async () => {
  try {
    const logCollec = collection(db, "userlog");
    const logDocs = await getDocs(logCollec);

    const logData = logDocs.docs.map((data) => ({
      ...data.data(),
      id: data.id,
    })) as UserLog[];

    return logData;
  } catch (error) {
    console.log(error);
  }
};

export const getUserLogByUsername = async (username: string) => {
  try {
    const q = query(
      collection(db, "userlog"),
      where("username", "==", username),
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const logData = querySnapshot.docs.map((data) => ({
        ...data.data(),
        id: data.id,
      })) as UserLog[];
      return logData;
    }
  } catch (error) {
    console.log(error);
  }
};

// Others
export const formatTimestampUserLog = (
  timestamp: firebase.firestore.Timestamp,
): string => {
  const date = timestamp.toDate();

  // Lấy giờ và phút
  const timeString = date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Lấy ngày, tháng, năm
  const dateString = date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Kết hợp giờ và ngày
  return `${dateString} ${timeString}`;
};
