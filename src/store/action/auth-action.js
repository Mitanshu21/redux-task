import { authActions } from "../slice/auth-slice";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase-config";
import { chatActions } from "../slice/chat-slice";

export const authCheck = () => {
  return (dispatch) => {
    const data = localStorage.getItem("auth");
    if (data) {
      dispatch(authActions.login(JSON.parse(data)));
    }
  };
};

export const authLogout = () => {
  return (dispatch) => {
    localStorage.removeItem("auth");
    dispatch(authActions.logout());
    console.log("logout successfull");
  };
};

export const authLogin = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.loading(true));

      const authentication = getAuth();
      const response = await signInWithEmailAndPassword(
        authentication,
        email,
        password
      );

      let userData = {
        email: response.user.email,
        uid: response.user.uid,
      };

      localStorage.setItem("auth", JSON.stringify(userData));
      dispatch(authActions.login(userData));

      dispatch(authActions.loading(false));
      console.log("Login success");
    } catch (error) {
      dispatch(authActions.loading(false));

      if (error.code === "auth/wrong-password") {
        alert("Please enter valid Password");
      }
      if (error.code === "auth/user-not-found") {
        alert("Please enter valid Email");
      }
    }
  };
};

const storage = getStorage();

export const registerUsr = (
  username,
  email,
  password,
  profilePic,
  fileType
) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.loading(true));

      const authentication = getAuth();

      // Create user in firebase authentication
      const response = await createUserWithEmailAndPassword(
        authentication,
        email,
        password
      );

      let filename = email.replace(/@[^@]+$/, "");
      let fileExtension = fileType.split("/").pop();

      //upload file to firebase storage
      const storageRef = ref(
        storage,
        `/react-chat-profile/${filename}.${fileExtension}`
      );
      const imgSnap = await uploadBytes(storageRef, profilePic);
      const urll = await getDownloadURL(imgSnap.ref);

      // add user to chat users list
      dispatch(
        chatActions.addUser({ email: email, name: username, img: urll })
      );

      let userData = {
        email: response.user.email,
        uid: response.user.uid,
      };

      localStorage.setItem("auth", JSON.stringify(userData));
      dispatch(authActions.login(userData));
      dispatch(authActions.loading(false));

      console.log("Register success");
    } catch (error) {
      dispatch(authActions.loading(false));

      console.log("error", error);
      if (error.code === "auth/weak-password") {
        alert("Please enter strong Password");
      }
      if (error.code === "auth/email-already-in-use") {
        alert("Email already exist");
      }
      if (error.code === "storage/bucket-not-found") {
        alert("bucket-not-found");
      }
      if (error.code === "storage/unknown") {
        alert("unknown error");
      }
    }
  };
};
