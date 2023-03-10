import {
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
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
import { LoadingContent } from "../Dashboard";
import Loading from "../../../components/Loading";

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
  const [fetchError, setFetchError] = useState({ boolean: false, message: "" });
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
    const comments = e.target.comments.value;
    // @ts-ignore
    const productName = e.target.productName.value;
    const errorMessage = checkRequiredFields({
      productName,
      costPrice,
      salePrice,
      purchaseDate,
      dueDate,
    });

    if (errorMessage) return setRegisterError(errorMessage);
    try {
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
    } catch (error: any) {
      setFetchError({ boolean: true, message: error.message });
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

  return fetchError.boolean ? (
    <LoadingContent>
      <Heading>
        Erro ao carregar api, contate o suporte. Error message:{" "}
        {fetchError.message}
      </Heading>
    </LoadingContent>
  ) : (
    <BoxForm
      style={{ margin: "40px auto" }}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <Heading>Registrar novo produto</Heading>
      <StyledLabel>
        <div style={{ display: "flex" }}>
          Nome do produto<ErrorText>*</ErrorText>:
        </div>
        <StyledInput name="productName" />
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
      <StyledLabel>
        <div style={{ display: "flex" }}>
          Pre??o de custo<ErrorText>*</ErrorText>:
        </div>
        <StyledCurrencyInput
          value={costPrice}
          onValueChange={(value = "") => setCostPrice(value)}
          prefix="R$"
        />
      </StyledLabel>
      <StyledLabel>
        <div style={{ display: "flex" }}>
          Pre??o de venda<ErrorText>*</ErrorText>:
        </div>
        <StyledCurrencyInput
          value={salePrice}
          onValueChange={(value = "") => setSalePrice(value)}
          prefix="R$"
        />
      </StyledLabel>
      <StyledLabel>
        <div style={{ display: "flex" }}>
          Data de compra<ErrorText>*</ErrorText>:
        </div>
        <StyledInputMask
          name="purchaseDate"
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
          name="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          mask="99/99/9999"
        />
      </StyledLabel>
      <StyledLabel>
        Especifica????es:
        <StyledTextArea name="comments" rows={4} />
      </StyledLabel>
      {registerError && <ErrorText>{registerError}</ErrorText>}
      {successMessage && <SuccessText>{successMessage}</SuccessText>}
      <StyledButton disabled={isFetching} type="submit">
        {isFetching ? <Loading forButton /> : "Registrar produto"}
      </StyledButton>
    </BoxForm>
  );
}

export default RegisterProducts;
