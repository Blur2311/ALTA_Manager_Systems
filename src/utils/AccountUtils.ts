import {
  query,
  collection,
  where,
  getDocs,
  doc,
  getDoc,
  documentId,
  setDoc,
} from "firebase/firestore";
import { Accounts } from "../model/Accounts";
import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import Cookies from "js-cookie";
import { updateRoleQuantity } from "./RoleUtils";

// Create
export const createAccount = async (data: any) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password,
    );
    const user = userCredential.user;
    const userId = user.uid;
    console.log(userId);

    await setDoc(doc(db, "accounts", userId), {
      email: data.email,
      fullName: data.fullName,
      password: data.password,
      phoneNumber: data.phoneNumber,
      role: data.role,
      status: data.status,
      username: data.username,
    });
  } catch (error) {
    console.log(error);
  } finally {
    await updateRoleQuantity(data.role, 1);
    await signOut(auth);
    const accountCookie = Cookies.get("userInfo");
    if (accountCookie) {
      const parsedAccount = JSON.parse(accountCookie);

      await signInWithEmailAndPassword(
        auth,
        parsedAccount.email,
        parsedAccount.password,
      );
    }
    console.log(accountCookie);
  }
};

//Read
export const getAccountByUsername = async (
  username: string,
): Promise<Accounts | null> => {
  const q = query(
    collection(db, "accounts"),
    where("username", "==", username),
  );
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    return {
      id: userDoc.id,
      email: userData.email,
      fullName: userData.fullName,
      password: userData.password,
      phoneNumber: userData.phoneNumber,
      role: userData.role,
      status: userData.status,
      username: userData.username,
    } as Accounts;
  }

  return null;
};

export const getAllAccount = async () => {
  const accCollection = collection(db, "accounts");
  const accDocs = await getDocs(accCollection);

  const accData = accDocs.docs.map((acc) => ({
    ...acc.data(),
    id: acc.id,
  })) as Accounts[];

  return accData;
};

export const getAccountById = async (id: string) => {
  const accRef = doc(db, "accounts", id);
  const accSnap = await getDoc(accRef);

  if (accSnap.exists()) {
    return accSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

export const checkUsernameExists = async (
  username: string,
  currentUserId?: string,
) => {
  // Tạo truy vấn để kiểm tra username
  const q = query(
    collection(db, "accounts"),
    where("username", "==", username),
  );

  const querySnapshot = await getDocs(q);
  const usernameExists = !querySnapshot.empty;

  // Nếu có currentUserId, kiểm tra xem username có thuộc về người dùng hiện tại không
  if (currentUserId) {
    const currentUserQuery = query(
      collection(db, "accounts"),
      where("username", "==", username),
      where(documentId(), "!=", currentUserId), // Loại trừ ID của người dùng hiện tại
    );

    const currentUserSnapshot = await getDocs(currentUserQuery);
    return currentUserSnapshot.empty; // Trả về true nếu username chưa tồn tại
  }

  return !usernameExists; // Trả về true nếu username chưa tồn tại
};

export const checkEmailExists = async (
  email: string,
  currentUserId?: string,
) => {
  // Tạo truy vấn để kiểm tra email
  const q = query(collection(db, "accounts"), where("email", "==", email));

  const querySnapshot = await getDocs(q);
  const emailExists = !querySnapshot.empty;

  // Nếu có currentUserId, kiểm tra xem email có thuộc về người dùng hiện tại không
  if (currentUserId) {
    const currentUserQuery = query(
      collection(db, "accounts"),
      where("email", "==", email),
      where(documentId(), "!=", currentUserId), // Loại trừ ID của người dùng hiện tại
    );

    const currentUserSnapshot = await getDocs(currentUserQuery);
    return currentUserSnapshot.empty; // Trả về true nếu email chưa tồn tại
  }

  return !emailExists; // Trả về true nếu email chưa tồn tại
};

//Update
export const updateAccount = async (id: string, data: any) => {
  const accData = await getAccountById(id);
  if (accData && accData.role !== data.role) {
    await updateRoleQuantity(accData.role, -1);
    await updateRoleQuantity(data.role, 1);
  }

  if (accData && accData.password !== data.password) {
    try {
      await signOut(auth);
      // Đăng nhập với email và mật khẩu
      const userCredential = await signInWithEmailAndPassword(
        auth,
        accData.email,
        accData.password,
      );
      const user = userCredential.user;

      // Tạo thông tin xác thực bằng email và mật khẩu hiện tại
      if (user.email) {
        const credential = EmailAuthProvider.credential(
          user.email,
          accData.password,
        );
        // Xác thực lại người dùng
        await reauthenticateWithCredential(user, credential);
      }

      // Cập nhật mật khẩu mới
      await updatePassword(user, data.password);
      console.log("Mật khẩu đã được cập nhật thành công!");
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    } finally {
      await signOut(auth);
      const accountCookie = Cookies.get("userInfo");
      if (accountCookie) {
        const parsedAccount = JSON.parse(accountCookie);

        await signInWithEmailAndPassword(
          auth,
          parsedAccount.email,
          parsedAccount.password,
        );
      }
      console.log(accountCookie);
    }
  }

  try {
    await setDoc(doc(db, "accounts", id), {
      email: data.email,
      fullName: data.fullName,
      password: data.password,
      phoneNumber: data.phoneNumber,
      role: data.role,
      status: data.status,
      username: data.username,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateAccountPW = async (email: string, newPassword: string) => {
  const q = query(collection(db, "accounts"), where("email", "==", email));

  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const data = userDoc.data();

    try {
      await setDoc(doc(db, "accounts", userDoc.id), {
        email: data.email,
        fullName: data.fullName,
        password: newPassword,
        phoneNumber: data.phoneNumber,
        role: data.role,
        status: data.status,
        username: data.username,
      });
    } catch (error) {
      console.log(error);
    }
  }
};
