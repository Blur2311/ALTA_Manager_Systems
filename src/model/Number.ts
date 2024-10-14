import { Timestamp } from "firebase/firestore";

export interface NumberManagement {
  id: string;
  customerName: string;
  email: string;
  expiryDate: Timestamp;
  order: number;
  phoneNumber: string;
  provisionTime: Timestamp;
  serviceName: string;
  status: string;
  supplySource: string;
}
