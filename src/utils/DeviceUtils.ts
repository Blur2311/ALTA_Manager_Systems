import {
  addDoc,
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { Device } from "../model/Device";

//Create
export const createDevice = async (data: any) => {
  try {
    await addDoc(collection(db, "devices"), data);
  } catch (error) {
    console.log(error);
  }
};

//Read
export const getAllDevice = async () => {
  try {
    const deviceCollec = collection(db, "devices");
    const deviceDoc = await getDocs(deviceCollec);

    const deviceData = deviceDoc.docs.map((data) => ({
      ...data.data(),
      id: data.id,
    })) as Device[];

    return deviceData;
  } catch (error) {
    console.log(error);
  }
};

export const getDeviceById = async (id: string) => {
  try {
    const deviceDoc = doc(db, "devices", id);
    const deviceData = await getDoc(deviceDoc);
    if (deviceData.exists()) {
      return deviceData.data();
    } else return null;
  } catch (error) {
    console.log(error);
  }
};

export const checkDeviceId = async (newId: string, oldId?: string) => {
  try {
    const deviceCollec = collection(db, "devices");
    const deviceQuery = query(deviceCollec, where("deviceId", "==", newId));

    const deviceDocs = await getDocs(deviceQuery);
    const deviceExist = !deviceDocs.empty;

    if (oldId) {
      const deviceQuery = query(
        deviceCollec,
        where("deviceId", "==", newId),
        where(documentId(), "!=", oldId),
      );
      const currentdeviceDocs = await getDocs(deviceQuery);
      return currentdeviceDocs.empty;
    }
    return !deviceExist;
  } catch (error) {
    console.log(error);
  }
};

//Update
export const updateDevice = async (id: string, data: any) => {
  try {
    console.log(data);
    await setDoc(doc(db, "devices", id), data);
  } catch (error) {
    console.log(error);
  }
};
