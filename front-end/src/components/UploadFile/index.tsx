import { DeleteOutlined } from "@ant-design/icons";
import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useRef,
} from "react";
import styled from "styled-components";
import { getBase64 } from "../../utils/functions";
import { StyledButton } from "../Button";
import { SuccessText } from "../Text/Success";

const UploadButton = styled(StyledButton)`
  background-color: ${({ theme }) => theme.color.success};
  &:hover {
    background-color: ${({ theme }) => theme.color.grayish.success};
  }
`;

function UploadFile({
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
        <UploadButton onClick={handleClick}>Upload a image</UploadButton>
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
export default UploadFile;
