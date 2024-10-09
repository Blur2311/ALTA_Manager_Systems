import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Service } from "../model/Service";
import firebase from "firebase/compat/app";

export const getAllService = async () => {
  try {
    const serviceCollec = collection(db, "services");
    const serviceDocs = await getDocs(serviceCollec);

    const serviceData = serviceDocs.docs.map((data) => ({
      ...data.data(), // Sửa ở đây
      id: data.id,
    })) as Service[];

    return serviceData;
  } catch (error) {
    console.log(error);
  }
};

export const formatTimestamp = (
  timestamp: firebase.firestore.Timestamp,
): string => {
  const date = timestamp.toDate();

  // Lấy giờ và phút
  const timeString = date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Lấy ngày, tháng, năm
  const dateString = date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Kết hợp giờ và ngày
  return `${timeString} - ${dateString}`;
};
