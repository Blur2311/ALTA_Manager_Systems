import firebase from "firebase/compat/app";

export interface Service {
  id: string;
  autoIncreFrom: number;
  autoIncreTo: number;
  currentNumber: number;
  description: string;
  prefix: number;
  reset: boolean;
  serviceId: string;
  serviceName: string;
  status: boolean;
  surfix: number;
  timeCreate: firebase.firestore.Timestamp; // Dùng Timestamp thay cho Date
}
