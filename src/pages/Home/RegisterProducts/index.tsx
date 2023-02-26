import styled from "styled-components";
import React, {
  FormHTMLAttributes,
  Ref,
  RefObject,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { DefaultContent } from "../../../components/DefaultContent";
import { useAppSelector } from "../../../hooks";
import { BoxForm } from "../../../components/Form";
import { StyledLabel } from "../../../components/Label";
import { StyledInput } from "../../../components/Input";
import { StyledInputMask } from "../../../components/InputMask";
import moment from "moment";
import { StyledTextArea } from "../../../components/TextArea";
import { Heading } from "../../../components/Text/Heading";
import { StyledButton } from "../../../components/Button";
import FileUploader from "../../../components/UploadFile";
import { addProduct } from "../../../utils/api";
import { ErrorText } from "../../../components/Text/Error";
import { SuccessText } from "../../../components/Text/Success";
import ReactInputMask from "react-input-mask";

const SimpleFlexGap = styled.div`
  display: flex;
  gap: 8px;
`;

interface IRequiredFields {
  productName: string;
  costPrice: number;
  salePrice: number;
  purchaseDate: string;
  dueDate: string;
}

function RegisterProducts() {
  const { user: userRedux } = useAppSelector((state) => state);
  const [fileUploadedValue, setFileUploadedValue] = useState<
    File | undefined
  >();
  const [base64Image, setBase64Image] = useState<string | undefined>();
  const [purchaseDate, setPurchaseDate] = useState<string>(
    moment().format("DD/MM/YYYY")
  );
  const [dueDate, setDueDate] = useState<string>("");
  const [registerError, setRegisterError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const resetFields = () => {
    setDueDate("");
    if (formRef?.current) {
      formRef.current.reset();
    }
    setBase64Image(undefined);
    setFileUploadedValue(undefined);
  };

  const checkRequiredFields = ({
    productName,
    costPrice,
    salePrice,
    purchaseDate,
    dueDate,
  }: IRequiredFields) => {
    if (!productName) return "Product name is required!";
    if (!costPrice) return "Cost price is required!";
    if (!salePrice) return "Sale price is required!";
    if (!purchaseDate) return "Purchase Date is required!";
    if (!dueDate) return "Due date is required!";
    if (
      !moment(purchaseDate, "DD/MM/YYYY").isValid() ||
      purchaseDate.replace(/[^\d]/g, "").length !== 8
    )
      return "Purchase date invalid format!";
    if (
      !moment(dueDate, "DD/MM/YYYY").isValid() ||
      dueDate.replace(/[^\d]/g, "").length !== 8
    )
      return "Due date invalid format!";
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // @ts-ignore
    const [
      { value: productName },
      { value: costPrice },
      { value: salePrice },
      { value: purchaseDate },
      { value: dueDate },
      { value: comments },
    ] = e.target;
    const errorMessage = checkRequiredFields({
      productName,
      costPrice,
      salePrice,
      purchaseDate,
      dueDate,
    });

    if (errorMessage) return setRegisterError(errorMessage);
    setIsFetching(true);
    const response = await addProduct({
      productName,
      costPrice: Number(costPrice),
      salePrice: Number(salePrice),
      purchaseDate,
      dueDate,
      comments,
      base64Image,
    });
    if (response?.status === 201) {
      setSuccessMessage(`Item "${productName}", successfully added`);
      setIsFetching(false);
      resetFields();
    }
  };

  useEffect(() => {
    if (!userRedux.isAnAdministrator) {
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    if (!registerError) return;
    const timer = setTimeout(() => {
      setRegisterError("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [registerError]);

  useEffect(() => {
    if (!successMessage) return;
    const timeoutId = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [successMessage]);

  return (
    <DefaultContent>
      <BoxForm onSubmit={handleSubmit} ref={formRef}>
        <Heading>Register new product</Heading>
        <StyledLabel>
          <div style={{ display: "flex" }}>
            Product name<ErrorText>*</ErrorText>:
          </div>
          <StyledInput />
        </StyledLabel>
        <SimpleFlexGap>
          <StyledLabel style={{ width: "50%" }}>
            <div style={{ display: "flex" }}>
              Cost price<ErrorText>*</ErrorText>:
            </div>
            <StyledInput type="number" />
          </StyledLabel>
          <StyledLabel style={{ width: "50%" }}>
            <div style={{ display: "flex" }}>
              Sale price<ErrorText>*</ErrorText>:
            </div>
            <StyledInput type="number" />
          </StyledLabel>
        </SimpleFlexGap>
        <SimpleFlexGap>
          <StyledLabel>
            <div style={{ display: "flex" }}>
              Purchase date<ErrorText>*</ErrorText>:
            </div>
            <StyledInputMask
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              mask="99/99/9999"
            />
          </StyledLabel>
          <StyledLabel>
            <div style={{ display: "flex" }}>
              Due date<ErrorText>*</ErrorText>:
            </div>
            <StyledInputMask
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              mask="99/99/9999"
            />
          </StyledLabel>
        </SimpleFlexGap>
        <StyledLabel>
          Comments:
          <StyledTextArea rows={4} />
        </StyledLabel>
        <StyledLabel>
          Upload Image:
          <FileUploader
            handleFile={(e: SetStateAction<string | undefined>) =>
              setBase64Image(e)
            }
            fileUploadedValue={fileUploadedValue}
            setFileUploadedValue={setFileUploadedValue}
          />
        </StyledLabel>
        {registerError && <ErrorText>{registerError}</ErrorText>}
        {successMessage && <SuccessText>{successMessage}</SuccessText>}
        <StyledButton disabled={isFetching} type="submit">
          Register
        </StyledButton>
      </BoxForm>
    </DefaultContent>
  );
}

export default RegisterProducts;
