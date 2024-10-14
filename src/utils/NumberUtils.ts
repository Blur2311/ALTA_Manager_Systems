import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { NumberManagement } from "../model/Number";
import { getServiceByName, updateService } from "./ServiceUtils";

// Create
export const createNumber = async (data: any, service: string) => {
  let serviceData = await getServiceByName(service);
  try {
    //Kiểm tra số thứ tự hiện tại có bằng với stt giới hạn không
    if (serviceData && serviceData.currentNumber == serviceData.autoIncreTo) {
      serviceData.currentNumber = serviceData.autoIncreFrom;
      await updateService(serviceData.id, serviceData);
      serviceData = await getServiceByName(service);
    }
    // Lấy thông tin để tạo cấp số
    const timeCreate = Timestamp.now();
    const expirationDate = Timestamp.fromDate(
      new Date(timeCreate.toDate().setDate(timeCreate.toDate().getDate() + 2)),
    );
    let order;
    if (serviceData) {
      order = `${serviceData.prefix != 0 ? serviceData.prefix : ""}${serviceData.currentNumber}${serviceData.surfix != 0 ? serviceData.surfix : ""}`;
    }

    const createData = {
      customerName: data.customerName,
      email: data.email,
      expiryDate: expirationDate,
      order: Number(order),
      phoneNumber: data.phoneNumber,
      provisionTime: timeCreate,
      serviceName: service,
      status: "Đang chờ",
      supplySource: "Hệ thống",
    };

    await addDoc(collection(db, "numbers"), createData);

    return createData;
  } catch (error) {
    console.log(error);
  } finally {
    if (serviceData) {
      serviceData.currentNumber = Number(serviceData.currentNumber) + 1;
      await updateService(serviceData.id, serviceData);
    }
  }
};

// Read
export const getAllNumber = async () => {
  try {
    const numbCollec = collection(db, "numbers");
    const numbDocs = await getDocs(numbCollec);

    const numbData = numbDocs.docs.map((data) => ({
      ...data.data(),
      id: data.id,
    })) as NumberManagement[];

    return numbData;
  } catch (error) {
    console.log(error);
  }
};

export const getNumbById = async (id: string) => {
  try {
    const numbRef = doc(db, "numbers", id);
    const numbDoc = await getDoc(numbRef);
    if (numbDoc.exists()) {
      return numbDoc.data() as NumberManagement;
    } else return null;
  } catch (error) {
    console.log(error);
  }
};
