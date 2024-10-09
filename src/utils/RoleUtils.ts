import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../config/firebase";
import { Role } from "../model/Role";

export const getAllRole = async () => {
  const roleCollection = collection(db, "Role");
  const roleDoc = await getDocs(roleCollection);
  const data = roleDoc.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Role[];

  return data;
};

export const getRole = async (id: string) => {
  const roleRef = doc(db, "Role", id);
  const roleSnap = await getDoc(roleRef);

  if (roleSnap.exists()) {
    return roleSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};
export const updateRole = async (id: string, roleData: any) => {
  const roleRef = doc(db, "Role", id);
  await setDoc(roleRef, roleData);
};

export const createRole = async (roleData: any) => {
  await addDoc(collection(db, "Role"), roleData);
};

export const updateRoleQuantity = async (roleName: string, value: number) => {
  try {
    // Tạo query để tìm Role dựa trên roleName
    const q = query(collection(db, "Role"), where("roleName", "==", roleName));

    // Lấy kết quả từ query
    const querySnapshot = await getDocs(q);

    // Kiểm tra nếu tìm thấy role
    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (roleDoc) => {
        const roleRef = doc(db, "Role", roleDoc.id);

        // Lấy current quantity và tăng lên 1
        const currentQuantity = roleDoc.data().quantity || 0;
        await updateDoc(roleRef, {
          quantity: currentQuantity + value,
        });

        console.log(`Updated quantity for role ${roleName}`);
      });
    } else {
      console.log(`Role with name ${roleName} not found.`);
    }
  } catch (error) {
    console.error("Error updating role quantity:", error);
  }
};
