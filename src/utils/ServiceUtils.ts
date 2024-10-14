import {
  addDoc,
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { Service } from "../model/Service";
import firebase from "firebase/compat/app";

//Create
export const createService = async (data: any) => {
  try {
    data.timeCreate = Timestamp.now();
    await addDoc(collection(db, "services"), data);
    console.log(formatTimestamp(Timestamp.now()));
  } catch (error) {
    console.log(error);
  }
};

// Read
export const getAllService = async () => {
  try {
    const serviceCollec = collection(db, "services");
    const serviceDocs = await getDocs(serviceCollec);

    const serviceData = serviceDocs.docs.map((data) => ({
      ...data.data(),
      id: data.id,
    })) as Service[];

    return serviceData;
  } catch (error) {
    console.log(error);
  }
};

export const getServiceById = async (id: string) => {
  try {
    const serRef = doc(db, "services", id);
    const serDoc = await getDoc(serRef);
    if (serDoc.exists()) {
      return serDoc.data();
    } else return null;
  } catch (error) {
    console.log(error);
  }
};

export const getServiceByName = async (name: string) => {
  try {
    const q = query(
      collection(db, "services"),
      where("serviceName", "==", name),
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const logData = querySnapshot.docs.map((data) => ({
        ...data.data(),
        id: data.id,
      })) as Service[];
      return logData[0];
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkServiceId = async (serviceId: string, id?: string) => {
  try {
    const serviceCollec = collection(db, "services");
    const serviceQuery = query(
      serviceCollec,
      where("serviceId", "==", serviceId),
    );

    const serviceDocs = await getDocs(serviceQuery);
    const serviceExist = !serviceDocs.empty;

    if (id) {
      const serviceQuery = query(
        serviceCollec,
        where("serviceId", "==", serviceId),
        where(documentId(), "!=", id),
      );
      const currentServiceDocs = await getDocs(serviceQuery);
      return currentServiceDocs.empty;
    }
    return !serviceExist;
  } catch (error) {
    console.log(error);
  }
};

//Update
export const updateService = async (id: string, data: any) => {
  try {
    console.log(data);
    await setDoc(doc(db, "services", id), data);
  } catch (error) {
    console.log(error);
  }
};

// Other utils
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
