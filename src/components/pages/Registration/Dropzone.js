import React from "react";
import { useDropzone } from "react-dropzone";
import style from "./Dropzone.module.css";

function DropzoneInput({
  setAcceptedFiles,
  setRejectedFiles,
  styleClass,
  maxFilesNO,
  fileMaxSize,
  isMultiple,
  acceptFile,
  children,
}) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptFile,
    maxFiles: maxFilesNO,
    multiple: isMultiple,
    maxSize: fileMaxSize,
    onDrop: (acceptedFiles, fileRejections) => {
      setAcceptedFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setRejectedFiles(
        fileRejections.map((fileRejection) =>
          Object.assign(fileRejection, {
            preview: URL.createObjectURL(fileRejection.file),
          })
        )
      );
    },
  });

  let classname;
  if (styleClass === "containerPicture") {
    classname = style.containerPicture;
  } else if (styleClass === "container") {
    classname = style.container;
  }

  return (
    <section className={classname}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {children}
      </div>
    </section>
  );
}

DropzoneInput.defaultProps = {
  styleClass: "container",
  maxFilesNO: 1,
  fileMaxSize: 300000,
  isMultiple: false,
  acceptFile: { "image/*": [] },
};

export default DropzoneInput;
