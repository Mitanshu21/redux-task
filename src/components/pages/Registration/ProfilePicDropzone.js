import React, { useState, useEffect } from "react";
import DropzoneInput from "./Dropzone";
import style from "./Dropzone.module.css";
import { BsFillCameraFill } from "react-icons/bs";

const ProfilePicDropzone = ({ value, setData, setError }) => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);

  const previewPic = acceptedFiles.map((file) => (
    <div key={file.name} className={style.preview}>
      <img src={file.preview} className={style.image} alt={"uploaded img"} />
    </div>
  ));

  useEffect(() => {
    rejectedFiles.length > 0 &&
      setError((err) => ({
        ...err,
        profilePicture: rejectedFiles[0].errors[0].message,
      }));
    setData((data) => ({
      ...data,
      profilePicture: "",
    }));

    acceptedFiles.length > 0 &&
      setError((err) => ({
        ...err,
        profilePicture: "",
      }));
    setData((data) => ({
      ...data,
      profilePicture: acceptedFiles[0],
    }));
  }, [acceptedFiles, rejectedFiles, setError, setData]);

  useEffect(() => {
    value === "" && setAcceptedFiles([]);
  }, [value]);

  return (
    <DropzoneInput
      setAcceptedFiles={setAcceptedFiles}
      setRejectedFiles={setRejectedFiles}
      styleClass={"containerPicture"}
    >
      {!acceptedFiles.length > 0 && (
        <span className={style.ProfilePicIcon}>
          <BsFillCameraFill size={34} />
        </span>
      )}
      <div>{previewPic}</div>
    </DropzoneInput>
  );
};

export default ProfilePicDropzone;
