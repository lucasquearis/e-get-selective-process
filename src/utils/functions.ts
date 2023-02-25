import { Dispatch } from "react";

export const getBase64 = (
  file: File,
  callback: Dispatch<React.SetStateAction<string | undefined>>
) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    if (typeof reader.result === "string") {
      callback(reader.result);
    }
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
};
