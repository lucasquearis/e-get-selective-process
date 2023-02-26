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
  const [productStatus, setProductStatus] = useState("");
  const [soldDate, setSoldDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const deleteDefault = async (response: AxiosResponse | undefined) => {
    if (response?.status === 201 && currentProduct.id) {
      await deleteProduct(currentProduct.id);
      setIsFetching(false);
      setOpenModal(false);
      fetchApi();
    } else {
      setErrorMessage("Error deleting product, contact support!");
      setIsFetching(false);
    }
  };

  const checkToSold = async () => {
    if (!soldDate) {
      return setErrorMessage("Sold date is required!");
    }
    if (
      !moment(soldDate, "DD/MM/YYYY").isValid() ||
      soldDate.replace(/[^\d]/g, "").length !== 8
    ) {
      return setErrorMessage("Sold date invalid format!");
    }
    setIsFetching(true);
    const response = await addToSold({ ...currentProduct, soldDate });
    deleteDefault(response);
  };

  const confirmDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    const selectedResponse = e.target[0].value;
    if (selectedResponse === "Product sold") {
      checkToSold();
    }
    if (selectedResponse === "Lost product") {
      const lostResponse = await addToLoss(currentProduct);
      deleteDefault(lostResponse);
    }
    if (selectedResponse === "Expired product") {
      const expiredResponse = await addToExpired(currentProduct);
      deleteDefault(expiredResponse);
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
            Select the reason for removing this product:
            <StyledSelect onChange={(e) => setProductStatus(e.target.value)}>
              <option>Lost product</option>
              <option>Expired product</option>
              <option>Product sold</option>
            </StyledSelect>
          </StyledLabel>
          {productStatus === "Product sold" && (
            <StyledLabel style={{ alignItems: "center" }}>
              <p style={{ alignSelf: "self-start" }}>
                Date the product was sold:
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
            Confirm
          </StyledButton>
        </ModalFooter>
      </form>
    </>
  );
}

export default DeleteProductContent;
