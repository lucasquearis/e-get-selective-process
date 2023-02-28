import { AxiosResponse } from "axios";
import moment from "moment";
import { Dispatch, FormEvent, useEffect, useState } from "react";
import { ModalContent } from "../../pages/Home/Stock";
import {
  addToExpired,
  addToLoss,
  addToSold,
  deleteProduct,
  IProduct,
} from "../../utils/api";
import { StyledButton } from "../Button";
import { StyledInputMask } from "../InputMask";
import { StyledLabel } from "../Label";
import { ModalFooter } from "../Modal";
import { StyledSelect } from "../Select";
import { ErrorText } from "../Text/Error";

interface IDeleteProductModal {
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
  fetchApi: () => Promise<void>;
  currentProduct: IProduct;
}

function DeleteProductContent({
  fetchApi,
  setOpenModal,
  currentProduct,
}: IDeleteProductModal) {
  const [isFetching, setIsFetching] = useState(false);
  const [productStatus, setProductStatus] = useState(
    "Produto adicionado sem querer"
  );
  const [soldDate, setSoldDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const deleteDefault = async (response: AxiosResponse | undefined) => {
    if (response?.status === 201 && currentProduct.id) {
      await deleteProduct(currentProduct.id);
      setIsFetching(false);
      setOpenModal(false);
      fetchApi();
    } else {
      setErrorMessage(
        "Erro ao excluir o produto, entre em contato com o suporte!"
      );
      setIsFetching(false);
    }
  };

  const checkToSold = async () => {
    if (!soldDate) {
      return setErrorMessage("A data de venda é obrigatória!");
    }
    if (
      !moment(soldDate, "DD/MM/YYYY").isValid() ||
      soldDate.replace(/[^\d]/g, "").length !== 8
    ) {
      return setErrorMessage("Data de venda formato inválido!");
    }
    setIsFetching(true);
    const response = await addToSold({ ...currentProduct, soldDate });
    deleteDefault(response);
  };

  const confirmDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    const selectedResponse = e.target[0].value;
    if (selectedResponse === "Produto vendido") {
      checkToSold();
    }
    if (selectedResponse === "Produto perdido") {
      const lostResponse = await addToLoss(currentProduct);
      deleteDefault(lostResponse);
    }
    if (selectedResponse === "Produto vencido") {
      const expiredResponse = await addToExpired(currentProduct);
      deleteDefault(expiredResponse);
    }
    if (
      selectedResponse === "Produto adicionado sem querer" &&
      currentProduct.id
    ) {
      await deleteProduct(currentProduct.id);
      setIsFetching(false);
      setOpenModal(false);
      fetchApi();
    }
  };

  useEffect(() => {
    if (!errorMessage) return;
    const timer = setTimeout(() => {
      setErrorMessage("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  return (
    <>
      <form onSubmit={confirmDelete}>
        <ModalContent>
          <StyledLabel>
            Selecione o motivo para remover esse produto:
            <StyledSelect onChange={(e) => setProductStatus(e.target.value)}>
              <option>Produto adicionado sem querer</option>
              <option>Produto perdido</option>
              <option>Produto vencido</option>
              <option>Produto vendido</option>
            </StyledSelect>
          </StyledLabel>
          {productStatus === "Produto vendido" && (
            <StyledLabel style={{ alignItems: "center" }}>
              <p style={{ alignSelf: "self-start" }}>
                Data em que o produto foi vendido:
              </p>
              <StyledInputMask
                value={soldDate}
                onChange={(event) => setSoldDate(event.target.value)}
                style={{ width: 65 }}
                mask="99/99/9999"
              />
            </StyledLabel>
          )}
          <ErrorText>{errorMessage}</ErrorText>
        </ModalContent>
        <ModalFooter>
          <StyledButton type="submit" disabled={isFetching}>
            Confirmar
          </StyledButton>
        </ModalFooter>
      </form>
    </>
  );
}

export default DeleteProductContent;
