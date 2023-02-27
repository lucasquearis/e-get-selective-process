import styled from "styled-components";
import {
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
import UploadFile from "../../../components/UploadFile";
import { addProduct } from "../../../utils/api";
import { ErrorText } from "../../../components/Text/Error";
import { SuccessText } from "../../../components/Text/Success";
import { checkRequiredFields } from "../../../utils/functions";
import { StyledCurrencyInput } from "../../../components/CurrencyInput";

const SimpleFlexGap = styled.div`
  display: flex;
  gap: 8px;
`;

export interface IRequiredFields {
  productName: string;
  costPrice: string;
  salePrice: string;
  purchaseDate: string;
  dueDate: string;
}

function RegisterProducts() {
  const { user: userRedux } = useAppSelector((state) => state);
  const [fileUploadedValue, setFileUploadedValue] = useState<
    File | undefined
  >();
  const [base64Image, setBase64Image] = useState<string | undefined>();
  const [costPrice, setCostPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
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
    setCostPrice("");
    setSalePrice("");
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // @ts-ignore
    const [
      { value: productName },
      { value: x },
      { value: y },
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
      costPrice: costPrice.replace(",", "."),
      salePrice: salePrice.replace(",", "."),
      purchaseDate,
      dueDate,
      comments,
      base64Image,
    });
    if (response?.status === 201) {
      setSuccessMessage(
        `O produto "${productName}", foi adicionado com sucesso!`
      );
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
    }, 5000);
    return () => clearTimeout(timer);
  }, [registerError]);

  useEffect(() => {
    if (!successMessage) return;
    const timeoutId = setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [successMessage]);

  return (
    <DefaultContent>
      <BoxForm onSubmit={handleSubmit} ref={formRef}>
        <Heading>Registrar novo produto</Heading>
        <StyledLabel>
          <div style={{ display: "flex" }}>
            Nome do produto<ErrorText>*</ErrorText>:
          </div>
          <StyledInput />
        </StyledLabel>
        <StyledLabel>
          Imagem do produto:
          <UploadFile
            handleFile={(e: SetStateAction<string | undefined>) =>
              setBase64Image(e)
            }
            fileUploadedValue={fileUploadedValue}
            setFileUploadedValue={setFileUploadedValue}
          />
        </StyledLabel>
        <SimpleFlexGap>
          <StyledLabel style={{ width: "50%" }}>
            <div style={{ display: "flex" }}>
              Preço de custo<ErrorText>*</ErrorText>:
            </div>
            <StyledCurrencyInput
              value={costPrice}
              onValueChange={(value) => value && setCostPrice(value)}
              prefix="R$"
            />
          </StyledLabel>
          <StyledLabel style={{ width: "50%" }}>
            <div style={{ display: "flex" }}>
              Preço de venda<ErrorText>*</ErrorText>:
            </div>
            <StyledCurrencyInput
              value={salePrice}
              onValueChange={(value) => value && setSalePrice(value)}
              prefix="R$"
            />
          </StyledLabel>
        </SimpleFlexGap>
        <SimpleFlexGap>
          <StyledLabel>
            <div style={{ display: "flex" }}>
              Data de compra<ErrorText>*</ErrorText>:
            </div>
            <StyledInputMask
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              mask="99/99/9999"
            />
          </StyledLabel>
          <StyledLabel>
            <div style={{ display: "flex" }}>
              Data de vencimento<ErrorText>*</ErrorText>:
            </div>
            <StyledInputMask
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              mask="99/99/9999"
            />
          </StyledLabel>
        </SimpleFlexGap>
        <StyledLabel>
          Especificações:
          <StyledTextArea rows={4} />
        </StyledLabel>
        {registerError && <ErrorText>{registerError}</ErrorText>}
        {successMessage && <SuccessText>{successMessage}</SuccessText>}
        <StyledButton disabled={isFetching} type="submit">
          Registrar produto
        </StyledButton>
      </BoxForm>
    </DefaultContent>
  );
}

export default RegisterProducts;
