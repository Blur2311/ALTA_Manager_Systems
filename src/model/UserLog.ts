import firebase from "firebase/compat/app";

export interface UserLog {
  id: string;
  username: string;
  ipAddress: string;
  action: string;
  timestamp: firebase.firestore.Timestamp;
}
