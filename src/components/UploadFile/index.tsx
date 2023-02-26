import { DeleteOutlined } from "@ant-design/icons";
import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { getBase64 } from "../../utils/functions";
import { StyledButton } from "../Button";
import { SuccessText } from "../Text/Success";

function FileUploader({
  handleFile,
  fileUploadedValue,
  setFileUploadedValue,
}: {
  handleFile: Dispatch<SetStateAction<string | undefined>>;
  fileUploadedValue: File | undefined;
  setFileUploadedValue: Dispatch<React.SetStateAction<File | undefined>>;
}) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const [fileUploaded] = event.target.files;
      getBase64(fileUploaded, handleFile);
      setFileUploadedValue(fileUploaded);
    }
  };
  {
    return fileUploadedValue?.name ? (
      <SuccessText
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          width: "100%",
          justifyContent: "center",
        }}
      >
        {fileUploadedValue.name}{" "}
        <DeleteOutlined
          style={{ color: "red", fontSize: 20, cursor: "pointer" }}
          onClick={() => setFileUploadedValue(undefined)}
        />
      </SuccessText>
    ) : (
      <>
        <StyledButton onClick={handleClick}>Upload a image</StyledButton>
        <input
          type="file"
          accept="image/*"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: "none" }}
          // @ts-ignore
          value={fileUploadedValue}
        />
      </>
    );
  }
}
export default FileUploader;
